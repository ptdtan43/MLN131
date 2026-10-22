import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { HorseSprite } from '../game/derby/horse'
import { PixelSprite } from '../game/pixel'
import { CLOZE_BANK, PERKS, ROUNDS, STAGES, STATIONS, TEAMS, TRACK_STEPS } from '../game/derby/derbyData'
import { loadTops } from '../game/derby/tops'
import { setMuted, sfx } from '../game/sfx'
import { useStageScale } from '../game/stage'
import './PictureRush.css'
import './Derby.css'

const MotionDiv = motion.div
const EASE = [0.16, 1, 0.3, 1]
const SEGMENTS = 12
const LANE_X0 = 400
const LANE_LEN = 1300
const HORSE_W = 124
const LANE_GAP = 62
const perkById = (id) => PERKS.find((p) => p.id === id)
/* Mảng có một phần tử cho mỗi đội, để số đội chỉ nằm ở TEAMS. */
const perTeam = (value) => TEAMS.map(() => value)

/* ---------- nền nhiều lớp đổi theo "thời kỳ": đồng ruộng, nhà máy, thành phố ---------- */
function makeRng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const svgUrl = (inner) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="420" viewBox="0 0 960 420" shape-rendering="crispEdges">${inner}</svg>`)}")`

function ruralTile(seed, base, roof) {
  const rnd = makeRng(seed)
  const out = []
  let x = 0
  while (x < 960) {
    if (rnd() > 0.4) {
      const w = 72 + Math.floor(rnd() * 40)
      const h = 54 + Math.floor(rnd() * 22)
      out.push(`<rect x="${x}" y="${420 - h}" width="${w}" height="${h}" fill="${base}"/>`)
      out.push(`<polygon points="${x - 10},${420 - h} ${x + w + 10},${420 - h} ${x + w / 2},${420 - h - 44}" fill="${roof}"/>`)
      x += w + 36
    } else {
      const th = 70 + Math.floor(rnd() * 50)
      out.push(`<rect x="${x + 14}" y="${420 - th}" width="12" height="${th}" fill="${roof}"/>`)
      out.push(`<rect x="${x}" y="${420 - th - 28}" width="40" height="32" fill="${base}"/>`)
      out.push(`<rect x="${x + 8}" y="${420 - th - 44}" width="24" height="20" fill="${base}"/>`)
      x += 70
    }
  }
  return svgUrl(out.join(''))
}

function factoryTile(seed, base, dark, win) {
  const rnd = makeRng(seed)
  const out = []
  let x = 0
  while (x < 960) {
    const w = 100 + Math.floor(rnd() * 90)
    const h = 90 + Math.floor(rnd() * 90)
    out.push(`<rect x="${x}" y="${420 - h}" width="${w}" height="${h}" fill="${base}"/>`)
    out.push(`<polygon points="${x},${420 - h} ${x + 40},${420 - h - 26} ${x + 40},${420 - h} ${x + 80},${420 - h - 26} ${x + 80},${420 - h}" fill="${base}"/>`)
    const ch = 60 + Math.floor(rnd() * 70)
    out.push(`<rect x="${x + w - 34}" y="${420 - h - ch}" width="20" height="${ch}" fill="${dark}"/>`)
    for (let wx = x + 14; wx < x + w - 40; wx += 30) {
      if (rnd() > 0.5) out.push(`<rect x="${wx}" y="${420 - h + 20}" width="14" height="14" fill="${win}"/>`)
    }
    x += w + 8
  }
  return svgUrl(out.join(''))
}

function towerTile(seed, base, win, antenna) {
  const rnd = makeRng(seed)
  const out = []
  let x = 0
  while (x < 960) {
    const w = 52 + Math.floor(rnd() * 56)
    const h = 130 + Math.floor(rnd() * 200)
    out.push(`<rect x="${x}" y="${420 - h}" width="${w}" height="${h}" fill="${base}"/>`)
    if (rnd() > 0.55) out.push(`<rect x="${x + w / 2 - 3}" y="${420 - h - 36}" width="6" height="36" fill="${antenna}"/>`)
    for (let wy = 420 - h + 16; wy < 410; wy += 26) {
      for (let wx = x + 10; wx < x + w - 14; wx += 18) {
        if (rnd() > 0.62) out.push(`<rect x="${wx}" y="${wy}" width="8" height="12" fill="${win}"/>`)
      }
    }
    x += w + 6
  }
  return svgUrl(out.join(''))
}

function starTile() {
  const rnd = makeRng(77)
  const dots = Array.from({ length: 46 }, () => {
    const size = rnd() > 0.8 ? 6 : 4
    return `<rect x="${Math.floor(rnd() * 240) * 4}" y="${Math.floor(rnd() * 100) * 4}" width="${size}" height="${size}" fill="#efe8d8" opacity="${0.25 + rnd() * 0.45}"/>`
  })
  return svgUrl(dots.join(''))
}

function groundTile() {
  const rects = []
  for (let x = 0; x < 960; x += 96) rects.push(`<rect x="${x}" y="0" width="48" height="12" fill="#2a2520"/>`)
  for (let x = 48; x < 960; x += 96) rects.push(`<rect x="${x}" y="48" width="48" height="12" fill="#26211c"/>`)
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="96" shape-rendering="crispEdges"><rect width="960" height="96" fill="#1d1a16"/>${rects.join('')}</svg>`)}")`
}

function DerbyBackdrop({ era }) {
  const layers = useMemo(
    () => ({
      stars: starTile(),
      far: [ruralTile(5, '#222819', '#2d3320'), factoryTile(9, '#26211d', '#1c1814', '#4a3b2b'), towerTile(13, '#1f2229', '#6b6648', '#363b46')],
      near: [ruralTile(21, '#2a2a1c', '#383824'), factoryTile(31, '#2e2721', '#211b16', '#5a4630'), towerTile(41, '#272b34', '#7d7650', '#414855')],
      ground: groundTile(),
    }),
    [],
  )
  return (
    <div className="pr-backdrop" aria-hidden="true">
      <div className="pr-layer pr-stars" style={{ backgroundImage: layers.stars }} />
      {layers.far.map((img, i) => (
        <div key={`f${i}`} className="pr-layer pr-far dv-era" style={{ backgroundImage: img, opacity: era === i ? 1 : 0 }} />
      ))}
      {layers.near.map((img, i) => (
        <div key={`n${i}`} className="pr-layer pr-near dv-era" style={{ backgroundImage: img, opacity: era === i ? 1 : 0 }} />
      ))}
      <div className="pr-layer pr-ground" style={{ backgroundImage: layers.ground }} />
    </div>
  )
}

/* ---------- thành phần dùng chung ---------- */
function Ticket({ tier, team, small = false }) {
  const gold = tier === 'gold'
  return (
    <div className={`dv-ticket ${gold ? 'is-gold' : 'is-silver'}${small ? ' is-small' : ''}`}>
      <div className="dv-ticket-main">
        <p className="dv-ticket-title">{gold ? 'VÉ VÀNG' : 'VÉ BẠC'}</p>
        <p className="dv-ticket-sub">{gold ? 'Top 1' : 'Top 2'} · Đuổi hình bắt chữ</p>
      </div>
      {team && (
        <div className="dv-ticket-stub" style={{ '--team': team.color }}>
          <span>{team.name}</span>
        </div>
      )}
    </div>
  )
}

function PerkCard({ perk, selected, onClick, disabled, big = false }) {
  const body = (
    <>
      <PixelSprite name={perk.sprite} size={big ? 150 : 110} />
      <p className="dv-perk-badge">{perk.badge}</p>
      <h3 className="dv-perk-name">{perk.name}</h3>
      <p className="dv-perk-desc">{perk.desc}</p>
    </>
  )
  if (!onClick) return <div className={`dv-perk${big ? ' is-big' : ''}`}>{body}</div>
  return (
    <button type="button" className={`dv-perk${selected ? ' is-selected' : ''}${big ? ' is-big' : ''}`} onClick={onClick} disabled={disabled}>
      {body}
    </button>
  )
}

const CONFETTI = Array.from({ length: 40 }, (_, i) => {
  const a = (i / 40) * Math.PI * 2 + (i % 3) * 0.3
  const dist = 360 + ((i * 53) % 480)
  return {
    dx: Math.round(Math.cos(a) * dist),
    dy: Math.round(Math.sin(a) * dist * 0.5 - 160),
    rot: (i * 97) % 360,
    size: 14 + (i % 3) * 6,
    color: ['#e0b040', '#efe8d8', '#c4272d', '#f6e7a6'][i % 4],
    delay: (i % 8) * 40,
  }
})

function Confetti({ top = 60 }) {
  return (
    <div className="pr-confetti" aria-hidden="true" style={{ top }}>
      {CONFETTI.map((c, i) => (
        <span key={i} style={{ '--dx': `${c.dx}px`, '--dy': `${c.dy}px`, '--rot': `${c.rot}deg`, width: c.size, height: c.size, background: c.color, animationDelay: `${c.delay}ms` }} />
      ))}
    </div>
  )
}

/* ---------- máy kéo cần gạt: quay quyền lợi cho Top 2 ---------- */
const CELL = 190

function SlotMachine({ result, onDone, team }) {
  const [phase, setPhase] = useState('idle') // idle | pulled | spinning | done
  const strips = useMemo(() => {
    const ids = PERKS.map((p) => p.id)
    return [0, 1, 2].map((reel) => {
      const list = Array.from({ length: 18 + reel * 5 }, (_, i) => ids[(i + reel) % ids.length])
      list.push(result)
      return list
    })
  }, [result])

  const pull = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('pulled')
    sfx.land()
    setTimeout(() => {
      setPhase('spinning')
      sfx.tick()
    }, 450)
    setTimeout(() => {
      setPhase('done')
      sfx.solve()
      onDone?.()
    }, 450 + 3300)
  }, [phase, onDone])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        pull()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pull])

  const spinning = phase === 'spinning' || phase === 'done'
  return (
    <div className="dv-slot">
      <div className={`dv-slot-body${phase === 'done' ? ' is-win' : ''}`}>
        <div className="dv-slot-lights" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 2) * 0.3}s` }} className={phase === 'spinning' ? 'is-blink' : ''} />
          ))}
        </div>
        <div className="dv-reels">
          {strips.map((list, r) => (
            <div className="dv-reel" key={r} style={{ height: CELL }}>
              <div
                className="dv-strip"
                style={{
                  transform: `translateY(${spinning ? -(list.length - 1) * CELL : 0}px)`,
                  transitionDuration: spinning ? `${2.0 + r * 0.55}s` : '0s',
                }}
              >
                {list.map((id, i) => (
                  <div className="dv-cell" key={i} style={{ height: CELL }}>
                    <PixelSprite name={perkById(id).sprite} size={130} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="dv-slot-label">{team ? team.name : 'Top 2'}</p>
      </div>
      <button type="button" className={`dv-lever${phase !== 'idle' ? ' is-pulled' : ''}`} onClick={pull} disabled={phase !== 'idle'} aria-label="Kéo cần gạt">
        <span className="dv-lever-rod" />
        <span className="dv-lever-knob" />
      </button>
    </div>
  )
}

/* ---------- cửa sổ nhận quyền lợi trước khi đua ---------- */
function Ceremony({ onDone }) {
  /* Nếu vừa chơi Picture Rush xong thì Top 1, Top 2 đã được tính sẵn; vẫn cho đổi tay nếu cần. */
  const preset = useMemo(() => loadTops(TEAMS.length), [])
  const [step, setStep] = useState(preset ? 'top1' : 'pick') // pick | top1 | top2
  const [top1, setTop1] = useState(preset ? preset.top1 : null)
  const [top2, setTop2] = useState(preset ? preset.top2 : null)
  const [perk1, setPerk1] = useState(null)
  const [perk2, setPerk2] = useState(null)
  const [slotDone, setSlotDone] = useState(false)
  const result = useMemo(() => PERKS[Math.floor(Math.random() * PERKS.length)].id, [])

  const t1 = top1 !== null ? TEAMS[top1] : null
  const t2 = top2 !== null ? TEAMS[top2] : null
  const finish = () => onDone({ top1, top2, perk1, perk2: perk2 ?? result })

  const panel = (key, children) => (
    <MotionDiv key={key} className="dv-modal pr-box" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.97 }} transition={{ duration: 0.45, ease: EASE }}>
      {children}
    </MotionDiv>
  )

  return (
    <div className="dv-overlay">
      <AnimatePresence mode="wait">
        {step === 'pick' &&
          panel(
            'pick',
            <>
              <h2 className="dv-modal-title">Top 1 và Top 2 của “Đuổi hình bắt chữ”</h2>
              <p className="dv-modal-lead">Chọn hai đội dẫn đầu phần mở đầu để nhận quyền lợi trong cuộc đua.</p>
              {[
                { key: 'top1', label: 'Top 1 · Vé Vàng', value: top1, set: setTop1, other: top2 },
                { key: 'top2', label: 'Top 2 · Vé Bạc', value: top2, set: setTop2, other: top1 },
              ].map((row) => (
                <div className="dv-pick-row" key={row.key}>
                  <p className="dv-pick-label">{row.label}</p>
                  <div className="dv-pick-teams">
                    {TEAMS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`dv-team-chip${row.value === t.id ? ' is-on' : ''}`}
                        style={{ '--team': t.color }}
                        disabled={row.other === t.id}
                        onClick={() => row.set(t.id)}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="dv-modal-actions">
                <button type="button" className="pr-btn pr-btn-gold" disabled={top1 === null || top2 === null} onClick={() => { setStep('top1'); sfx.land() }}>
                  Tiếp tục
                </button>
                <button type="button" className="dv-linkbtn" onClick={() => onDone({ top1: null, top2: null, perk1: null, perk2: null })}>
                  Không dùng quyền lợi, đua ngay
                </button>
              </div>
            </>,
          )}

        {step === 'top1' &&
          panel(
            'top1',
            <>
              <Ticket tier="gold" team={t1} />
              <h2 className="dv-modal-title">Mời Top 1 “Đuổi hình bắt chữ” chọn quyền lợi</h2>
              <p className="dv-modal-lead">
                <strong style={{ color: t1.color }}>{t1.name}</strong> chọn một trong ba quyền lợi. Quyền lợi chỉ dùng một lần duy nhất, ở câu do đội tự chọn.
              </p>
              <div className="dv-perks">
                {PERKS.map((p) => (
                  <PerkCard key={p.id} perk={p} selected={perk1 === p.id} onClick={() => { setPerk1(p.id); sfx.correct() }} />
                ))}
              </div>
              <div className="dv-modal-actions">
                <button type="button" className="pr-btn pr-btn-gold" disabled={!perk1} onClick={() => { setStep('top2'); sfx.land() }}>
                  Chốt quyền lợi
                </button>
                {preset && (
                  <button type="button" className="dv-linkbtn" onClick={() => setStep('pick')}>
                    Đổi Top 1, Top 2
                  </button>
                )}
              </div>
            </>,
          )}

        {step === 'top2' &&
          panel(
            'top2',
            <>
              <Ticket tier="silver" team={t2} />
              <h2 className="dv-modal-title">Phần thưởng của Top 2 “Đuổi hình bắt chữ” là:</h2>
              <SlotMachine result={result} team={t2} onDone={() => setSlotDone(true)} />
              <AnimatePresence>
                {slotDone && (
                  <MotionDiv className="dv-result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    <p className="dv-result-name">
                      <span style={{ color: t2.color }}>{t2.name}</span> nhận: {perkById(result).name}
                    </p>
                    <p className="dv-result-desc">{perkById(result).desc}</p>
                    <button type="button" className="pr-btn pr-btn-gold pr-btn-xl" onClick={finish} autoFocus>
                      Vào đường đua
                    </button>
                  </MotionDiv>
                )}
              </AnimatePresence>
              {!slotDone && <p className="dv-hint">Kéo cần gạt bên phải hoặc bấm Space</p>}
            </>,
          )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- đường đua ---------- */
const posX = (steps) => LANE_X0 + (Math.min(steps, TRACK_STEPS) / TRACK_STEPS) * LANE_LEN

function Track({ steps, perks, galloping, pops, flashLane }) {
  const maxSteps = Math.max(...steps)
  return (
    <section className="dv-track pr-box" aria-label="Đường đua">
      {STATIONS.map((s) => (
        <div className="dv-station" key={s.step} style={{ left: posX(s.step), ...(s.step === TRACK_STEPS ? { width: 160, marginLeft: -80 } : null) }}>
          <p className="dv-station-year">{s.year}</p>
          <p className="dv-station-label">{s.label}</p>
          <span className="dv-station-line" />
        </div>
      ))}
      {TEAMS.map((t, i) => {
        const perk = perks[i]
        const leading = maxSteps > 0 && steps[i] === maxSteps
        return (
          <div className={`dv-lane${flashLane.includes(i) ? ' is-flash' : ''}`} key={t.id} style={{ '--team': t.color, top: 106 + i * LANE_GAP, zIndex: i + 1 }}>
            <div className="dv-lane-label">
              <p className="dv-lane-name">{t.name}</p>
              {perk && (
                <p className={`dv-lane-perk${perk.used ? ' is-used' : ''}`}>
                  <PixelSprite name={perkById(perk.perk).sprite} size={26} />
                  <span>{perk.tier === 'gold' ? 'Vé Vàng' : 'Vé Bạc'} · {perk.used ? 'đã dùng' : perkById(perk.perk).badge}</span>
                </p>
              )}
            </div>
            <div className="dv-lane-line" />
            <div className="dv-horse-wrap" style={{ transform: `translateX(${posX(steps[i]) - HORSE_W + 8}px)` }}>
              <HorseSprite color={t.color} gallop={galloping[i]} width={HORSE_W} />
              <span className="dv-dust" aria-hidden="true" />
              <AnimatePresence>
                {pops[i] && (
                  <MotionDiv key={pops[i].id} className="dv-pop" initial={{ opacity: 0, y: 10, scale: 0.6 }} animate={{ opacity: 1, y: -34, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    {pops[i].text}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
            <div className={`dv-score${leading ? ' is-lead' : ''}`}>{steps[i]}</div>
          </div>
        )
      })}
    </section>
  )
}

/* ---------- bảng nhiệm vụ cho từng câu ---------- */
function LetterCard({ letter, children, year, className = '' }) {
  return (
    <>
      <span className="dv-letter">{letter}</span>
      <span className="dv-card-text">{children}</span>
      {year && <span className="dv-card-year">{year}</span>}
      {className}
    </>
  )
}

function SortBoard({ round, revealed }) {
  const bins = [
    { id: 'skip', label: 'BỎ QUA', cls: 'is-skip' },
    { id: 'keep', label: 'KẾ THỪA', cls: 'is-keep' },
  ]
  return (
    <div className="dv-sort">
      <div className="dv-statement">
        <p>{round.statement}</p>
      </div>
      <div className="dv-sort-bins">
        {bins.map((bin) => (
          <div key={bin.id} className={`dv-sort-bin ${bin.cls}${revealed ? (round.answer === bin.id ? ' is-right' : ' is-wrong') : ''}`}>
            {bin.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderBoard({ round, revealed }) {
  const list = revealed ? [...round.cards].sort((a, b) => a.rank - b.rank) : round.cards
  const used = round.cards.map((c) => c.year)
  return (
    <div className="dv-order-wrap">
      <div className="dv-order">
        {list.map((c, i) => (
          <MotionDiv layout key={c.letter} className="dv-order-card" transition={{ type: 'spring', stiffness: 110, damping: 16, delay: revealed ? i * 0.1 : 0 }}>
            <div className="dv-order-top">
              <span className="dv-letter">{c.letter}</span>
              <span className="dv-order-year" style={{ opacity: revealed ? 1 : 0 }}>{c.year}</span>
            </div>
            <div className="dv-card dv-card-tall">
              <span className="dv-card-text">{c.title}</span>
              <span className="dv-card-hint">{c.hint}</span>
            </div>
          </MotionDiv>
        ))}
      </div>
      <div className="dv-bank dv-bank-years">
        <p className="dv-bank-title">Các năm (một năm không dùng đến)</p>
        <div className="dv-bank-words">
          {round.years.map((y) => (
            <span key={y} className={`dv-bank-word${revealed ? (used.includes(y) ? ' is-used' : ' is-spare') : ''}`}>{y}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClozeBoard({ round, revealed }) {
  const { before, after, answer } = round.cloze
  return (
    <div className="dv-cloze1">
      <p className="dv-cloze1-sentence">
        {before}
        <span className={`dv-blank${revealed ? ' is-open' : ''}`}>
          <span className="dv-blank-word">{answer}</span>
        </span>
        {after}
      </p>
      <div className="dv-bank">
        <p className="dv-bank-title">Từ cho sẵn</p>
        <div className="dv-bank-words">
          {CLOZE_BANK.map((w) => (
            <span key={w} className={`dv-bank-word${revealed ? (w === answer ? ' is-used' : ' is-spare') : ''}`}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- thanh chấm điểm cho người trình bày: chạm vào đội làm đúng ---------- */
function ScoreBar({ round, roundIdx, correct, setCorrect, perks, useDouble, setUseDouble, usePlus2, setUsePlus2, stealTarget, setStealTarget, steps }) {
  const [menu, setMenu] = useState(null)
  const toggleCorrect = (i) => setCorrect((arr) => arr.map((v, k) => (k === i ? !v : v)))
  const toggle = (setter, i) => setter((arr) => arr.map((v, k) => (k === i ? !v : v)))
  const base = (i) => (correct[i] ? 1 : 0) * (useDouble[i] ? 2 : 1) + (usePlus2[i] ? 2 : 0)
  /* Cướp bước được tính sau khi cộng điểm câu này, nên số bước có thể cướp là số bước sau câu. */
  const projected = steps.map((s, k) => s + base(k))
  const takeable = (target) => projected[target] - stealTarget.filter((t) => t === target).length
  const canSteal = (i) => TEAMS.some((o) => o.id !== i && takeable(o.id) >= 1)
  const lastRound = roundIdx === ROUNDS.length - 1

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const n = Number(e.key)
      if (n >= 1 && n <= TEAMS.length) toggleCorrect(n - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="dv-scorebar" role="group" aria-label="Chấm điểm: chạm vào đội trả lời đúng">
      {TEAMS.map((t, i) => {
        const perk = perks[i]
        const available = perk && !perk.used
        const gain = base(i) + (stealTarget[i] !== null ? 1 : 0)
        const on = useDouble[i] || usePlus2[i] || stealTarget[i] !== null
        return (
          <div className={`dv-chip${correct[i] ? ' is-right' : ''}`} key={t.id} style={{ '--team': t.color }}>
            <button type="button" className="dv-chip-main" aria-pressed={correct[i]} onClick={() => toggleCorrect(i)}>
              <kbd>{i + 1}</kbd>
              <span className="dv-chip-name">{t.name}</span>
              <span className="dv-chip-mark">{correct[i] ? 'Đúng' : 'Sai'}</span>
              <span className="dv-chip-gain">+{gain}</span>
            </button>
            <div className="dv-chip-perk">
              {available && perk.perk === 'double' && (
                <button type="button" className={`dv-pill${useDouble[i] ? ' is-on' : ''}${lastRound && !on ? ' is-last' : ''}`} onClick={() => toggle(setUseDouble, i)}>
                  {useDouble[i] ? '×2 câu này' : 'Nhân đôi'}
                </button>
              )}
              {available && perk.perk === 'plus2' && (
                <button type="button" className={`dv-pill${usePlus2[i] ? ' is-on' : ''}${lastRound && !on ? ' is-last' : ''}`} onClick={() => toggle(setUsePlus2, i)}>
                  {usePlus2[i] ? 'Cộng thêm 2' : 'Tiến thêm 2'}
                </button>
              )}
              {available && perk.perk === 'steal' && (
                <>
                  <button
                    type="button"
                    className={`dv-pill${stealTarget[i] !== null ? ' is-on' : ''}${lastRound && !on ? ' is-last' : ''}`}
                    disabled={stealTarget[i] === null && !canSteal(i)}
                    title={stealTarget[i] === null && !canSteal(i) ? 'Chưa đội nào có bước để cướp' : undefined}
                    onClick={() => (stealTarget[i] !== null ? setStealTarget((a) => a.map((v, k) => (k === i ? null : v))) : setMenu(menu === i ? null : i))}
                  >
                    {stealTarget[i] !== null ? `Cướp của ${TEAMS[stealTarget[i]].name}` : canSteal(i) ? 'Cướp 1 bước' : 'Chưa có bước để cướp'}
                  </button>
                  {menu === i && (
                    <div className="dv-steal-menu">
                      {TEAMS.filter((o) => o.id !== i).map((o) => (
                        <button key={o.id} type="button" disabled={takeable(o.id) < 1} style={{ '--team': o.color }} onClick={() => { setStealTarget((a) => a.map((v, k) => (k === i ? o.id : v))); setMenu(null) }}>
                          {o.name} · {projected[o.id]} bước
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- màn kết quả ---------- */
function Result({ steps, onReplay }) {
  const order = TEAMS.map((t) => ({ ...t, steps: steps[t.id] })).sort((a, b) => b.steps - a.steps)
  let rank = 0
  const ranked = order.map((t, i) => {
    if (i === 0 || t.steps < order[i - 1].steps) rank = i + 1
    return { ...t, rank }
  })
  const winners = ranked.filter((t) => t.rank === 1)
  /* Xếp hạng nhất ở giữa, hạng 2 bên trái, hạng 3 bên phải, rồi dàn ra hai bên. */
  const podium = []
  ranked.forEach((t, i) => (i % 2 === 1 ? podium.unshift(t) : podium.push(t)))
  const heights = { 1: 340, 2: 290, 3: 250, 4: 250, 5: 250 }
  return (
    <MotionDiv className="dv-result-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <MotionDiv className="dv-flash" initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 1.1 }} />
      <MotionDiv className="pr-bar pr-bar-top" initial={{ y: -140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
      <MotionDiv className="pr-bar pr-bar-bottom" initial={{ y: 140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
      <Confetti top={420} />
      <MotionDiv className="dv-result-head" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}>
        <p className="dv-result-kicker">{winners.length > 1 ? 'Đồng hạng nhất' : 'Chiến thắng'}</p>
        <h1 className="dv-result-title" style={{ color: winners[0].color }}>{winners.map((w) => w.name).join(' & ')}</h1>
      </MotionDiv>
      <div className="dv-podium">
        {podium.map((t, i) => (
          <MotionDiv key={t.id} className="dv-podium-col" style={{ '--team': t.color }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.18, duration: 0.7, ease: EASE }}>
            <HorseSprite color={t.color} width={190} className="dv-podium-horse" />
            <div className={`dv-podium-block rank-${t.rank}`} style={{ height: heights[t.rank] }}>
              <p className="dv-podium-rank">{t.rank}</p>
              <p className="dv-podium-name">{t.name}</p>
              <p className="dv-podium-steps">{t.steps} bước</p>
            </div>
          </MotionDiv>
        ))}
      </div>
      <MotionDiv className="dv-result-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }}>
        <Link to="/mo-dau" className="pr-btn pr-btn-gold">Về phần mở đầu</Link>
        <button type="button" className="pr-btn pr-btn-ghost" onClick={onReplay}>Chơi lại</button>
      </MotionDiv>
    </MotionDiv>
  )
}

/* ---------- trang chính ---------- */
export default function DerbyPage() {
  const scale = useStageScale()
  const [stage, setStage] = useState('intro') // intro | ceremony | race | result
  const [muted, setMutedState] = useState(false)
  const [perks, setPerks] = useState(() => perTeam(null))
  const [roundIdx, setRoundIdx] = useState(0)
  const [phase, setPhase] = useState('brief') // brief | timing | reveal | running
  const [seconds, setSeconds] = useState(ROUNDS[0].seconds)
  const [steps, setSteps] = useState(() => perTeam(0))
  const [correct, setCorrect] = useState(() => perTeam(false))
  const [useDouble, setUseDouble] = useState(() => perTeam(false))
  const [usePlus2, setUsePlus2] = useState(() => perTeam(false))
  const [stealTarget, setStealTarget] = useState(() => perTeam(null))
  const [galloping, setGalloping] = useState(() => perTeam(false))
  const [pops, setPops] = useState(() => perTeam(null))
  const [flashLane, setFlashLane] = useState([])
  const [banner, setBanner] = useState(null)
  const [curtainId, setCurtainId] = useState(0)

  const round = ROUNDS[roundIdx]
  const leader = Math.max(...steps)
  const era = leader >= 10 ? 2 : leader >= 5 ? 1 : 0
  useEffect(() => setMuted(muted), [muted])

  const resetRoundInputs = () => {
    setCorrect(perTeam(false))
    setUseDouble(perTeam(false))
    setUsePlus2(perTeam(false))
    setStealTarget(perTeam(null))
  }

  const reveal = useCallback(() => {
    setPhase('reveal')
    sfx.solve()
  }, [])

  const startTimer = () => {
    setPhase('timing')
    sfx.land()
  }

  useEffect(() => {
    if (phase !== 'timing') return undefined
    const id = setTimeout(() => {
      const left = seconds - 1
      if (left <= 0) {
        setSeconds(0)
        reveal()
        return
      }
      if (left <= 5) sfx.countdown()
      setSeconds(left)
    }, 1000)
    return () => clearTimeout(id)
  }, [phase, seconds, reveal])

  useEffect(() => {
    if (!banner) return undefined
    const id = setTimeout(() => setBanner(null), 2200)
    return () => clearTimeout(id)
  }, [banner])

  const applyScoring = () => {
    const before = steps
    const gains = TEAMS.map((_, i) => {
      return (correct[i] ? 1 : 0) * (useDouble[i] ? 2 : 1) + (usePlus2[i] ? 2 : 0)
    })
    const after = before.map((s, i) => s + gains[i])
    stealTarget.forEach((target, i) => {
      if (target !== null && after[target] > 0) {
        after[target] -= 1
        after[i] += 1
      }
    })
    setPerks((prev) =>
      prev.map((p, i) => {
        if (!p || p.used) return p
        const usedNow = (p.perk === 'double' && useDouble[i]) || (p.perk === 'plus2' && usePlus2[i]) || (p.perk === 'steal' && stealTarget[i] !== null)
        if (!usedNow) return p
        return { ...p, used: true }
      }),
    )
    setSteps(after)
    setPhase('running')
    setGalloping(after.map((s, i) => s !== before[i]))
    const stamp = Date.now()
    setPops(after.map((s, i) => (s !== before[i] ? { id: stamp + i, text: `${s > before[i] ? '+' : ''}${s - before[i]}` } : null)))
    sfx.correct()

    const overtakes = []
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (i !== j && before[i] < before[j] && after[i] > after[j]) overtakes.push([i, j])
      }
    }
    if (overtakes.length) {
      const [a, b] = overtakes[0]
      setTimeout(() => {
        setBanner({ text: `${TEAMS[a].name} vượt ${TEAMS[b].name}!` })
        setFlashLane(overtakes.map(([x]) => x))
        sfx.fanfare()
      }, 900)
    }
    setTimeout(() => {
      setGalloping(perTeam(false))
      setPops(perTeam(null))
      setFlashLane([])
      advance()
    }, 2600)
  }

  const advance = () => {
    if (roundIdx + 1 >= ROUNDS.length) {
      setStage('result')
      setCurtainId((n) => n + 1)
      sfx.fanfare()
      return
    }
    const nextIdx = roundIdx + 1
    setRoundIdx(nextIdx)
    setSeconds(ROUNDS[nextIdx].seconds)
    setPhase('brief')
    resetRoundInputs()
    if (ROUNDS[nextIdx].stage !== round.stage) setCurtainId((n) => n + 1)
  }

  const begin = ({ top1, top2, perk1, perk2 }) => {
    const next = perTeam(null)
    if (top1 !== null && perk1) next[top1] = { perk: perk1, tier: 'gold', used: false }
    if (top2 !== null && perk2) next[top2] = { perk: perk2, tier: 'silver', used: false }
    setPerks(next)
    setStage('race')
    setCurtainId((n) => n + 1)
  }

  const replay = () => {
    setStage('intro')
    setPerks(perTeam(null))
    setRoundIdx(0)
    setPhase('brief')
    setSeconds(ROUNDS[0].seconds)
    setSteps(perTeam(0))
    resetRoundInputs()
    setCurtainId((n) => n + 1)
  }

  const primary = useCallback(() => {
    if (stage === 'intro') setStage('ceremony')
    else if (stage === 'race') {
      if (phase === 'brief') startTimer()
      else if (phase === 'timing') reveal()
      else if (phase === 'reveal') applyScoring()
    }
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || stage === 'ceremony' || stage === 'result') return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        primary()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const lit = Math.ceil((seconds / round.seconds) * SEGMENTS)
  const showTimer = stage === 'race' && phase !== 'brief' && phase !== 'running'
  const labels = {
    brief: 'Bắt đầu tính giờ',
    timing: 'Dừng và hiện lời giải',
    reveal: 'Cho ngựa chạy',
  }

  return (
    <div className="pr-viewport">
      <div className="pr-stage dv-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <DerbyBackdrop era={era} />

        <header className="pr-hud">
          <div className="pr-logo">
            <PixelSprite name="shoe" size={64} />
            <div>
              <p className="pr-logo-name">KNOWLEDGE DERBY</p>
              <p className="pr-logo-sub">Đường đua quá độ</p>
            </div>
          </div>
          {stage === 'race' && (
            <div className="dv-tabs" aria-label={`Chặng ${round.stage + 1}, câu ${round.nth} trên 3`}>
              {STAGES.map((st, si) => (
                <span key={st.name} className={`dv-tab${si === round.stage ? ' is-now' : ''}${si < round.stage ? ' is-done' : ''}`}>
                  {st.name}
                  <span className="dv-pips" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <i key={n} className={si < round.stage || (si === round.stage && n < round.nth) ? 'is-done' : si === round.stage && n === round.nth ? 'is-now' : ''} />
                    ))}
                  </span>
                </span>
              ))}
            </div>
          )}
          <div className="pr-hud-right">
            {showTimer && (
              <div className={`pr-timer${phase === 'timing' && seconds <= 10 ? ' is-urgent' : ''}`} role="timer" aria-label={`Còn ${seconds} giây`}>
                <div className="pr-segments" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }, (_, i) => (
                    <span key={i} className={i < lit ? 'on' : ''} />
                  ))}
                </div>
                <span className="pr-seconds">{seconds}</span>
              </div>
            )}
            <button type="button" className="pr-icon-btn" onClick={() => setMutedState((m) => !m)} aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'} title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                <path d="M11 5L6 9H3v6h3l5 4V5z" />
                {muted ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
              </svg>
            </button>
            <Link to="/mo-dau" className="pr-skip">Về mở đầu</Link>
          </div>
        </header>

        {stage === 'intro' && (
          <MotionDiv className="pr-intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <div className="dv-intro-horses" aria-hidden="true">
              {TEAMS.map((t, i) => (
                <HorseSprite key={t.id} color={t.color} gallop width={210} className={`dv-intro-horse h${i}`} />
              ))}
            </div>
            <h1 className="pr-title dv-title">KNOWLEDGE DERBY</h1>
            <p className="pr-intro-lead">Chín câu hỏi nhanh, ba chặng. Mỗi câu đúng là một bước.</p>
            <button type="button" className="pr-btn pr-btn-gold pr-btn-xl" onClick={() => setStage('ceremony')}>
              Nhận quyền lợi <kbd>Space</kbd>
            </button>
          </MotionDiv>
        )}

        {stage === 'race' && (
          <>
            <Track steps={steps} perks={perks} galloping={galloping} pops={pops} flashLane={flashLane} />
            <section className="dv-board pr-box" aria-label={`Câu ${round.nth} của chặng ${round.stage + 1}`}>
              <MotionDiv key={roundIdx} className="dv-board-inner" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                <div className="dv-board-head">
                  <span className="dv-kicker">Câu {round.nth}/3</span>
                  <h2 className="dv-task">{round.task}</h2>
                  {(phase === 'brief' || phase === 'timing') && <p className="dv-how">{round.how}</p>}
                </div>
                {round.id === 'sort' && <SortBoard round={round} revealed={phase === 'reveal' || phase === 'running'} />}
                {round.id === 'order' && <OrderBoard round={round} revealed={phase === 'reveal' || phase === 'running'} />}
                {round.id === 'cloze' && <ClozeBoard round={round} revealed={phase === 'reveal' || phase === 'running'} />}
              </MotionDiv>
            </section>

            <footer className={`pr-controls${phase === 'reveal' ? ' dv-controls-reveal' : ''}`}>
              {phase === 'running' ? (
                <p className="dv-running">Ngựa đang chạy…</p>
              ) : (
                <>
                  {phase === 'reveal' && (
                    <ScoreBar
                      round={round}
                      roundIdx={roundIdx}
                      correct={correct}
                      setCorrect={setCorrect}
                      perks={perks}
                      useDouble={useDouble}
                      setUseDouble={setUseDouble}
                      usePlus2={usePlus2}
                      setUsePlus2={setUsePlus2}
                      stealTarget={stealTarget}
                      setStealTarget={setStealTarget}
                      steps={steps}
                    />
                  )}
                  <button type="button" className="pr-btn pr-btn-gold pr-btn-wide" onClick={primary}>
                    {labels[phase]} <kbd>Space</kbd>
                  </button>
                </>
              )}
            </footer>

            <AnimatePresence>
              {banner && (
                <MotionDiv key={banner.text} className="dv-banner" initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: EASE }} role="status">
                  {banner.text}
                </MotionDiv>
              )}
            </AnimatePresence>
          </>
        )}

        {stage === 'ceremony' && <Ceremony onDone={begin} />}
        {stage === 'result' && <Result steps={steps} onReplay={replay} />}

        <div className="pr-curtain" aria-hidden="true" key={curtainId}>
          {Array.from({ length: 8 }, (_, i) => (
            <MotionDiv key={i} initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }} transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], delay: i * 0.035, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

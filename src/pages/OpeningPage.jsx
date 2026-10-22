import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PICTURE_RUSH as PR } from '../data/content'
import { TEAMS } from '../game/derby/derbyData'
import { clearTops, saveTops } from '../game/derby/tops'
import { PixelSprite } from '../game/pixel'
import { setMuted, sfx } from '../game/sfx'
import { useStageScale } from '../game/stage'
import './PictureRush.css'

const MotionDiv = motion.div
const EASE = [0.16, 1, 0.3, 1]
const SEGMENTS = 12

/* Nền nhiều lớp: sao, dãy nhà xa, dãy nhà gần, mặt đất. Mỗi lớp trôi với tốc độ khác nhau để có chiều sâu. */
function skyline({ seed, color, min, max, step, windows }) {
  const w = 960
  const h = 420
  let s = seed
  const rnd = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  let x = 0
  const rects = []
  while (x < w) {
    const bw = step * (2 + Math.floor(rnd() * 3))
    const bh = min + Math.floor(rnd() * (max - min))
    const width = Math.min(bw, w - x)
    rects.push(`<rect x="${x}" y="${h - bh}" width="${width}" height="${bh}" fill="${color}"/>`)
    if (windows) {
      for (let wy = h - bh + 24; wy < h - 20; wy += 36) {
        for (let wx = x + 12; wx < x + width - 16; wx += 28) {
          if (rnd() > 0.72) rects.push(`<rect x="${wx}" y="${wy}" width="8" height="12" fill="${windows}"/>`)
        }
      }
    }
    x += width
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects.join('')}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function stars() {
  let s = 77
  const rnd = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  const dots = Array.from({ length: 46 }, () => {
    const size = rnd() > 0.8 ? 6 : 4
    return `<rect x="${Math.floor(rnd() * 240) * 4}" y="${Math.floor(rnd() * 110) * 4}" width="${size}" height="${size}" fill="#efe8d8" opacity="${0.25 + rnd() * 0.45}"/>`
  })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="440" shape-rendering="crispEdges">${dots.join('')}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function ground() {
  const rects = []
  for (let x = 0; x < 960; x += 96) rects.push(`<rect x="${x}" y="0" width="48" height="12" fill="#2a2520"/>`)
  for (let x = 48; x < 960; x += 96) rects.push(`<rect x="${x}" y="48" width="48" height="12" fill="#26211c"/>`)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="96" shape-rendering="crispEdges"><rect width="960" height="96" fill="#1d1a16"/>${rects.join('')}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function Backdrop() {
  const layers = useMemo(
    () => ({
      stars: stars(),
      far: skyline({ seed: 11, color: '#241d17', min: 120, max: 300, step: 32, windows: '#3b3026' }),
      near: skyline({ seed: 29, color: '#2c241c', min: 70, max: 190, step: 40, windows: '#4a3b2b' }),
      ground: ground(),
    }),
    [],
  )
  return (
    <div className="pr-backdrop" aria-hidden="true">
      <div className="pr-layer pr-stars" style={{ backgroundImage: layers.stars }} />
      <div className="pr-layer pr-far" style={{ backgroundImage: layers.far }} />
      <div className="pr-layer pr-near" style={{ backgroundImage: layers.near }} />
      <div className="pr-layer pr-ground" style={{ backgroundImage: layers.ground }} />
    </div>
  )
}

function Hud({ index, total, seconds, urgent, muted, onMute, showTimer }) {
  const lit = Math.ceil((seconds / PR.seconds) * SEGMENTS)
  return (
    <header className="pr-hud">
      <div className="pr-logo">
        <PixelSprite name="star" size={64} />
        <div>
          <p className="pr-logo-name">{PR.title}</p>
          <p className="pr-logo-sub">{PR.subtitle}</p>
        </div>
      </div>

      <div className="pr-rounds" aria-label={`Câu ${index + 1} trên ${total}`}>
        {Array.from({ length: total }, (_, i) => {
          const state = i < index ? 'done' : i === index ? 'now' : 'next'
          return <span key={i} className={`pr-round pr-round-${state}`} />
        })}
      </div>

      <div className="pr-hud-right">
        {showTimer && (
          <div className={`pr-timer${urgent ? ' is-urgent' : ''}`} role="timer" aria-label={`Còn ${seconds} giây`}>
            <div className="pr-segments" aria-hidden="true">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span key={i} className={i < lit ? 'on' : ''} />
              ))}
            </div>
            <span className="pr-seconds">{seconds}</span>
          </div>
        )}
        <button type="button" className="pr-icon-btn" onClick={onMute} aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'} title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}>
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            {muted ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
        </button>
        <Link to="/game" className="pr-skip">Sang game</Link>
      </div>
    </header>
  )
}

function Tiles({ answer, revealed, flip }) {
  const words = answer.split(' ')
  let n = 0
  return (
    <div className="pr-tiles" aria-label={flip ? `Đáp án: ${answer}` : 'Ô chữ đáp án'}>
      {words.map((word, wi) => (
        <div className="pr-word" key={`${word}-${wi}`}>
          {[...word].map((ch) => {
            const idx = n
            n += 1
            const open = flip || revealed.includes(idx)
            return (
              <span className={`pr-tile${open ? ' is-open' : ''}${flip ? ' is-final' : ''}`} key={idx} style={{ '--d': `${idx * 70}ms` }}>
                <span className="pr-tile-face pr-tile-front" />
                <span className="pr-tile-face pr-tile-back">{ch}</span>
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const CONFETTI = Array.from({ length: 34 }, (_, i) => {
  const a = (i / 34) * Math.PI * 2 + (i % 3) * 0.3
  const dist = 280 + ((i * 53) % 360)
  return {
    dx: Math.round(Math.cos(a) * dist),
    dy: Math.round(Math.sin(a) * dist * 0.55 - 120),
    rot: (i * 97) % 360,
    size: 12 + (i % 3) * 6,
    color: ['#e0b040', '#efe8d8', '#c4272d', '#f6e7a6'][i % 4],
    delay: (i % 6) * 30,
  }
})

function Confetti() {
  return (
    <div className="pr-confetti" aria-hidden="true">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          style={{ '--dx': `${c.dx}px`, '--dy': `${c.dy}px`, '--rot': `${c.rot}deg`, width: c.size, height: c.size, background: c.color, animationDelay: `${c.delay}ms` }}
        />
      ))}
    </div>
  )
}

function Curtain({ id }) {
  return (
    <div className="pr-curtain" aria-hidden="true" key={id}>
      {Array.from({ length: 8 }, (_, i) => (
        <MotionDiv
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], delay: i * 0.035, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* Màn dẫn vào bài: hiện lại đáp án của câu cuối ("QUA ĐÒ"), rồi các chữ có dấu lật thành "QUÁ ĐỘ" (nghe gần giống nhau).
   from và to phải có cùng số ký tự để từng chữ đối chiếu với nhau. */
function FinalScreen({ from, to, lead, onNext }) {
  const [morphed, setMorphed] = useState(false)
  const fromChars = [...from]

  useEffect(() => {
    const id = setTimeout(() => {
      setMorphed(true)
      sfx.land()
    }, 2800)
    return () => clearTimeout(id)
  }, [])

  return (
    <MotionDiv className="pr-final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <MotionDiv className="pr-bar pr-bar-top" initial={{ y: -140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
      <MotionDiv className="pr-bar pr-bar-bottom" initial={{ y: 140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
      <div className="pr-final-sprites" aria-hidden="true">
        <PixelSprite name="bridge" size={130} />
        <PixelSprite name="boat" size={130} className="pr-bob pr-bob-b" />
      </div>
      <h1 className="pr-final-title" aria-label={morphed ? to : from}>
        {[...to].map((ch, i) => {
          const was = fromChars[i]
          const changed = was !== ch
          const shown = morphed ? ch : was
          const flipping = morphed && changed
          return (
            <MotionDiv
              key={changed ? `${i}-${shown}` : i}
              className={`pr-final-letter${flipping ? ' is-changed' : ''}`}
              initial={flipping ? { opacity: 0, rotateX: -90, scale: 1.15 } : { opacity: 0, y: 80, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={flipping ? { duration: 0.6, ease: EASE } : { delay: 0.5 + i * 0.12, duration: 0.6, ease: EASE }}
            >
              {shown === ' ' ? ' ' : shown}
            </MotionDiv>
          )
        })}
      </h1>
      <MotionDiv
        className="pr-final-lower"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: morphed ? 1 : 0, y: morphed ? 0 : 24 }}
        transition={{ delay: morphed ? 0.6 : 0, duration: 0.6, ease: EASE }}
        style={{ pointerEvents: morphed ? 'auto' : 'none' }}
      >
        <p className="pr-final-lead">{lead}</p>
        <button type="button" className="pr-btn pr-btn-gold pr-btn-xl" tabIndex={morphed ? 0 : -1} onClick={onNext}>
          Xem Top 1, Top 2
        </button>
      </MotionDiv>
    </MotionDiv>
  )
}

/* Bảng điểm các đội. Khi hiện đáp án, người trình bày chạm (hoặc bấm phím 1 đến 5) vào đội giơ tay trả lời đúng; điểm cộng khi sang câu tiếp. */
function ScoreRow({ scores, correct, interactive, onToggle }) {
  return (
    <div className={`pr-scorebar${interactive ? ' is-live' : ''}`} role="group" aria-label={interactive ? 'Chấm điểm: chạm vào đội trả lời đúng' : 'Điểm các đội'}>
      {TEAMS.map((t, i) => (
        <div key={t.id} className={`pr-chip${interactive && correct[i] ? ' is-right' : ''}`} style={{ '--team': t.color }}>
          <div className="pr-chip-top">
            <span className="pr-chip-name">{t.name}</span>
            <span className="pr-chip-total">{scores[i] + (interactive && correct[i] ? 1 : 0)}</span>
          </div>
          {interactive && (
            <button type="button" className="pr-chip-mark" aria-pressed={correct[i]} onClick={() => onToggle(i)}>
              <kbd>{i + 1}</kbd>
              {correct[i] ? 'Đúng +1' : 'Sai'}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/* Màn xếp hạng cuối phần mở đầu: tự tìm Top 1 (Vé Vàng) và Top 2 (Vé Bạc). Chỉ khi đồng điểm mới phải chọn tay trong số đội đồng điểm. */
function Ranking({ scores, onGo, onReplay }) {
  const [pick1, setPick1] = useState(null)
  const [pick2, setPick2] = useState(null)
  const ids = TEAMS.map((t) => t.id)
  const best = (pool) => {
    const top = Math.max(...pool.map((i) => scores[i]))
    return pool.filter((i) => scores[i] === top)
  }
  const cand1 = best(ids)
  const top1 = cand1.length === 1 ? cand1[0] : pick1
  const cand2 = top1 === null ? [] : best(ids.filter((i) => i !== top1))
  const top2 = top1 === null ? null : cand2.length === 1 ? cand2[0] : pick2
  const order = [...ids].sort((a, b) => scores[b] - scores[a] || a - b)
  const maxScore = Math.max(1, ...scores)
  const ready = top1 !== null && top2 !== null

  const ticket = (tier, teamId) => (
    <div className={`pr-ticket ${tier}`}>
      <p className="pr-ticket-title">{tier === 'gold' ? 'VÉ VÀNG · TOP 1' : 'VÉ BẠC · TOP 2'}</p>
      <p className="pr-ticket-team" style={teamId !== null ? undefined : { opacity: 0.45 }}>{teamId !== null ? TEAMS[teamId].name : 'Chọn đội'}</p>
      <span className="pr-ticket-stripe" style={{ background: teamId !== null ? TEAMS[teamId].color : 'transparent' }} />
    </div>
  )

  const choose = (label, candidates, onPick) => (
    <div className="pr-choose">
      <p>{label}</p>
      <div className="pr-choose-teams">
        {candidates.map((i) => (
          <button key={i} type="button" className="pr-choose-chip" style={{ '--team': TEAMS[i].color }} onClick={() => onPick(i)}>
            {TEAMS[i].name}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <MotionDiv className="pr-rank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="pr-rank-title">BẢNG XẾP HẠNG</h2>
      <div className="pr-tops">
        {ticket('gold', top1)}
        {ticket('silver', top2)}
      </div>
      {top1 === null && choose('Đồng điểm hạng nhất: chọn đội nhận Vé Vàng', cand1, (i) => { setPick1(i); setPick2(null) })}
      {top1 !== null && top2 === null && choose('Đồng điểm: chọn đội nhận Vé Bạc', cand2, setPick2)}
      <ol className="pr-standings">
        {order.map((i) => (
          <li key={i} style={{ '--team': TEAMS[i].color }} className={i === top1 || i === top2 ? 'is-top' : ''}>
            <span className="pr-standing-name">{TEAMS[i].name}</span>
            <span className="pr-standing-bar"><i style={{ width: `${(scores[i] / maxScore) * 100}%` }} /></span>
            <span className="pr-standing-score">{scores[i]}</span>
          </li>
        ))}
      </ol>
      <div className="pr-rank-actions">
        <button type="button" className="pr-btn pr-btn-gold pr-btn-xl" disabled={!ready} onClick={() => onGo(top1, top2)}>
          Sang game
        </button>
        <button type="button" className="pr-btn pr-btn-ghost" onClick={onReplay}>Chơi lại</button>
      </div>
    </MotionDiv>
  )
}

export default function OpeningPage() {
  const scale = useStageScale()
  const navigate = useNavigate()
  const puzzles = PR.puzzles
  const [phase, setPhase] = useState('intro') // intro | play | revealed | final | ranking
  const [index, setIndex] = useState(0)
  const [seconds, setSeconds] = useState(PR.seconds)
  const [revealed, setRevealed] = useState([])
  const [muted, setMutedState] = useState(false)
  const [curtainId, setCurtainId] = useState(0)
  const [scores, setScores] = useState(() => TEAMS.map(() => 0))
  const [correct, setCorrect] = useState(() => TEAMS.map(() => false))
  const toggleCorrect = useCallback((i) => setCorrect((arr) => arr.map((v, k) => (k === i ? !v : v))), [])

  const puzzle = puzzles[index]
  const letters = useMemo(() => [...puzzle.answer.replace(/ /g, '')], [puzzle])
  const playing = phase === 'play'
  const revealedAnswer = phase === 'revealed'
  const showResult = phase === 'revealed'

  useEffect(() => setMuted(muted), [muted])

  const revealOne = useCallback(() => {
    setRevealed((cur) => {
      const left = letters.map((_, i) => i).filter((i) => !cur.includes(i))
      if (left.length <= 1) return cur
      // mở theo thứ tự từ trái sang phải để người xem dễ nhận ra
      return [...cur, left[0]]
    })
  }, [letters])

  // Hết giờ (hoặc bấm hiện sớm): lật đáp án để ghi điểm cho đội đọc đúng.
  const showAnswer = useCallback(() => {
    setPhase('revealed')
    sfx.solve()
  }, [])

  const start = useCallback(() => {
    setPhase('play')
    setIndex(0)
    setSeconds(PR.seconds)
    setRevealed([])
    setScores(TEAMS.map(() => 0))
    setCorrect(TEAMS.map(() => false))
    clearTops()
    setCurtainId((n) => n + 1)
  }, [])

  const next = useCallback(() => {
    /* Cộng điểm cho các đội vừa được chấm đúng rồi mới sang câu sau. */
    setScores((cur) => cur.map((s, i) => s + (correct[i] ? 1 : 0)))
    setCorrect(TEAMS.map(() => false))
    if (index + 1 >= puzzles.length) {
      setPhase('final')
      setCurtainId((n) => n + 1)
      sfx.fanfare()
      return
    }
    setIndex(index + 1)
    setPhase('play')
    setSeconds(PR.seconds)
    setRevealed([])
    setCurtainId((n) => n + 1)
  }, [index, puzzles.length, correct])

  useEffect(() => {
    if (!playing) return undefined
    const id = setTimeout(() => {
      const left = seconds - 1
      if (left <= 0) {
        setSeconds(0)
        showAnswer()
        return
      }
      if (left <= 5) sfx.countdown()
      if (PR.autoHints.includes(left)) {
        revealOne()
        sfx.land()
      }
      setSeconds(left)
    }, 1000)
    return () => clearTimeout(id)
  }, [playing, seconds, showAnswer, revealOne])

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const go = e.key === 'Enter' || e.key === ' '
      if (phase === 'intro' && go) { e.preventDefault(); start() }
      else if (playing && (e.key === 'h' || e.key === 'H')) { revealOne(); sfx.land() }
      else if (playing && go) { e.preventDefault(); showAnswer() }
      else if (revealedAnswer && go) { e.preventDefault(); next() }
      else if (revealedAnswer && /^[1-9]$/.test(e.key) && Number(e.key) <= TEAMS.length) toggleCorrect(Number(e.key) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, playing, revealedAnswer, start, next, showAnswer, revealOne, toggleCorrect])

  const style = { transform: `translate(-50%, -50%) scale(${scale})` }

  return (
    <div className="pr-viewport">
      <div className="pr-stage" style={style}>
        <Backdrop />
        <Hud
          index={index}
          total={puzzles.length}
          seconds={seconds}
          urgent={playing && seconds <= 10}
          muted={muted}
          onMute={() => setMutedState((m) => !m)}
          showTimer={phase !== 'intro' && phase !== 'final' && phase !== 'ranking'}
        />

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <MotionDiv key="intro" className="pr-intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: EASE }}>
              <div className="pr-intro-sprites" aria-hidden="true">
                <PixelSprite name="star" size={220} className="pr-bob" />
                <PixelSprite name="moon" size={220} className="pr-bob pr-bob-b" />
                <PixelSprite name="flame" size={220} className="pr-bob" />
              </div>
              <h1 className="pr-title">{PR.title}</h1>
              <p className="pr-intro-lead">Nhìn hình, đoán cụm từ. Cả lớp cùng đoán nhé!</p>
              <button type="button" className="pr-btn pr-btn-gold pr-btn-xl" onClick={start}>
                Bắt đầu <kbd>Enter</kbd>
              </button>
            </MotionDiv>
          )}

          {(playing || showResult) && (
            <MotionDiv key={`p-${index}`} className="pr-play" initial={{ opacity: 0, x: 90 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -90 }} transition={{ duration: 0.45, ease: EASE }}>
              <p key={phase} className={`pr-kind${revealedAnswer ? ' is-win' : ''}`} aria-live="polite">
                {revealedAnswer ? 'Đáp án' : puzzle.kind}
              </p>

              <div className="pr-picture-row">
                {(puzzle.images ?? puzzle.sprites).map((item, i, list) => (
                  <div className="pr-picture-wrap" key={item}>
                    <div className="pr-box pr-picture">
                      {puzzle.images ? (
                        <img className="pr-photo" src={item} alt={revealedAnswer ? puzzle.names[i] : 'Hình đố'} />
                      ) : (
                        <PixelSprite name={item} size={340} className={playing ? 'pr-bob' : ''} />
                      )}
                    </div>
                    <p className={`pr-caption${revealedAnswer ? ' is-shown' : ''}`}>{puzzle.names[i]}</p>
                    {i < list.length - 1 && <span className="pr-plus" aria-hidden="true">+</span>}
                  </div>
                ))}
              </div>

              <div className={`pr-answer${revealedAnswer ? ' is-win' : ''}`}>
                <Tiles answer={puzzle.answer} revealed={revealed} flip={revealedAnswer} />
                {revealedAnswer && <Confetti />}
              </div>
            </MotionDiv>
          )}

          {phase === 'final' && (
            <FinalScreen
              key="final"
              from={puzzles[puzzles.length - 1].answer}
              to={PR.finalTitle}
              lead={PR.finalLead}
              onNext={() => { setPhase('ranking'); setCurtainId((n) => n + 1); sfx.fanfare() }}
            />
          )}

          {phase === 'ranking' && (
            <Ranking
              key="ranking"
              scores={scores}
              onReplay={() => { setPhase('intro'); setCurtainId((n) => n + 1) }}
              onGo={(top1, top2) => { saveTops(top1, top2); navigate('/game') }}
            />
          )}
        </AnimatePresence>

        {(playing || showResult) && (
          <footer className={`pr-controls${revealedAnswer ? ' pr-controls-reveal' : ''}`}>
            <ScoreRow scores={scores} correct={correct} interactive={revealedAnswer} onToggle={toggleCorrect} />
            {playing && (
              <>
                <button type="button" className="pr-btn pr-btn-ghost" onClick={() => { revealOne(); sfx.land() }}>
                  Gợi ý <kbd>H</kbd>
                </button>
                <button type="button" className="pr-btn pr-btn-gold" onClick={showAnswer}>
                  Hiện đáp án <kbd>Space</kbd>
                </button>
              </>
            )}
            {revealedAnswer && (
              <button type="button" className="pr-btn pr-btn-gold pr-btn-wide" onClick={next} autoFocus>
                {index + 1 >= puzzles.length ? 'Sang phần mở bài' : 'Câu tiếp theo'} <kbd>Space</kbd>
              </button>
            )}
          </footer>
        )}

        <Curtain id={curtainId} />
      </div>
    </div>
  )
}

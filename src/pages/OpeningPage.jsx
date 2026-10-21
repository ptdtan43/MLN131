import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PICTURE_RUSH as PR } from '../data/content'
import { PixelSprite } from '../game/pixel'
import { setMuted, sfx } from '../game/sfx'
import './PictureRush.css'

const MotionDiv = motion.div
const EASE = [0.16, 1, 0.3, 1]
const STAGE_W = 1920
const STAGE_H = 1080
const SEGMENTS = 12

/* Khung hình 16:9 cố định 1920×1080, thu phóng vừa màn hình để bố cục giống nhau trên mọi TV và máy chiếu. */
function useStageScale() {
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

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
        <Link to="/ly-thuyet" className="pr-skip">Vào bài ngay</Link>
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

export default function OpeningPage() {
  const scale = useStageScale()
  const puzzles = PR.puzzles
  const [phase, setPhase] = useState('intro') // intro | play | revealed | final
  const [index, setIndex] = useState(0)
  const [seconds, setSeconds] = useState(PR.seconds)
  const [revealed, setRevealed] = useState([])
  const [muted, setMutedState] = useState(false)
  const [curtainId, setCurtainId] = useState(0)

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

  // Hết giờ (hoặc bấm hiện sớm): lật đáp án để ghi điểm cho đội viết đúng.
  const showAnswer = useCallback(() => {
    setPhase('revealed')
    sfx.solve()
  }, [])

  const start = useCallback(() => {
    setPhase('play')
    setIndex(0)
    setSeconds(PR.seconds)
    setRevealed([])
    setCurtainId((n) => n + 1)
  }, [])

  const next = useCallback(() => {
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
  }, [index, puzzles.length])

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
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, playing, revealedAnswer, start, next, showAnswer, revealOne])

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
          showTimer={phase !== 'intro' && phase !== 'final'}
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
            <MotionDiv key="final" className="pr-final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <MotionDiv className="pr-bar pr-bar-top" initial={{ y: -140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
              <MotionDiv className="pr-bar pr-bar-bottom" initial={{ y: 140 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }} />
              <div className="pr-final-sprites" aria-hidden="true">
                <PixelSprite name="bridge" size={130} />
                <PixelSprite name="boat" size={130} className="pr-bob pr-bob-b" />
              </div>
              <h1 className="pr-final-title" aria-label={PR.finalTitle}>
                {[...PR.finalTitle].map((ch, i) => (
                  <MotionDiv key={i} className="pr-final-letter" initial={{ opacity: 0, y: 80, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: EASE }}>
                    {ch === ' ' ? ' ' : ch}
                  </MotionDiv>
                ))}
              </h1>
              <MotionDiv initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6, ease: EASE }} className="pr-final-lower">
                <p className="pr-final-lead">{PR.finalLead}</p>
                <Link to="/ly-thuyet" className="pr-btn pr-btn-gold pr-btn-xl">Vào bài</Link>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        {(playing || showResult) && (
          <footer className="pr-controls">
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

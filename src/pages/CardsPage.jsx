import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { OPENING } from '../data/content'
import { sfx } from '../game/sfx'

const MotionDiv = motion.div
const EASE_OUT = [0.16, 1, 0.3, 1]
const pad = (n) => String(n).padStart(2, '0')

// Trò chơi mở đầu: mỗi thẻ là một thứ nước ta phải "bỏ qua" hoặc phải "kế thừa". Cả lớp giơ tay, người trình bày bấm theo số đông.
export default function OpeningPage() {
  const cards = OPENING.cards
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [right, setRight] = useState(0)
  const [finished, setFinished] = useState(false)
  const nextRef = useRef(null)

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus({ preventScroll: true })
  }, [picked])

  const card = cards[index]
  const answered = picked !== null
  const correct = answered && picked === card.answer

  const choose = (answer) => {
    if (answered) return
    setPicked(answer)
    if (answer === card.answer) {
      setRight((n) => n + 1)
      sfx.correct()
    } else {
      sfx.wrong()
    }
  }

  const next = () => {
    if (index + 1 >= cards.length) {
      setFinished(true)
      sfx.fanfare()
      return
    }
    setIndex(index + 1)
    setPicked(null)
  }

  const restart = () => {
    setIndex(0)
    setPicked(null)
    setRight(0)
    setFinished(false)
  }

  const stageClass =
    'relative flex min-h-[calc(100dvh-4.25rem)] flex-col gap-5 bg-stage/95 px-5 py-5 text-cream sm:px-10 lg:min-h-[calc(100dvh-5.25rem)] lg:gap-6 lg:px-14'
  const stageStyle = { backgroundImage: 'radial-gradient(ellipse 55% 65% at 22% 62%, rgba(224,176,64,0.13), transparent 70%)' }

  return (
    <div className={stageClass} style={stageStyle}>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 pb-3">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 24 24" fill="#E0B040" aria-hidden="true" className="h-7 w-7 shrink-0">
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
          </svg>
          <span className="hidden font-mono text-sm tracking-[0.14em] text-cream-muted sm:inline lg:text-base">MLN131</span>
          <h1 className="font-condensed text-3xl leading-[1.06] font-extrabold uppercase lg:text-[42px]">{OPENING.title}</h1>
        </div>
        {!finished && (
          <span className="font-mono text-base tracking-[0.1em] text-cream-muted lg:text-lg">
            THẺ <span className="text-gold">{pad(index + 1)}</span> / {pad(cards.length)}
          </span>
        )}
      </header>

      {finished ? (
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="flex flex-1 flex-col justify-center gap-8 py-8"
        >
          <p className="font-mono text-sm tracking-[0.14em] text-gold lg:text-base">
            CẢ LỚP ĐÚNG {pad(right)} / {pad(cards.length)} THẺ
          </p>
          <h2 className="font-condensed max-w-[14em] text-6xl leading-[1.02] font-extrabold uppercase lg:text-[104px]">{OPENING.endTitle}</h2>
          <p className="max-w-[34em] text-xl leading-relaxed text-cream-muted lg:text-3xl">{OPENING.endLead}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/game"
              className="inline-flex items-center gap-3 bg-gold px-7 py-4 text-lg font-bold tracking-[0.06em] text-stage uppercase transition hover:brightness-110 active:scale-[0.98] lg:px-9 lg:py-5 lg:text-xl"
            >
              Sang game
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
            <button type="button" onClick={restart} className="text-lg font-medium text-cream/80 transition-colors hover:text-cream lg:text-xl">
              Chơi lại
            </button>
          </div>
        </MotionDiv>
      ) : (
        <>
          <p className="text-base text-cream-muted lg:text-lg">{OPENING.how}</p>

          <AnimatePresence mode="wait">
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="flex flex-1 items-center border border-cream/15 bg-stage-raised px-6 py-8 lg:px-14 lg:py-10"
            >
              <p className="font-condensed max-w-[22em] text-4xl leading-[1.04] font-extrabold uppercase sm:text-5xl lg:text-[64px]">{card.text}</p>
            </MotionDiv>
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            {[
              { id: 'skip', label: 'Bỏ qua', tone: 'bg-[#9B2C20] text-cream' },
              { id: 'keep', label: 'Kế thừa', tone: 'bg-gold text-stage' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                disabled={answered}
                className={`font-condensed h-20 text-4xl font-extrabold uppercase transition duration-150 hover:brightness-110 active:scale-[0.99] disabled:cursor-default lg:h-24 lg:text-6xl ${option.tone} ${
                  answered && picked !== option.id ? 'opacity-30' : ''
                } ${answered && picked === option.id ? 'outline-4 -outline-offset-4 outline-cream' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="min-h-[8rem]">
            {answered && (
              <MotionDiv
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className={`flex flex-col gap-3 border-2 p-5 lg:p-6 ${correct ? 'border-gold bg-stage-raised' : 'border-danger bg-stage-raised'}`}
              >
                <p className={`font-condensed text-3xl font-extrabold uppercase lg:text-4xl ${correct ? 'text-gold' : 'text-danger'}`}>
                  {correct ? 'Đúng' : 'Chưa đúng'}: {card.answer === 'skip' ? 'bỏ qua' : 'kế thừa'}
                </p>
                <p className="text-lg leading-relaxed lg:text-xl">{card.why}</p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    ref={nextRef}
                    onClick={next}
                    className="inline-flex items-center gap-3 bg-gold px-7 py-4 text-lg font-bold tracking-[0.06em] text-stage uppercase transition hover:brightness-110 active:scale-[0.98] lg:text-xl"
                  >
                    {index + 1 >= cards.length ? 'Xem kết quả' : 'Thẻ tiếp theo'}
                  </button>
                </div>
              </MotionDiv>
            )}
          </div>
        </>
      )}
    </div>
  )
}

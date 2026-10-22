import { useEffect, useState } from 'react'

export const STAGE_W = 1920
export const STAGE_H = 1080

/* Khung hình 16:9 cố định 1920×1080, thu phóng vừa màn hình để bố cục giống nhau trên mọi TV và máy chiếu. */
export function useStageScale() {
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

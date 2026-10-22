import { useMemo } from 'react'

// Ngựa pixel-art nhìn ngang, quay mặt sang phải. Hai tư thế chân xen kẽ khi chạy.
const W = 24
const H = 16

const blank = () => Array.from({ length: H }, () => Array(W).fill('.'))
const inCircle = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r
const inRect = (x, y, x0, y0, x1, y1) => x >= x0 && x <= x1 && y >= y0 && y <= y1

function inPolygon(x, y, pts) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i, i += 1) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function distToSegment(px, py, [x0, y0], [x1, y1]) {
  const dx = x1 - x0
  const dy = y1 - y0
  const t = Math.max(0, Math.min(1, ((px - x0) * dx + (py - y0) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(px - (x0 + t * dx), py - (y0 + t * dy))
}

function paint(g, test) {
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const v = test(x + 0.5, y + 0.5)
      if (v) g[y][x] = v
    }
  }
}

const LEGS = [
  // tư thế 0: bốn chân dang rộng khi phi
  {
    far: [[[13.6, 9.6], [11.2, 14]], [[8.2, 9.6], [10.4, 14]]],
    near: [[[15.2, 9.6], [19.8, 12.8]], [[6.6, 9.6], [2.6, 12.8]]],
  },
  // tư thế 1: chân thu về dưới bụng
  {
    far: [[[13.8, 9.6], [13.2, 14.4]], [[8.2, 9.6], [9.2, 14.4]]],
    near: [[[15.4, 9.6], [16.8, 14.4]], [[6.6, 9.6], [5.6, 14.4]]],
  },
]

function buildHorse(frame) {
  const g = blank()
  const legs = LEGS[frame]
  // chân phía xa (tối hơn)
  legs.far.forEach((seg) => paint(g, (x, y) => (distToSegment(x, y, seg[0], seg[1]) < 0.95 ? 'S' : null)))
  // thân
  paint(g, (x, y) => {
    const inBody = inCircle(x, y, 6.2, 7.6, 2.7) || inCircle(x, y, 15.2, 7.4, 2.9) || inRect(x, y, 6.2, 4.9, 15.2, 10.3)
    if (!inBody) return null
    return y > 8.6 ? 'S' : 'B'
  })
  // cổ và đầu
  paint(g, (x, y) => (inPolygon(x, y, [[14, 5.8], [17.2, 1.8], [19.8, 2.8], [17.8, 7.6]]) ? 'B' : null))
  paint(g, (x, y) => (inPolygon(x, y, [[17.2, 1.6], [22.6, 4.4], [22.4, 6.4], [19.4, 6.2], [17.8, 4.4]]) ? 'B' : null))
  paint(g, (x, y) => (inRect(x, y, 17.4, 0.2, 18.6, 1.9) ? 'D' : null))
  // bờm và đuôi
  paint(g, (x, y) => (inPolygon(x, y, [[13.4, 4.8], [16.8, 0.8], [17.6, 1.7], [14.4, 5.9]]) ? 'D' : null))
  paint(g, (x, y) => (inPolygon(x, y, [[6, 5.4], [1.4, 6.2], [0.6, 10.6], [2.4, 9.8], [3.8, 7.8], [6.2, 7.6]]) ? 'D' : null))
  // chân phía gần
  legs.near.forEach((seg) => paint(g, (x, y) => (distToSegment(x, y, seg[0], seg[1]) < 1 ? 'B' : null)))
  // móng
  ;[...legs.far, ...legs.near].forEach((seg) =>
    paint(g, (x, y) => (distToSegment(x, y, seg[1], seg[1]) < 1.1 ? 'D' : null)),
  )
  // mắt, mõm
  paint(g, (x, y) => (inRect(x, y, 20.3, 3.3, 21, 4) ? 'W' : null))
  paint(g, (x, y) => (inRect(x, y, 21.9, 5, 22.6, 5.8) ? 'S' : null))
  // người cưỡi: áo kem, mũ theo màu đội
  paint(g, (x, y) => (inRect(x, y, 9.6, 2.8, 12.4, 5.4) ? 'J' : null))
  paint(g, (x, y) => (inCircle(x, y, 11, 1.9, 1.3) ? 'P' : null))
  paint(g, (x, y) => (inRect(x, y, 9.7, 0.4, 12.4, 1.3) ? 'T' : null))
  paint(g, (x, y) => (distToSegment(x, y, [12.2, 3.6], [14.4, 4.8]) < 0.6 ? 'J' : null))
  return g
}

function outline(grid) {
  const out = grid.map((row) => row.slice())
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (grid[y][x] !== '.') continue
      const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
        const nx = x + dx
        const ny = y + dy
        return nx >= 0 && ny >= 0 && nx < W && ny < H && grid[ny][nx] !== '.'
      })
      if (near) out[y][x] = 'K'
    }
  }
  return out
}

function shade(hex, f = 0.7) {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v * f))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function pathsFor(frame, color) {
  const grid = outline(buildHorse(frame))
  const palette = {
    B: color,
    S: shade(color, 0.7),
    D: '#2b1d14',
    W: '#f4eddc',
    J: '#f4eddc',
    P: '#e8c9a0',
    T: shade(color, 0.6),
    K: '#17120e',
  }
  const byColor = {}
  for (let y = 0; y < H; y += 1) {
    let x = 0
    while (x < W) {
      const c = grid[y][x]
      if (c === '.') {
        x += 1
        continue
      }
      let run = 1
      while (x + run < W && grid[y][x + run] === c) run += 1
      ;(byColor[c] ??= []).push(`M${x} ${y}h${run}v1h${-run}z`)
      x += run
    }
  }
  return Object.entries(byColor).map(([c, d]) => ({ fill: palette[c], d: d.join('') }))
}

export function HorseSprite({ color, gallop = false, width = 150, className = '' }) {
  const frames = useMemo(() => [pathsFor(0, color), pathsFor(1, color)], [color])
  const height = Math.round((width * H) / W)
  return (
    <span className={`dv-horse${gallop ? ' is-gallop' : ''} ${className}`} style={{ width, height }} aria-hidden="true">
      {frames.map((paths, i) => (
        <svg key={i} className={`dv-frame dv-frame-${i}`} viewBox={`0 0 ${W} ${H}`} width={width} height={height} shapeRendering="crispEdges">
          {paths.map((p) => (
            <path key={p.fill + p.d.length} d={p.d} fill={p.fill} />
          ))}
        </svg>
      ))}
    </span>
  )
}

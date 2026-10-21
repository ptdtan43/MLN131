import { useMemo } from 'react'

// Bảng màu pixel-art của game (đỏ cờ, vàng, kem, nâu, xanh nước, xám đá).
const PALETTE = {
  k: '#17120e', // viền tối
  w: '#f4eddc',
  p: '#f6e7a6',
  y: '#e0b040',
  Y: '#b8892e',
  r: '#c4272d',
  R: '#821519',
  o: '#e07a2c',
  b: '#3f78b8',
  B: '#9cc4ea',
  c: '#aee3ea',
  g: '#4a9a63',
  G: '#2c6a42',
  n: '#9a6436',
  N: '#5f3a1d',
  s: '#a39b8d',
  S: '#625d53',
}

const SIZE = 16

const blank = () => Array.from({ length: SIZE }, () => Array(SIZE).fill('.'))

function paint(grid, test) {
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const v = test(x + 0.5, y + 0.5, x, y)
      if (v) grid[y][x] = v
    }
  }
}

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

// Thêm viền tối 1 pixel quanh hình để dễ nhìn trên nền tối.
function outline(grid) {
  const out = grid.map((row) => row.slice())
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (grid[y][x] !== '.') continue
      const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
        const nx = x + dx
        const ny = y + dy
        return nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE && grid[ny][nx] !== '.'
      })
      if (near) out[y][x] = 'k'
    }
  }
  return out
}

function fromMap(rows) {
  return rows.map((row) => row.padEnd(SIZE, '.').split('').slice(0, SIZE))
}

const BUILDERS = {
  // Trăng
  moon() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inCircle(x, y, 8, 8.2, 6) || inCircle(x, y, 11.4, 6.2, 5.2)) return null
      return inCircle(x, y, 11.4, 6.2, 6.4) ? 'y' : 'p'
    })
    ;[[4, 9], [5, 9], [4, 10]].forEach(([x, y]) => {
      if (g[y][x] !== '.') g[y][x] = 'y'
    })
    return g
  },
  // Mật ong
  honey() {
    const g = blank()
    paint(g, (x, y) => {
      if (inRect(x, y, 4, 2.4, 12, 5)) return y > 4 ? 'N' : 'n'
      if (inRect(x, y, 3, 5, 13, 14.6)) {
        if (!inRect(x, y, 3.6, 5.6, 12.4, 14)) return 'Y'
        return x > 11 ? 'Y' : 'y'
      }
      return null
    })
    paint(g, (x, y) => (inRect(x, y, 5, 7.6, 11, 12.6) ? 'w' : null))
    ;[[8, 9], [7, 10], [8, 10], [9, 10], [7, 11], [8, 11], [9, 11]].forEach(([x, y]) => {
      g[y][x] = 'o'
    })
    ;[[4, 7], [4, 8], [4, 9], [4, 12]].forEach(([x, y]) => {
      g[y][x] = 'p'
    })
    ;[[6, 5], [6, 6], [10, 5]].forEach(([x, y]) => {
      g[y][x] = 'y'
    })
    return g
  },
  // Sao
  star() {
    const g = blank()
    const pts = []
    for (let i = 0; i < 10; i += 1) {
      const a = (-90 + i * 36) * (Math.PI / 180)
      const r = i % 2 === 0 ? 7.3 : 3.1
      pts.push([8 + Math.cos(a) * r, 8.4 + Math.sin(a) * r])
    }
    paint(g, (x, y) => {
      if (!inPolygon(x, y, pts)) return null
      if (x + y < 14.2) return 'p'
      if (x + y > 18) return 'Y'
      return 'y'
    })
    return g
  },
  // Cục băng
  ice() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inRect(x, y, 2, 3, 14, 14.6)) return null
      const corner = (x < 3 || x > 13) && (y < 4 || y > 13.6)
      if (corner) return null
      if (x > 12.4 || y > 13.4) return 'B'
      return 'c'
    })
    ;[[4, 5], [5, 5], [6, 5], [7, 5], [4, 6], [4, 7], [4, 8]].forEach(([x, y]) => {
      g[y][x] = 'w'
    })
    ;[[8, 8], [9, 9], [9, 10], [10, 11]].forEach(([x, y]) => {
      g[y][x] = 'B'
    })
    return g
  },
  // Lửa
  flame() {
    return fromMap([
      '................',
      '.......o........',
      '......oo........',
      '......ooo..o....',
      '.....oooo.oo....',
      '....ooooooooo...',
      '....oooyoooooo..',
      '...ooooyyooooo..',
      '...oooyyyyoooo..',
      '..ooooyyyyyooo..',
      '..oooyyyppyyoo..',
      '..oooyyppppyoo..',
      '..ooyyyppppyyo..',
      '...ooyyyppyyo...',
      '....oooyyyoo....',
      '................',
    ])
  },
  // Lều trại
  tent() {
    const g = blank()
    const tri = [[8, 3.4], [1.6, 14.2], [14.4, 14.2]]
    paint(g, (x, y) => {
      if (!inPolygon(x, y, tri)) return null
      return x > 8.2 ? 'R' : 'r'
    })
    paint(g, (x, y) => (inPolygon(x, y, [[8, 7.8], [5.6, 14.2], [10.4, 14.2]]) ? 'N' : null))
    ;[[8, 1], [8, 2], [8, 3]].forEach(([x, y]) => {
      g[y][x] = 'n'
    })
    ;[[9, 1], [10, 1], [9, 2]].forEach(([x, y]) => {
      g[y][x] = 'y'
    })
    return g
  },
  // Thuyền (đò)
  boat() {
    const g = blank()
    paint(g, (x, y) => {
      if (inPolygon(x, y, [[7.6, 1.6], [7.6, 9.6], [2.6, 9.6]])) return 'w'
      if (inPolygon(x, y, [[8.6, 3.4], [8.6, 9.6], [13.2, 9.6]])) return x > 11 ? 's' : 'w'
      if (inRect(x, y, 7.6, 1.6, 8.6, 10.4)) return 'N'
      if (inPolygon(x, y, [[1.4, 10.4], [14.6, 10.4], [12.8, 13.4], [3.2, 13.4]])) return y > 12 ? 'N' : 'n'
      return null
    })
    ;[[9, 0], [10, 0], [9, 1], [10, 1]].forEach(([x, y]) => {
      g[y][x] = 'r'
    })
    for (let x = 0; x < 16; x += 1) {
      if (g[14][x] === '.') g[14][x] = x % 4 < 2 ? 'b' : 'B'
    }
    return g
  },
  // Cầu vòm
  bridge() {
    const g = blank()
    const top = (x) => 6.6 - 3 * (1 - ((x - 8) / 7.6) ** 2)
    paint(g, (x, y) => {
      if (x < 0.4 || x > 15.6) return null
      const t = top(x)
      if (y < t || y > 14) return null
      // mặt cầu cong lên ở giữa
      if (y < t + 1.6) return 's'
      // lan can nhỏ trên mặt cầu
      // thân cầu, chừa ô vòm cho nước chảy qua
      const ox = (x - 8) / 5.4
      const oy = (y - 14) / 6.2
      if (ox * ox + oy * oy <= 1) return y > 12 ? 'b' : null
      return x > 8 ? 'S' : 's'
    })
    paint(g, (x, y) => (y > 3 && y < top(x) && Math.abs(x - 8) > 5.6 && Math.abs(x - 8) < 7.4 ? 'S' : null))
    for (let x = 0; x < 16; x += 1) {
      if (g[14][x] === '.' || g[14][x] === 'b') g[14][x] = x % 4 < 2 ? 'b' : 'B'
      if (g[13][x] === 'b' && x % 4 >= 2) g[13][x] = 'B'
    }
    return g
  },
}

export const SPRITE_NAMES = Object.keys(BUILDERS)

function buildPaths(name) {
  const build = BUILDERS[name]
  if (!build) return []
  const grid = outline(build())
  const byColor = {}
  for (let y = 0; y < SIZE; y += 1) {
    let x = 0
    while (x < SIZE) {
      const c = grid[y][x]
      if (c === '.') {
        x += 1
        continue
      }
      let run = 1
      while (x + run < SIZE && grid[y][x + run] === c) run += 1
      ;(byColor[c] ??= []).push(`M${x} ${y}h${run}v1h${-run}z`)
      x += run
    }
  }
  return Object.entries(byColor).map(([c, d]) => ({ color: PALETTE[c], d: d.join('') }))
}

// Hình pixel-art tự vẽ bằng mã. Mỗi hình là một thẻ SVG gồm vài đường path nên rất nhẹ.
export function PixelSprite({ name, size = 320, className = '', label }) {
  const paths = useMemo(() => buildPaths(name), [name])
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {paths.map((p) => (
        <path key={p.color} d={p.d} fill={p.color} />
      ))}
    </svg>
  )
}

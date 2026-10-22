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
  m: '#e8789a',
  M: '#b84a6c',
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
  // Mặt trời
  sun() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inCircle(x, y, 8, 8, 4.4)) return null
      if (x + y < 14) return 'p'
      if (x + y > 18) return 'Y'
      return 'y'
    })
    const rays = [[0, -6.2], [0, 6.2], [-6.2, 0], [6.2, 0], [-4.5, -4.5], [4.5, -4.5], [-4.5, 4.5], [4.5, 4.5]]
    rays.forEach(([dx, dy]) => {
      const cx = Math.floor(8 + dx)
      const cy = Math.floor(8 + dy)
      ;[[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([a, b]) => {
        const x = cx + a - (dx > 0 ? 0 : 0)
        const y = cy + b
        if (x >= 1 && x <= 14 && y >= 1 && y <= 14 && g[y][x] === '.') g[y][x] = 'o'
      })
    })
    return g
  },
  // Núi
  mountain() {
    const g = blank()
    paint(g, (x, y) => {
      if (inPolygon(x, y, [[6.4, 3], [0.8, 14.2], [12, 14.2]])) {
        if (y < 6.2) return 'w'
        return x > 6.6 ? 'N' : 'n'
      }
      if (inPolygon(x, y, [[11.6, 6.4], [7.2, 14.2], [15.4, 14.2]])) {
        if (y < 8.2) return 's'
        return x > 11.8 ? 'S' : 's'
      }
      return null
    })
    return g
  },
  // Sông
  river() {
    const g = blank()
    paint(g, (x, y) => {
      if (y < 1 || y > 14.6) return null
      const cx = 8 + 3 * Math.sin(y * 0.6)
      const d = Math.abs(x - cx)
      if (d < 2.6) return (Math.floor(y) + Math.floor(x)) % 3 === 0 ? 'B' : 'b'
      return x < cx ? 'g' : 'G'
    })
    return g
  },
  // Quả bóng (bóng rổ)
  ball() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inCircle(x, y, 8, 8, 6.4)) return null
      return x > 9 && y > 9 && x + y > 19.4 ? 'n' : 'o'
    })
    paint(g, (x, y) => {
      if (!inCircle(x, y, 8, 8, 6.4)) return null
      const vertical = Math.abs(x - 7.5) < 0.3
      const horizontal = Math.abs(y - 7.5) < 0.3
      const left = Math.abs(Math.hypot(x - 0.6, y - 8) - 5.6) < 0.5
      const right = Math.abs(Math.hypot(x - 15.4, y - 8) - 5.6) < 0.5
      return vertical || horizontal || left || right ? 'N' : null
    })
    ;[[5, 4], [6, 4], [4, 5], [5, 5]].forEach(([x, y]) => {
      if (g[y][x] === 'o') g[y][x] = 'y'
    })
    return g
  },
  // Bóng đèn
  bulb() {
    const g = blank()
    paint(g, (x, y) => {
      if (inCircle(x, y, 8, 6.4, 4.8)) return x + y < 12.5 ? 'w' : 'p'
      if (inPolygon(x, y, [[5.2, 9.2], [10.8, 9.2], [9.6, 11.6], [6.4, 11.6]])) return 'p'
      if (inRect(x, y, 6, 11.6, 10, 14)) return Math.floor(y) % 2 === 0 ? 's' : 'S'
      return null
    })
    ;[[7, 5], [8, 5], [9, 5], [7, 6], [9, 6], [8, 7]].forEach(([x, y]) => {
      g[y][x] = 'y'
    })
    return g
  },
  // Nón lá
  hat() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inPolygon(x, y, [[8, 2.4], [0.8, 12.2], [15.2, 12.2]])) return null
      if (Math.floor(y) % 2 === 1) return 'y'
      return x > 8.4 ? 'Y' : 'p'
    })
    ;[[4, 12], [4, 13], [12, 12], [12, 13]].forEach(([x, y]) => {
      g[y][x] = 'r'
    })
    return g
  },
  // Chiếc lá
  leaf() {
    const g = blank()
    const rot = (x, y) => {
      const a = (35 * Math.PI) / 180
      const dx = x - 8
      const dy = y - 8
      return [dx * Math.cos(a) + dy * Math.sin(a), -dx * Math.sin(a) + dy * Math.cos(a)]
    }
    paint(g, (x, y) => {
      const [u, v] = rot(x, y)
      if ((u / 3.9) ** 2 + (v / 6.4) ** 2 > 1) return null
      if (Math.abs(u) < 0.55) return 'G'
      return u > 0 ? 'G' : 'g'
    })
    ;[[3, 13], [2, 14]].forEach(([x, y]) => {
      g[y][x] = 'N'
    })
    return g
  },
  // Bông hoa
  flower() {
    const g = blank()
    paint(g, (x, y) => (inRect(x, y, 7.4, 10, 8.6, 15) ? 'g' : null))
    ;[[9, 12], [10, 12], [10, 11], [6, 13], [5, 13], [5, 12]].forEach(([x, y]) => {
      g[y][x] = 'g'
    })
    for (let i = 0; i < 5; i += 1) {
      const a = (-90 + i * 72) * (Math.PI / 180)
      const cx = 8 + Math.cos(a) * 3.6
      const cy = 6.6 + Math.sin(a) * 3.6
      paint(g, (x, y) => (inCircle(x, y, cx, cy, 2.6) ? (i < 2 ? 'm' : 'M') : null))
    }
    paint(g, (x, y) => (inCircle(x, y, 8, 6.6, 2) ? 'y' : null))
    return g
  },
  // Quả táo
  apple() {
    const g = blank()
    paint(g, (x, y) => {
      if (inCircle(x, y, 5.9, 9, 4.6) || inCircle(x, y, 10.1, 9, 4.6) || inRect(x, y, 5.9, 5, 10.1, 13.6)) {
        if (y < 4.4) return null
        return x > 10 || y > 12.6 ? 'R' : 'r'
      }
      return null
    })
    ;[[5, 7], [5, 8], [6, 6]].forEach(([x, y]) => {
      if (g[y][x] !== '.') g[y][x] = 'm'
    })
    ;[[8, 2], [8, 3], [8, 4]].forEach(([x, y]) => {
      g[y][x] = 'N'
    })
    ;[[9, 2], [10, 2], [11, 2], [10, 3], [9, 3]].forEach(([x, y]) => {
      g[y][x] = 'g'
    })
    return g
  },
  // Trái tim
  heart() {
    const g = blank()
    paint(g, (x, y) => {
      const nx = (x - 8) / 6.4
      const ny = -(y - 8.8) / 6.4
      const v = (nx * nx + ny * ny - 1) ** 3 - nx * nx * ny ** 3
      if (v > 0) return null
      if (x + y < 12.6) return 'm'
      if (x + y > 18.4) return 'R'
      return 'r'
    })
    return g
  },
  // Tia chớp (tăng tốc)
  bolt() {
    const g = blank()
    paint(g, (x, y) => {
      if (!inPolygon(x, y, [[10.6, 0.6], [2.6, 9.2], [7.4, 9.2], [5, 15.4], [13.6, 6.4], [8.8, 6.4], [13, 0.6]])) return null
      return x + y < 14.5 ? 'p' : 'y'
    })
    return g
  },
  // Móng ngựa (may mắn)
  shoe() {
    const g = blank()
    paint(g, (x, y) => {
      const d = Math.hypot(x - 8, y - 8.4)
      if (d < 3.4 || d > 6.6) return null
      if (y < 8.6 && Math.abs(x - 8) < 3.2) return null
      return x + y < 15 ? 'w' : 's'
    })
    ;[[3, 9], [4, 12], [12, 12], [13, 9], [4, 5], [12, 5]].forEach(([x, y]) => {
      if (g[y][x] !== '.') g[y][x] = 'S'
    })
    return g
  },
  // Nam châm (cướp bước)
  magnet() {
    const g = blank()
    paint(g, (x, y) => {
      const d = Math.hypot(x - 8, y - 9)
      if (d < 3.2 || d > 6.4) return null
      if (y < 9 && Math.abs(x - 8) < 3.2) return null
      if (y < 5.2) return 'w'
      return x < 8 ? 'r' : 'R'
    })
    paint(g, (x, y) => (inRect(x, y, 1.6, 2.6, 4.8, 5.2) ? 'w' : inRect(x, y, 11.2, 2.6, 14.4, 5.2) ? 's' : null))
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

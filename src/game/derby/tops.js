/* Top 1 và Top 2 của Picture Rush, lưu tạm trong phiên để Knowledge Derby tự điền vé Vàng, vé Bạc.
   Số trong top1, top2 là vị trí của đội trong TEAMS (derbyData.js). Mở Derby trực tiếp thì không có gì được lưu và game hỏi chọn tay. */
const KEY = 'mln131-tops'

export function saveTops(top1, top2) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ top1, top2 }))
  } catch {
    /* trình duyệt chặn lưu trữ: Derby sẽ hỏi chọn tay */
  }
}

export function clearTops() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* bỏ qua */
  }
}

export function loadTops(teamCount) {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) ?? 'null')
    const ok = (n) => Number.isInteger(n) && n >= 0 && n < teamCount
    if (v && ok(v.top1) && ok(v.top2) && v.top1 !== v.top2) return v
  } catch {
    /* dữ liệu hỏng: coi như chưa có */
  }
  return null
}

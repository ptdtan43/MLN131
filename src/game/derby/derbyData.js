/* Dữ liệu game "Knowledge Derby" (đường đua kiến thức), game củng cố cuối bài.
   Chín câu hỏi nhanh chia ba chặng. Năm đội (năm nhóm còn lại của lớp) giơ tay đọc đáp án; người trình bày hiện lời giải rồi chạm vào đội làm đúng.
   Muốn đổi số đội, chỉ cần thêm hoặc bớt một dòng trong TEAMS; phần còn lại của game tự theo số này
   (riêng bố cục đường đua trong Derby.css được chỉnh cho tối đa 5 làn). */

export const TEAMS = [
  { id: 0, name: 'Đội 1', color: '#D2513F' },
  { id: 1, name: 'Đội 2', color: '#3AA396' },
  { id: 2, name: 'Đội 3', color: '#D9A13E' },
  { id: 3, name: 'Đội 4', color: '#6273C4' },
  { id: 4, name: 'Đội 5', color: '#D46FA8' },
]

/* Quyền lợi: Top 1 của "Đuổi hình bắt chữ" nhận Vé Vàng và tự chọn; Top 2 nhận Vé Bạc và quay ngẫu nhiên. */
export const PERKS = [
  { id: 'double', name: 'Nhân đôi', badge: '×2', sprite: 'bolt', desc: 'Ở một câu bạn chọn, trả lời đúng được 2 bước thay vì 1. Chỉ dùng một lần, cho một câu duy nhất.' },
  { id: 'plus2', name: 'Tiến thêm 2 bước', badge: '+2', sprite: 'shoe', desc: 'Cộng thêm 2 bước ở câu bạn chọn, kể cả khi trả lời sai. Dùng một lần.' },
  { id: 'steal', name: 'Cướp 1 bước', badge: '−1', sprite: 'magnet', desc: 'Sau khi chấm một câu, lấy 1 bước của đội đang có bước. Dùng một lần, không dùng được khi chưa đội nào có bước.' },
]

export const TRACK_STEPS = 14

/* Các cột mốc trên đường đua, gắn với nội dung bài: con đường quá độ. */
export const STATIONS = [
  { step: 0, year: 'Xuất phát', label: 'Thuộc địa nửa phong kiến' },
  { step: 3, year: '1930', label: 'Cương lĩnh' },
  { step: 6, year: '1991', label: 'Sáu đặc trưng' },
  { step: 9, year: '2011', label: 'Tám đặc trưng' },
  { step: 12, year: '2021', label: 'Đại hội XIII' },
  { step: 14, year: 'Đích', label: 'Dân giàu,\nnước mạnh' },
]

/* Ba chặng, mỗi chặng ba câu nhanh. */
export const STAGES = [
  { name: 'Phân loại', blurb: 'Bỏ qua hay kế thừa?' },
  { name: 'Xếp mốc', blurb: 'Sắp theo thứ tự thời gian' },
  { name: 'Điền từ', blurb: 'Từ nào còn thiếu?' },
]

const SORT_HOW = 'Giơ tay đọc đáp án: Bỏ qua hoặc Kế thừa.'

/* Chặng 1: phân loại từng thẻ (giáo trình tr.111–112). */
const sortRound = (nth, text, answer) => ({
  id: 'sort',
  stage: 0,
  nth,
  seconds: 20,
  task: 'Thẻ này là “Bỏ qua” hay “Kế thừa”?',
  how: SORT_HOW,
  statement: text,
  answer,
  answerLine: answer === 'skip' ? 'Bỏ qua' : 'Kế thừa',
})

/* Các mốc dùng ở chặng 2. title là sự kiện; hint là bối cảnh để suy ra năm mà không cần nhớ con số. */
const EVENTS = {
  1930: { title: 'Đảng ra đời, Cương lĩnh chính trị đầu tiên', hint: 'Trước Cách mạng tháng Tám 1945' },
  1986: { title: 'Đại hội VI mở đầu công cuộc đổi mới', hint: 'Hơn 10 năm sau khi đất nước thống nhất (1975)' },
  1991: { title: 'Đại hội VII: Cương lĩnh quá độ lên chủ nghĩa xã hội', hint: 'Sáu đặc trưng; Liên Xô, Đông Âu sụp đổ' },
  2011: { title: 'Đại hội XI: Cương lĩnh bổ sung, phát triển', hint: 'Tám đặc trưng; tổng kết 25 năm đổi mới' },
  2021: { title: 'Đại hội XIII: mục tiêu đến 2025, 2030, 2045', hint: 'Tầm nhìn đến 2045, tròn 100 năm lập nước' },
}
const ev = (letter, rank, year) => ({ letter, rank, year: String(year), ...EVENTS[year] })

/* Chặng 2: ghép mỗi mốc với năm trong bảng năm cho sẵn (có một năm không dùng đến), rồi xếp theo thứ tự thời gian.
   rank là thứ tự đúng (0 là sớm nhất). */
const orderRound = (nth, seconds, cards, years) => ({
  id: 'order',
  stage: 1,
  nth,
  seconds,
  task: 'Ghép năm với mốc, rồi xếp theo thứ tự thời gian.',
  how: 'Giơ tay đọc chữ cái và năm, từ sớm đến muộn.',
  cards,
  years,
  answerLine: [...cards].sort((a, b) => a.rank - b.rank).map((c) => `${c.letter} ${c.year}`).join('  '),
})

/* Chặng 3: điền một từ còn thiếu; cả chặng dùng chung một bảng từ, có một từ không dùng đến. */
export const CLOZE_BANK = ['gián tiếp', 'thống trị', 'trực tiếp', 'thành phần']

const clozeRound = (nth, before, after, answer) => ({
  id: 'cloze',
  stage: 2,
  nth,
  seconds: 25,
  task: 'Điền từ còn thiếu vào câu.',
  how: 'Giơ tay đọc một từ. Một từ trong bảng sẽ không dùng đến.',
  cloze: { before, after, answer },
  answerLine: answer,
})

export const ROUNDS = [
  sortRound(1, 'Khoa học và công nghệ hiện đại của nhân loại', 'keep'),
  sortRound(2, 'Quan hệ sản xuất tư bản chủ nghĩa giữ vị trí thống trị', 'skip'),
  sortRound(3, 'Những thành tựu nhân loại đạt được dưới chế độ tư bản chủ nghĩa', 'keep'),
  orderRound(1, 40, [ev('A', 2, 2011), ev('B', 0, 1986), ev('C', 1, 1991)], ['2011', '2001', '1986', '1991']),
  orderRound(2, 40, [ev('A', 1, 1991), ev('B', 2, 2021), ev('C', 0, 1930)], ['2016', '1991', '1930', '2021']),
  orderRound(3, 55, [ev('A', 3, 2011), ev('B', 0, 1930), ev('C', 4, 2021), ev('D', 1, 1986), ev('E', 2, 1991)], ['2011', '1930', '1996', '2021', '1986', '1991']),
  clozeRound(1, 'Bỏ qua chế độ tư bản chủ nghĩa là bỏ qua việc xác lập vị trí ', ' của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.', 'thống trị'),
  clozeRound(2, 'Thời kỳ quá độ có nhiều hình thức sở hữu, nhiều ', ' kinh tế.', 'thành phần'),
  clozeRound(3, 'Việt Nam quá độ ', ' lên chủ nghĩa xã hội, bỏ qua chế độ tư bản chủ nghĩa.', 'gián tiếp'),
]

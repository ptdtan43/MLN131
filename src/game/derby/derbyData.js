/* Dữ liệu game "Knowledge Derby" (đường đua kiến thức), game củng cố cuối bài.
   Chín câu hỏi nhanh chia ba chặng. Bốn đội viết đáp án lên bảng; người trình bày hiện lời giải rồi chạm vào đội làm đúng. */

export const TEAMS = [
  { id: 0, name: 'Đội 1', color: '#D2513F' },
  { id: 1, name: 'Đội 2', color: '#3AA396' },
  { id: 2, name: 'Đội 3', color: '#D9A13E' },
  { id: 3, name: 'Đội 4', color: '#6273C4' },
]

/* Quyền lợi: Top 1 của "Đuổi hình bắt chữ" nhận Vé Vàng và tự chọn; Top 2 nhận Vé Bạc và quay ngẫu nhiên. */
export const PERKS = [
  { id: 'double', name: 'Nhân đôi', badge: '×2', sprite: 'bolt', desc: 'Từ câu bạn chọn đến hết chặng đó, mỗi câu đúng được 2 bước thay vì 1. Dùng ở câu đầu chặng sẽ được lợi nhất. Dùng một lần.' },
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

const SORT_HOW = 'Viết lên bảng: Bỏ qua hoặc Kế thừa.'

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

/* Chặng 2: xếp các mốc theo thứ tự thời gian. rank là thứ tự đúng (0 là sớm nhất). */
const orderRound = (nth, seconds, cards) => ({
  id: 'order',
  stage: 1,
  nth,
  seconds,
  task: 'Xếp các mốc theo thứ tự thời gian.',
  how: `Viết các chữ cái từ sớm nhất đến muộn nhất, ví dụ: ${cards.map((c) => c.letter).join(' ')}`,
  cards,
  answerLine: [...cards].sort((a, b) => a.rank - b.rank).map((c) => c.letter).join('  '),
})

/* Chặng 3: điền một từ còn thiếu; cả chặng dùng chung một bảng từ, có một từ không dùng đến. */
export const CLOZE_BANK = ['gián tiếp', 'thống trị', 'trực tiếp', 'thành phần']

const clozeRound = (nth, before, after, answer) => ({
  id: 'cloze',
  stage: 2,
  nth,
  seconds: 25,
  task: 'Điền từ còn thiếu vào câu.',
  how: 'Viết một từ lên bảng. Một từ trong bảng sẽ không dùng đến.',
  cloze: { before, after, answer },
  answerLine: answer,
})

export const ROUNDS = [
  sortRound(1, 'Khoa học và công nghệ hiện đại của nhân loại', 'keep'),
  sortRound(2, 'Quan hệ sản xuất tư bản chủ nghĩa giữ vị trí thống trị', 'skip'),
  sortRound(3, 'Những thành tựu nhân loại đạt được dưới chế độ tư bản chủ nghĩa', 'keep'),
  orderRound(1, 30, [
    { letter: 'A', rank: 2, year: '2011', text: 'Tám đặc trưng của chủ nghĩa xã hội' },
    { letter: 'B', rank: 0, year: '1930', text: 'Sau cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội' },
    { letter: 'C', rank: 1, year: '1991', text: 'Sáu đặc trưng của chủ nghĩa xã hội' },
  ]),
  orderRound(2, 30, [
    { letter: 'A', rank: 1, year: '1991', text: 'Sáu đặc trưng của chủ nghĩa xã hội' },
    { letter: 'B', rank: 2, year: '2021', text: 'Mục tiêu đến 2025, 2030, 2045' },
    { letter: 'C', rank: 0, year: '1976', text: 'Nhận thức về chủ nghĩa xã hội mới dừng ở mức định hướng' },
  ]),
  orderRound(3, 40, [
    { letter: 'A', rank: 3, year: '2011', text: 'Tám đặc trưng của chủ nghĩa xã hội' },
    { letter: 'B', rank: 0, year: '1930', text: 'Sau cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội' },
    { letter: 'C', rank: 4, year: '2021', text: 'Mục tiêu đến 2025, 2030, 2045' },
    { letter: 'D', rank: 1, year: '1976', text: 'Nhận thức về chủ nghĩa xã hội mới dừng ở mức định hướng' },
    { letter: 'E', rank: 2, year: '1991', text: 'Sáu đặc trưng của chủ nghĩa xã hội' },
  ]),
  clozeRound(1, 'Bỏ qua chế độ tư bản chủ nghĩa là bỏ qua việc xác lập vị trí ', ' của quan hệ sản xuất tư bản chủ nghĩa.', 'thống trị'),
  clozeRound(2, 'Thời kỳ quá độ có nhiều hình thức sở hữu, nhiều ', ' kinh tế.', 'thành phần'),
  clozeRound(3, 'Việt Nam quá độ ', ' vì chưa qua chủ nghĩa tư bản phát triển.', 'gián tiếp'),
]

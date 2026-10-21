/* Dữ liệu game "Knowledge Derby" (đường đua kiến thức), game củng cố cuối bài.
   Bốn đội viết lời giải lên bảng; người trình bày hiện lời giải rồi nhập số ý mỗi đội làm đúng. */

export const TEAMS = [
  { id: 0, name: 'Đội 1', color: '#D2513F' },
  { id: 1, name: 'Đội 2', color: '#3AA396' },
  { id: 2, name: 'Đội 3', color: '#D9A13E' },
  { id: 3, name: 'Đội 4', color: '#6273C4' },
]

/* Quyền lợi: Top 1 của "Đuổi hình bắt chữ" nhận Vé Vàng và tự chọn; Top 2 nhận Vé Bạc và quay ngẫu nhiên. */
export const PERKS = [
  { id: 'double', name: 'Nhân đôi', badge: '×2', sprite: 'bolt', desc: 'Chọn một vòng: số bước đội ghi được trong vòng đó được nhân đôi.' },
  { id: 'plus2', name: 'Tiến thêm 2 bước', badge: '+2', sprite: 'shoe', desc: 'Tiến ngay 2 bước trên đường đua, dùng vào vòng nào cũng được.' },
  { id: 'steal', name: 'Cướp 1 bước', badge: '−1', sprite: 'magnet', desc: 'Lấy 1 bước của một đội khác, dùng vào vòng nào cũng được.' },
]

export const TRACK_STEPS = 24

/* Các cột mốc trên đường đua, gắn với nội dung bài: con đường quá độ. */
export const STATIONS = [
  { step: 0, year: 'Xuất phát', label: 'Thuộc địa nửa phong kiến' },
  { step: 5, year: '1930', label: 'Cương lĩnh' },
  { step: 10, year: '1991', label: 'Sáu đặc trưng' },
  { step: 15, year: '2011', label: 'Tám đặc trưng' },
  { step: 20, year: '2021', label: 'Đại hội XIII' },
  { step: 24, year: 'Đích', label: 'Dân giàu, nước mạnh' },
]

/* Vòng 1: phân loại. Mỗi thẻ là "Bỏ qua" hay "Kế thừa" (giáo trình tr.111–112). */
const SORT_CARDS = [
  { letter: 'A', text: 'Quan hệ sản xuất tư bản chủ nghĩa giữ vị trí thống trị', answer: 'skip' },
  { letter: 'B', text: 'Khoa học và công nghệ hiện đại của nhân loại', answer: 'keep' },
  { letter: 'C', text: 'Thành tựu về quản lý phát triển xã hội', answer: 'keep' },
  { letter: 'D', text: 'Kinh tế tư nhân tư bản chủ nghĩa giữ vai trò chủ đạo', answer: 'skip' },
  { letter: 'E', text: 'Quan hệ bóc lột tư bản chủ nghĩa giữ vai trò thống trị', answer: 'skip' },
  { letter: 'F', text: 'Những thành tựu nhân loại đạt được dưới chế độ tư bản chủ nghĩa', answer: 'keep' },
]

/* Vòng 2: xếp mốc theo thứ tự thời gian. rank là thứ tự đúng (0 là sớm nhất). */
const ORDER_CARDS = [
  { letter: 'A', rank: 3, year: '2011', text: 'Tám đặc trưng của chủ nghĩa xã hội' },
  { letter: 'B', rank: 0, year: '1930', text: 'Sau cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội' },
  { letter: 'C', rank: 4, year: '2021', text: 'Mục tiêu đến 2025, 2030, 2045' },
  { letter: 'D', rank: 1, year: '1976', text: 'Nhận thức về chủ nghĩa xã hội mới dừng ở mức định hướng' },
  { letter: 'E', rank: 2, year: '1991', text: 'Sáu đặc trưng của chủ nghĩa xã hội' },
]

/* Vòng 3: điền từ còn thiếu vào sơ đồ. */
const CLOZE = {
  bank: ['thống trị', 'thành phần', 'lao động', 'gián tiếp', 'chất', 'trực tiếp', 'lượng'],
  items: [
    { before: 'Bỏ qua chế độ tư bản chủ nghĩa là bỏ qua việc xác lập vị trí ', after: ' của quan hệ sản xuất tư bản chủ nghĩa.', answer: 'thống trị' },
    { before: 'Thời kỳ quá độ có nhiều hình thức sở hữu, nhiều ', after: ' kinh tế.', answer: 'thành phần' },
    { before: 'Phân phối theo ', after: ' vẫn là chủ đạo trong thời kỳ quá độ.', answer: 'lao động' },
    { before: 'Việt Nam quá độ ', after: ' vì chưa qua chủ nghĩa tư bản phát triển.', answer: 'gián tiếp' },
    { before: 'Quá độ tạo ra sự biến đổi về ', after: ' của xã hội trên mọi lĩnh vực.', answer: 'chất' },
  ],
}

export const ROUNDS = [
  {
    id: 'sort',
    name: 'Phân loại',
    seconds: 45,
    max: SORT_CARDS.length,
    task: 'Mỗi thẻ là “Bỏ qua” hay “Kế thừa”?',
    how: 'Viết lên bảng, ví dụ: A Kế thừa, B Bỏ qua…',
    cards: SORT_CARDS,
    answerLine: 'Bỏ qua: A, D, E. Kế thừa: B, C, F.',
  },
  {
    id: 'order',
    name: 'Xếp mốc',
    seconds: 45,
    max: ORDER_CARDS.length,
    task: 'Xếp các mốc theo thứ tự thời gian.',
    how: 'Viết các chữ cái từ sớm nhất đến muộn nhất, ví dụ: C A E B D',
    cards: ORDER_CARDS,
    answerLine: [...ORDER_CARDS].sort((a, b) => a.rank - b.rank).map((c) => c.letter).join('  '),
  },
  {
    id: 'cloze',
    name: 'Điền sơ đồ',
    seconds: 60,
    max: CLOZE.items.length,
    task: 'Điền từ còn thiếu vào năm câu.',
    how: 'Viết năm từ theo thứ tự 1 đến 5. Có một từ không dùng đến.',
    cloze: CLOZE,
    answerLine: CLOZE.items.map((c, i) => `${i + 1}. ${c.answer}`).join('   '),
  },
]

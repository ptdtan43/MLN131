/* Nội dung hai trò chơi của nhóm MLN131 · Nhóm 1 (Quá độ lên chủ nghĩa xã hội ở Việt Nam).
   Picture Rush là hoạt động mở đầu; Knowledge Derby (src/game/derby/derbyData.js) là game ôn tập.
   Phần lý thuyết đã chuyển sang slide nên không còn trên web. */

/* Picture Rush (đổi hình bắt chữ), hoạt động mở đầu. Chín câu đố vui không liên quan bài học, câu cuối dẫn vào bài. Các đội giơ tay đọc đáp án; hết giờ thì đáp án hiện ra để ghi điểm.
   sprites: tên hình pixel-art trong src/game/pixel.jsx; names: tên từng hình (hiện sau khi có đáp án).
   Muốn dùng ảnh thật thay hình pixel-art, thêm images: ['img/anh-1.jpg', 'img/anh-2.jpg'] vào câu đố. */
export const PICTURE_RUSH = {
  title: 'PICTURE RUSH',
  subtitle: 'Đổi hình bắt chữ',
  seconds: 30,
  autoHints: [20, 10],
  puzzles: [
    { sprites: ['moon', 'honey'], names: ['Trăng', 'Mật'], answer: 'TRĂNG MẬT', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['star', 'ice'], names: ['Sao', 'Băng'], answer: 'SAO BĂNG', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['flame', 'tent'], names: ['Lửa', 'Trại'], answer: 'LỬA TRẠI', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['sun', 'moon'], names: ['Ngày', 'Đêm'], answer: 'NGÀY ĐÊM', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['flower', 'apple'], names: ['Hoa', 'Quả'], answer: 'HOA QUẢ', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['mountain', 'river'], names: ['Non', 'Sông'], answer: 'NON SÔNG', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['apple', 'heart'], names: ['Trái', 'Tim'], answer: 'TRÁI TIM', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['ball', 'bulb'], names: ['Bóng', 'Đèn'], answer: 'BÓNG ĐÈN', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['hat', 'leaf'], names: ['Nón', 'Lá'], answer: 'NÓN LÁ', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['bridge', 'boat'], names: ['Qua', 'Đò'], answer: 'QUA ĐÒ', kind: 'Câu cuối: đọc to cả hai hình, nghe có quen không?', final: true },
  ],
  finalTitle: 'QUÁ ĐỘ',
  finalLead: 'Nghe gần giống nhau đấy: "qua đò" và "quá độ". Hôm nay ta học về thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam.',
}

/* Trò chơi thẻ "Bỏ qua hay kế thừa?" (trang phụ, không nằm trên menu). answer: 'skip' là bỏ qua, 'keep' là kế thừa. Căn cứ giáo trình tr.111–112. */
export const OPENING = {
  title: 'Bỏ qua hay kế thừa?',
  how: 'Cả lớp giơ tay chọn. Bạn bấm theo số đông.',
  cards: [
    { text: 'Khoa học và công nghệ hiện đại của nhân loại', answer: 'keep',
      why: 'Phải tiếp thu, kế thừa thành tựu nhân loại, đặc biệt là khoa học và công nghệ.' },
    { text: 'Quan hệ sản xuất tư bản chủ nghĩa giữ vị trí thống trị', answer: 'skip',
      why: 'Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.' },
    { text: 'Thành tựu về quản lý phát triển xã hội', answer: 'keep',
      why: 'Đây là thành tựu của nhân loại, cần tiếp thu để xây dựng nền kinh tế hiện đại.' },
    { text: 'Kinh tế tư nhân tư bản chủ nghĩa giữ vai trò chủ đạo', answer: 'skip',
      why: 'Trong thời kỳ quá độ vẫn có nhiều thành phần kinh tế, nhưng thành phần này không giữ vai trò chủ đạo.' },
    { text: 'Những thành tựu mà nhân loại đạt được dưới chế độ tư bản chủ nghĩa', answer: 'keep',
      why: 'Bỏ qua chế độ tư bản chủ nghĩa không có nghĩa là bỏ hết mọi thành tựu của nó.' },
    { text: 'Quan hệ bóc lột tư bản chủ nghĩa giữ vai trò thống trị', answer: 'skip',
      why: 'Vẫn còn quan hệ bóc lột và bị bóc lột, nhưng nó không giữ vai trò thống trị.' },
  ],
  endTitle: 'Bỏ qua không có nghĩa là bỏ hết.',
  endLead: 'Bỏ qua cái thống trị, kế thừa cái tiến bộ. Giờ ta vào bài để xem điều đó có nghĩa thế nào.',
}


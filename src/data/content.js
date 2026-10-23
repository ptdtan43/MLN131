/* Nội dung game mở đầu Picture Rush (đổi hình bắt chữ). Muốn sửa chữ trên web, chỉ cần sửa file này.
   Nội dung game cuối Knowledge Derby nằm trong src/game/derby/derbyData.js. */

/* Picture Rush (đổi hình bắt chữ), hoạt động mở đầu. Mười câu đố vui không liên quan bài học, câu cuối dẫn vào bài. Các đội viết đáp án lên bảng; hết giờ thì đáp án hiện ra để ghi điểm.
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
    { sprites: ['bridge', 'boat'], names: ['Qua', 'Đò'], answer: 'QUÁ ĐỘ', kind: 'Câu cuối: nghe giống nhau', final: true },
  ],
  finalTitle: 'QUÁ ĐỘ',
  finalLead: 'Đúng rồi: "qua đò" nghe giống "quá độ". Hôm nay ta nói về thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam.',
}

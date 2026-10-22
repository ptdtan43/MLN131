# MLN131 · Nhóm 1 · Quá độ lên CNXH ở Việt Nam

Trang web thuyết trình môn Chủ nghĩa xã hội khoa học (Đại học FPT TP.HCM), làm theo bảng tiêu chí chấm thuyết trình.
Giao diện lấy từ repo thuyết trình cũ của nhóm (`HCM202_Group5`): nền giấy ấm, chữ có chân, màn game nền tối.

Web chỉ gồm hai trò chơi của nhóm (phần lý thuyết đã làm bằng slide). Phần của nhóm: Chương 3, mục III "Quá độ chủ nghĩa xã hội ở Việt Nam" (giáo trình tr.109–124, slide giảng viên 37–51).

## Các trang

| Trang | Việc cần làm khi thuyết trình | Thời lượng gợi ý |
| --- | --- | --- |
| Mở đầu | **Picture Rush** (đổi hình bắt chữ): 9 câu đố vui, câu cuối "qua đò" → "quá độ" dẫn vào bài. Toàn màn hình 16:9. 10 câu, mỗi câu 30 giây; hết giờ đáp án tự hiện. 5 đội (năm nhóm còn lại của lớp) chỉ cần giơ tay: bạn chạm vào đội trả lời đúng (hoặc bấm phím 1 đến 5), mỗi câu đúng +1 điểm. Cuối game tự tính Top 1 (Vé Vàng) và Top 2 (Vé Bạc), đồng điểm thì chọn tay, rồi chuyển sang Derby đã điền sẵn. Phím: Space (hiện đáp án sớm, rồi câu tiếp), H (gợi ý) | khoảng 5 phút |
| Game | **Knowledge Derby** (đường đua kiến thức): 5 đội (năm nhóm còn lại của lớp), 9 câu hỏi nhanh chia 3 chặng (Phân loại Bỏ qua/Kế thừa, Xếp mốc thời gian, Điền từ), mỗi câu 20 đến 40 giây. Các đội giơ tay đọc đáp án, bạn hiện lời giải rồi chạm vào đội làm đúng (hoặc bấm phím 1 đến 5), ngựa chạy sau mỗi câu. Top 1 "Đuổi hình bắt chữ" chọn quyền lợi (Vé Vàng), Top 2 quay ngẫu nhiên bằng máy kéo cần (Vé Bạc). Phím: Space làm bước kế tiếp | khoảng 5 đến 7 phút |

Trang phụ `#/chiec-non` (game cũ "Chiếc nón quá độ", quay số đoán từ khóa) giữ lại để dự phòng.
Trang phụ `#/bo-qua-ke-thua` (không có trên menu) là trò thẻ "Bỏ qua hay kế thừa?", dùng khi cần thêm một hoạt động.

Trò chơi không dùng Kahoot hay game giống Kahoot, theo đúng tiêu chí chấm.

## Chạy trên máy

```bash
npm install
npm run dev          # xem khi đang sửa
npm run build        # tạo thư mục dist/ để đưa lên GitHub Pages hoặc Vercel
npm run build:single # tạo một file index.html duy nhất trong dist-single/
```

Trang dùng địa chỉ dạng `#/game` nên chạy được trên mọi nơi lưu trữ tĩnh, không cần cấu hình thêm.

## Sửa nội dung

Câu đố Picture Rush nằm trong `src/data/content.js`. Hình pixel-art của Picture Rush nằm trong `src/game/pixel.jsx`. Nội dung 9 câu của Knowledge Derby (thẻ, đáp án, quyền lợi, mốc đường đua) nằm trong `src/game/derby/derbyData.js`.
Câu đố của game nằm trong `src/game/questions.js`. Đáp án viết hoa, không dùng chữ F, J, W, Z.

## Nộp hai phiên bản

Giảng viên yêu cầu nộp hai link: bản đã thuyết trình và bản đã sửa theo nhận xét. Sau khi thuyết trình, giữ nguyên bản này
(đánh dấu bằng tag `ban-thuyet-trinh`), rồi tạo bản sao riêng để sửa và nộp. Không sửa trực tiếp trên bản đã thuyết trình.

## Nguồn nội dung

- Giáo trình Chủ nghĩa xã hội khoa học (bản 2021 của nhóm), Chương 3, mục III.
- Slide bài giảng TS. Ngô Khánh Duy, Chương 3, mục III.


# MLN131 · Nhóm 1 · Quá độ lên CNXH ở Việt Nam

Trang web thuyết trình môn Chủ nghĩa xã hội khoa học (Đại học FPT TP.HCM), làm theo bảng tiêu chí chấm thuyết trình.
Giao diện lấy từ repo thuyết trình cũ của nhóm (`HCM202_Group5`): nền giấy ấm, chữ có chân, màn game nền tối.

Phần của nhóm: Chương 3, mục III "Quá độ chủ nghĩa xã hội ở Việt Nam" (giáo trình tr.109–124, slide giảng viên 37–51).

## Các trang

| Trang | Việc cần làm khi thuyết trình | Thời lượng gợi ý |
| --- | --- | --- |
| Tổng quan | Giới thiệu bài, dẫn vào trò chơi mở đầu | |
| Mở đầu | Trò chơi "Bỏ qua hay kế thừa?" (6 thẻ, cả lớp giơ tay, bạn bấm theo số đông) | khoảng 5 phút |
| Lý thuyết | Hai phần chính và phần tóm lại. Mỗi phần có mục "Gợi ý nói" để bấm mở | tối đa 10 phút |
| Game | "Chiếc nón quá độ": quay số, đoán từ khóa theo đội (4 đội) | khoảng 5 phút |
| Hỏi đáp | Ba câu hỏi cuối Chương 3 và các câu dễ gặp | |

Trò chơi không dùng Kahoot hay game giống Kahoot, theo đúng tiêu chí chấm.

## Chạy trên máy

```bash
npm install
npm run dev          # xem khi đang sửa
npm run build        # tạo thư mục dist/ để đưa lên GitHub Pages hoặc Vercel
npm run build:single # tạo một file index.html duy nhất trong dist-single/
```

Trang dùng địa chỉ dạng `#/ly-thuyet` nên chạy được trên mọi nơi lưu trữ tĩnh, không cần cấu hình thêm.

## Sửa nội dung

Toàn bộ chữ nằm trong `src/data/content.js` (thẻ trò chơi mở đầu, lý thuyết, hỏi đáp, thành viên nhóm).
Câu đố của game nằm trong `src/game/questions.js`. Đáp án viết hoa, không dùng chữ F, J, W, Z.

Điền tên thành viên trong `MEMBERS` ở `src/data/content.js`, trang Tổng quan sẽ tự hiện mục "Nhóm thực hiện".

## Thêm ảnh thật (quan trọng)

Trang hiện có 2 ảnh thật (không phải ảnh AI) lấy từ Wikimedia Commons, đã ghi tác giả, giấy phép và link nguồn dưới ảnh:
`public/img/quoc-ky-lang-bac.jpg` (Rosino, CC BY-SA 2.0) và `public/img/sai-gon-ban-dem.jpg` (Radek Kucharski, CC BY 2.0).
Cả hai ảnh đã được thu nhỏ. Tiêu chí chấm yêu cầu: ảnh màu, có nguồn rõ ràng,
không dùng ảnh AI cho người thật, lá cờ đúng, bản đồ trọn vẹn lãnh thổ. Chưa có bản đồ nào, nếu thêm phải kiểm tra có Hoàng Sa, Trường Sa.

1. Chép ảnh vào thư mục `public/img/`.
2. Mở `src/data/content.js`, tìm `IMAGES` và thêm một khối theo mẫu có sẵn (file, alt, caption, credit, source, license).
3. Có hai chỗ đặt ảnh: `khoi-dau` (phần 01, cạnh câu kết luận) và `doi-moi` (phần 02, cạnh nhận thức qua các đại hội).

## Nộp hai phiên bản

Giảng viên yêu cầu nộp hai link: bản đã thuyết trình và bản đã sửa theo nhận xét. Sau khi thuyết trình, giữ nguyên bản này
(đánh dấu bằng tag `ban-thuyet-trinh`), rồi tạo bản sao riêng để sửa và nộp. Không sửa trực tiếp trên bản đã thuyết trình.

## Nguồn nội dung

- Giáo trình Chủ nghĩa xã hội khoa học (bản 2021 của nhóm), Chương 3, mục III.
- Slide bài giảng TS. Ngô Khánh Duy, Chương 3, mục III.

Các ví dụ trong phần "Ví dụ" và "Gợi ý nói" chỉ là gợi ý. Hãy kiểm chứng số liệu và thay bằng ví dụ nhóm đã chọn trước khi thuyết trình.

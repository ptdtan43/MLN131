# MLN131 · Nhóm 1 · Hai trò chơi cho bài "Quá độ lên CNXH ở Việt Nam"

Trang web chỉ còn hai trò chơi, làm theo bảng tiêu chí chấm thuyết trình môn Chủ nghĩa xã hội khoa học (Đại học FPT TP.HCM).
Phần lý thuyết nằm trong slide Canva của nhóm. Link Vercel của trang này được chèn vào slide để mọi người cùng chơi.

| Địa chỉ | Trò chơi | Cách dùng |
| --- | --- | --- |
| `/` (trang chủ) | **Picture Rush**, đổi hình bắt chữ mở đầu | 10 câu, mỗi câu 30 giây. Các đội viết đáp án lên bảng. Space để bắt đầu và hiện đáp án sớm, H để gợi ý. Câu cuối "qua đò" thành "quá độ" dẫn vào bài. Cuối cùng có nút "Sang game cuối" |
| `/#/game` | **Knowledge Derby**, đường đua kiến thức ôn tập cuối bài | 4 đội, 9 câu nhanh chia 3 chặng (Phân loại, Xếp mốc, Điền từ). Đội viết đáp án lên bảng, bạn hiện lời giải rồi chạm vào đội đúng (hoặc phím 1 đến 4), ngựa chạy sau mỗi câu. Top 1 của Picture Rush chọn quyền lợi, Top 2 quay ngẫu nhiên. Space làm bước kế tiếp |

Mở link gốc là vào Picture Rush ngay. Muốn vào thẳng game cuối thì thêm `#/game` vào sau link.
Cả hai trò đều dành cho màn hình ngang 16:9 (TV, máy chiếu, laptop). Trang tự co khung hình theo cửa sổ.

## Chạy trên máy

```bash
npm install
npm run dev          # xem khi đang sửa
npm run build        # tạo thư mục dist/
npm run build:single # tạo một file index.html duy nhất trong dist-single/
```

## Đưa lên Vercel

1. Vào vercel.com, chọn Add New, Project, rồi chọn repo `ptdtan43/MLN131` và nhánh `main`.
2. Vercel tự nhận Vite: lệnh build `npm run build`, thư mục đầu ra `dist`. Không cần cấu hình thêm.
3. Bấm Deploy. Link dạng `https://ten-du-an.vercel.app` mở thẳng vào Picture Rush.

Trang dùng địa chỉ dạng `#/game` nên không cần cấu hình chuyển hướng.

## Sửa nội dung

- Câu đố Picture Rush: `src/data/content.js`. Hình pixel-art nằm trong `src/game/pixel.jsx`.
- Nội dung 9 câu của Knowledge Derby (thẻ, đáp án, quyền lợi, mốc đường đua): `src/game/derby/derbyData.js`.

## Ảnh thật

Tiêu chí chấm yêu cầu ảnh màu thật, có nguồn rõ ràng. Hai game hiện dùng hình pixel-art tự vẽ. Muốn dùng ảnh thật cho Picture Rush,
chép ảnh vào `public/img/` rồi thêm `images: ['img/anh-1.jpg', 'img/anh-2.jpg']` vào câu đố trong `src/data/content.js`.

## Bản đầy đủ cũ

Bản có trang Tổng quan, Lý thuyết, Hỏi đáp và game "Chiếc nón quá độ" vẫn nằm trong lịch sử git, commit `c008c9f` (xem bằng `git checkout c008c9f`).

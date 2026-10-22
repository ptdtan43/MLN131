import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        : thư mục dist/ để đưa lên GitHub Pages hoặc Vercel
// `npm run build:single` : một file index.html duy nhất (mode artifact), dùng cho trang xem nhanh
// `npm run dev` tự mở trang bằng Microsoft Edge (vite dùng biến BROWSER để chọn trình duyệt)
process.env.BROWSER ??= 'msedge'

export default defineConfig(({ mode }) => ({
  base: './',
  server: { open: true },
  plugins: [react(), tailwindcss(), ...(mode === 'artifact' ? [viteSingleFile()] : [])],
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        : thư mục dist/ để đưa lên GitHub Pages hoặc Vercel
// `npm run build:single` : một file index.html duy nhất (mode artifact), dùng cho trang xem nhanh
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss(), ...(mode === 'artifact' ? [viteSingleFile()] : [])],
}))

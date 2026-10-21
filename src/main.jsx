import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Bản một-file (mode artifact) chạy trong khung xem nên không dùng địa chỉ trang để chuyển màn hình.
const Router = import.meta.env.MODE === 'artifact' ? MemoryRouter : HashRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)

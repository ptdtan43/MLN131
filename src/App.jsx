import { Navigate, Route, Routes } from 'react-router-dom'
import DerbyPage from './pages/DerbyPage'
import OpeningPage from './pages/OpeningPage'

/* Hai màn hình: "/" là game mở đầu Picture Rush, "/game" là game ôn tập cuối Knowledge Derby. */
function App() {
  return (
    <Routes>
      <Route path="/" element={<OpeningPage />} />
      <Route path="/game" element={<DerbyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

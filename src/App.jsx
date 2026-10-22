import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import CardsPage from './pages/CardsPage'
import DerbyPage from './pages/DerbyPage'
import GamePage from './pages/GamePage'
import OpeningPage from './pages/OpeningPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/mo-dau" replace />} />
        <Route path="mo-dau" element={<OpeningPage />} />
        <Route path="game" element={<DerbyPage />} />
        <Route path="bo-qua-ke-thua" element={<CardsPage />} />
        <Route path="chiec-non" element={<GamePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/mo-dau" replace />} />
    </Routes>
  )
}

export default App

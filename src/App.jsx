import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import CardsPage from './pages/CardsPage'
import GamePage from './pages/GamePage'
import OpeningPage from './pages/OpeningPage'
import OverviewPage from './pages/OverviewPage'
import QAPage from './pages/QAPage'
import TheoryPage from './pages/TheoryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="mo-dau" element={<OpeningPage />} />
        <Route path="bo-qua-ke-thua" element={<CardsPage />} />
        <Route path="ly-thuyet" element={<TheoryPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="hoi-dap" element={<QAPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

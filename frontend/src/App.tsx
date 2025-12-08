import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Header from './components/header/header'
import DiaryPage from './pages/diary/diaryPage'
import LoginPage from './pages/auth/loginPage'
import RegisterPage from './pages/auth/registerPage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DiaryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App

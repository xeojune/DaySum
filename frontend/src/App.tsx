import Header from './components/header/header'
import DiaryPage from './pages/diary/diaryPage'
import { Footer } from './components/footer/footer'

function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden pt-[57px] pb-[65px]">
        <DiaryPage />
      </main>
      <Footer />
    </div>
  )
}

export default App

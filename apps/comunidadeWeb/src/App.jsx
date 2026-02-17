import './index.css'
import Home from './screens/Home'
import Home from './screens/Login'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="min-h-screen bg-branco dark:bg-preto">
      <div id="app-content">
        <main className='pt-10 md:pt-[95px]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
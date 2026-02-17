import './index.css'
import Home from './screens/Home'
import Login from './screens/Login'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="min-h-screen w-full bg-branco dark:bg-preto">
      <div id="app-content">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
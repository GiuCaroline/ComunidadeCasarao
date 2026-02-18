import { Nav } from "./components/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Inicio from "./screens/Inicio";
import Usuarios from "./screens/Usuarios";

export default function App() {
  const location = useLocation();

  const hideNavRoutes = ["/login", "/" ];

  return (
    <>
      {!hideNavRoutes.includes(location.pathname) && <Nav />}

      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
    </>
  );
}

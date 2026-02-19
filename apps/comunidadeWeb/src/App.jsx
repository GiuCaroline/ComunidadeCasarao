import { Nav } from "./components/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Inicio from "./screens/Inicio";
import Usuarios from "./screens/Usuarios";
import EditUsers from "./screens/EditUsers";
import Eventos from "./screens/Eventos";

export default function App() {
  const location = useLocation();

  const hideNavRoutes = ["/login", "/" ];

  return (
    <>
      {!hideNavRoutes.includes(location.pathname) && <Nav />}

      <div className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/editar" element={<EditUsers />} />
          <Route path="/eventos" element={<Eventos />} />
        </Routes>
      </div>
    </>
  );
}

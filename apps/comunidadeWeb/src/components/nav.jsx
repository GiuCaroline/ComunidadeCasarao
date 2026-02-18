import { useState } from "react";
import { List, X, ArrowLeft } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/home";

  const routeNames = {
    "/usuarios": "Usuários",
    "/eventos": "Eventos",
    "/fotos": "Fotos",
    "/escalas": "Escalas",
    "/cursos": "Cursos",
    "/perfil": "Perfil",
  };

  const currentTitle = routeNames[location.pathname];

  return (
    <>
      <nav className="w-full bg-transparent fixed top-0 left-0 z-50">
        <div className="px-4 h-16 flex items-center justify-between">

          {/* ===== MOBILE HEADER ===== */}
          <div className="flex items-center gap-3 md:hidden">

            {isHome ? (
              <img
                src="/images/logoBranco.png"
                className="h-8 object-contain"
                alt="Logo"
              />
            ) : (
              <>
                <button onClick={() => navigate(-1)}>
                  <ArrowLeft size={22} className="text-preto dark:text-branco"/>
                </button>

                <span className="text-lg font-normal text-preto dark:text-branco">
                  {currentTitle}
                </span>
              </>
            )}
          </div>

          {/* ===== DESKTOP MENU ===== */}
          <div className="hidden md:flex gap-8">
            <Link to="/home">Home</Link>
            <Link to="/usuarios">Usuários</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/fotos">Fotos</Link>
            <Link to="/escalas">Escalas</Link>
            <Link to="/cursos">Cursos</Link>
            <Link to="/perfil">Perfil</Link>
          </div>

          {/* ===== HAMBURGER (sempre no mobile) ===== */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <List size={26} />
          </button>


        </div>
      </nav>

      {/* ===== OVERLAY ===== */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-[55] md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ===== DRAWER ===== */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[70%] bg-branco shadow-lg z-[60]
          transform transition-transform duration-300
          md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button onClick={() => setOpen(false)} className="p-5">
          <X size={26} />
        </button>
        <div className="flex flex-col gap-10 px-6 text-lg font-normal items-center mt-[50%]">
          <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/usuarios" onClick={() => setOpen(false)}>Usuários</Link>
          <Link to="/eventos" onClick={() => setOpen(false)}>Eventos</Link>
          <Link to="/fotos" onClick={() => setOpen(false)}>Fotos</Link>
          <Link to="/escalas" onClick={() => setOpen(false)}>Escalas</Link>
          <Link to="/cursos" onClick={() => setOpen(false)}>Cursos</Link>
          <Link to="/perfil" onClick={() => setOpen(false)}>Perfil</Link>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { MagnifyingGlass, Trash, PencilSimple } from "@phosphor-icons/react";

export default function Usuarios() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]); // dados vindos da API
  const [filteredUsers, setFilteredUsers] = useState([]);

  // 🔥 Simulação de dados (depois vira API)
  useEffect(() => {
    const fakeUsers = [
      { id: 1, nome: "Fulano de tal", email: "teste@teste.com" },
      { id: 2, nome: "Maria Silva", email: "maria@email.com" },
      { id: 3, nome: "João Pedro", email: "joao@email.com" },
      { id: 4, nome: "João Pedro Ferreira", email: "joaoF@email.com" },
    ];

    setUsers(fakeUsers);
  }, []);

  // 🔍 Filtro inteligente
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const result = users.filter(
      (user) =>
        user.nome.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  function handleDelete(id) {
    // depois vira DELETE na API
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    setFilteredUsers(updated);
  }

  function handleEdit(id) {
    console.log("Editar usuário:", id);
    // depois navega para tela de edição
  }

  return (
    <div className="pt-5 px-4 flex flex-col items-center gap-6">

      {/* 🔎 Campo de pesquisa */}
      <div className="relative w-[95%]">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full py-3 px-4 pr-12
            rounded-full
            bg-input
            dark:bg-input-dark
            shadow-md
            outline-none
          "
        />

        <MagnifyingGlass
          size={22}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-preto dark:text-branco"
        />
      </div>

      {/* 📋 Lista */}
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="
            w-[95%]
            bg-input
            dark:bg-input-dark
            rounded-2xl
            shadow-md
            p-4
            flex justify-between items-center
          "
        >
          <div>
            <p className="font-normal text-preto dark:text-branco">{user.nome}</p>
            <p className="text-sm font-light text-preto dark:text-branco">{user.email}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => handleDelete(user.id)}>
              <Trash size={20} className="text-red-500" />
            </button>

            <button onClick={() => handleEdit(user.id)}>
              <PencilSimple size={20} className="text-green-500" />
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}

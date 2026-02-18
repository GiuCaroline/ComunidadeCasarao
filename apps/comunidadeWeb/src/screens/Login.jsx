import { useState } from "react";
import { Input } from "../components/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log(email, senha);
  }

  return (
    <div className="flex flex-col items-center">
        <img 
          src="/images/logoPreto.png"
          className="w-auto h-[10vh] md:h-[80vh] object-cover selection:bg-branco mt-[20%]"
        />
         <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px] flex flex-col items-center"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <Input
          texto="Email"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <Input
          texto="Senha"
          value={senha}
          onChange={setSenha}
          seguranca={true}
        />

        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

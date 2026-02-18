import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/input";
import { MascFem } from "../components/genero";
import { Dropdown } from "../components/dropdown";



export default function EditUsers() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  // Caso alguém entre direto na rota
  if (!user) {
    navigate("/usuarios");
  }

  const cargos = [
    { value: "1", label: "Cooperador" },
    { value: "2", label: "Discipulador" },
    { value: "3", label: "Equipe de Intercessão" },
    { value: "4", label: "Funcionário" },
    { value: "5", label: "Líder de Departamento" },
    { value: "6", label: "Líder de GR" },
    { value: "7", label: "Líder de Ministério" },
    { value: "8", label: "Membro" },
    { value: "9", label: "Pastor" },
    { value: "10", label: "STAFF ILUMINAÇÃO" },
    { value: "11", label: "STAFF MÍDIA" },
    { value: "12", label: "STAFF PROJEÇÃO" },
    { value: "13", label: "STAFF SOM" },
    { value: "14", label: "STAFF VÍDEO" },
    { value: "15", label: "Visitante" },
  ];



  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [sexo, setSexo] = useState(user?.sexo || "M");
  const [telefone, setTelefone] = useState("(11) 940205682");
  const [endereco, setEndereco] = useState("Rua dos Bobos");
  const [numero, setNumero] = useState("000");
  const [bairro, setBairro] = useState("Vila Velha");
  const [cidade, setCidade] = useState("Nenhum, essa sua cabeça oca!!!");
  const [cargo, setCargo] = useState("5");
  const [nascimento, setNascimento] = useState("10/10/2010");
  const [senha, setSenha] = useState("123456");

  function handleSave() {
    // Futuramente aqui entra PUT no backend
    console.log("Usuário atualizado:", {
      nome,
      email,
      telefone,
      endereco,
      numero,
      bairro,
      cidade,
      cargo,
      nascimento,
      senha,
    });

    navigate("/usuarios");
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-10 px-5">

      <Input texto="Nome" value={nome} onChange={setNome} />
      <Input texto="Data de nascimento" value={nascimento} onChange={setNascimento} />
      <MascFem value={sexo} onChange={setSexo} />
      <Input texto="Email" value={email} onChange={setEmail} type="email" />
      <Input texto="Telefone" value={telefone} onChange={setTelefone} />
      <Input texto="Endereço" value={endereco} onChange={setEndereco} />
      <Input texto="Número" value={numero} onChange={setNumero} />
      <Input texto="Bairro" value={bairro} onChange={setBairro} />
      <Input texto="Cidade" value={cidade} onChange={setCidade} />
        <Dropdown
            data={cargos}
            value={cargo}
            placeholder="Cargo"
            onChange={(item) => setCargo(item.value)}
        />
      <Input texto="Senha" value={senha} onChange={setSenha} seguranca />

      <div className="flex justify-between w-[95%] mt-6">
        <button
          onClick={() => navigate("/usuarios")}
          className="bg-vermelho text-white px-6 py-2 rounded-full"
        >
          Voltar
        </button>

        <button
          onClick={handleSave}
          className="bg-vermelho text-white px-6 py-2 rounded-full"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

import { createContext, useContext, useState } from "react";

const CadastroContext = createContext({});

export function CadastroProvider({ children }) {
  const [cadastro, setCadastro] = useState({
    nome: "",
    nascimento: null,
    sexo: null,
    estadoCivil: null,
    conjuge: "",
    escolaridade: null,
    situacao: null,
    mae: "",
    pai: "",
    telefone: "",
    cep: "",
    uf: "",
    endereco: "",
    bairro: "",
    complemento: "",
    cargo: "",
    membro: "",
    batismo: null,
    email: "",
    senha: "",
  });

  function updateCadastro(dados) {
    setCadastro(prev => ({ ...prev, ...dados }));
  }

  return (
    <CadastroContext.Provider value={{ cadastro, updateCadastro }}>
      {children}
    </CadastroContext.Provider>
  );
}

export function useCadastro() {
  return useContext(CadastroContext);
}

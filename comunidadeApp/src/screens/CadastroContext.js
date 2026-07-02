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
    cidade: "",
    complemento: "",
    cargo: "",
    cargo2: "",
    cargo3: "",
    cargo4: "",
    membro: null,
    batismo: null,
    email: "",
    senha: "",
  });

  function updateCadastro(dados) {
    setCadastro(prev => ({ ...prev, ...dados }));
  }

  
  function resetCadastro() {
    setCadastro({
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
      cidade: "",
      complemento: "",
      cargo: "",
      cargo2: "",
      cargo3: "",
      cargo4: "",
      membro: null,
      batismo: null,
      email: "",
      senha: "",
    });
  }

  return (
    <CadastroContext.Provider value={{ cadastro, updateCadastro, resetCadastro  }}>
      {children}
    </CadastroContext.Provider>
  );
}

export function useCadastro() {
  return useContext(CadastroContext);
}



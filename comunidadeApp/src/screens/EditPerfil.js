import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Nav } from "../components/nav";
import { AlertCustom } from "../components/alert";
import { Input } from "../components/input";
import { Dropdown } from "../components/dropdown";
import { Eye, EyeSlash } from "phosphor-react-native";

export function EditPerfil() {
  const navigation = useNavigation();

  const usuario = {
    id: "1",
    nome: "Fulano de tal",
    cargo: "Membro",
    estadoCivil: "Solteiro(a)",
    celular: "(11) 94002-8922",
    grauInstrucao: "Ensino Superior",
    conjuge: "Teste de nome grande para ver",
    email: "teste@teste.com",
    endereco: "Rua dos bobos",
    bairro: "Vila Vitória",
    cidade: "Mauá",
    cep: "09111-231",
    uf: "SP",
    complemento: "Nenhum",
    senha: "40028922",
    situacao: "Ativo",
  };

  const [form, setForm] = useState(usuario);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

  // 🔹 Opções
  const estadoCivilOptions = [
    { value: "1", label: "Casado(a)" },
    { value: "2", label: "Desquitado(a)" },
    { value: "3", label: "Divorciado(a)" },
    { value: "4", label: "Não Informar" },
    { value: "5", label: "Separado(a)" },
    { value: "6", label: "Solteiro(a)" },
    { value: "7", label: "União Estável" },
    { value: "8", label: "Viúvo(a)" },
  ];

    const grauInstrucaoOptions = [
        { value: "1", label: "Alfabetizado" },
        { value: "2", label: "Bacharelado" },
        { value: "3", label: "Doutorado" },
        { value: "4", label: "Especialização/Pós Graduação" },
        { value: "5", label: "Fundamental (1°Grau) Completo" },
        { value: "6", label: "Fundamental (1°Grau) Incompleto" },
        { value: "7", label: "Médio (2°Grau) Completo" },
        { value: "8", label: "Médio (2°Grau) Incompleto" },
        { value: "9", label: "Mestrado" },
        { value: "10", label: "Não Sabe Ler/Escrever" },
        { value: "11", label: "Superior Completo" },
        { value: "12", label: "Superior Incompleto" },
    ];

  const situacaoOptions = [
    { value: "Ativo", label: "Ativo" },
    { value: "Em Transferência", label: "Em Transferência" },
    { value: "Inativo", label: "Inativo" },
  ];

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function buscarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();
      if (data.erro) return;

      setForm((prev) => ({
        ...prev,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      }));
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  }

    async function handleSave() {
        try {
            // 🔹 Aqui futuramente vai sua chamada de API
            console.log("Dados enviados:", form);

            // Simulando sucesso
            setAlertType("success");
            setAlertTitle("Sucesso!");
            setAlertMessage("Perfil atualizado com sucesso.");
            setAlertVisible(true);

        } catch (error) {
            setAlertType("error");
            setAlertTitle("Erro!");
            setAlertMessage("Não foi possível atualizar o perfil.");
            setAlertVisible(true);
        }
    }


  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      
      {/* Header */}
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-18%] mt-[-12%]'>
        <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>
          Editar Perfil
        </Text>
        <Image
          source={require('../../assets/images/logoPreto.png')}
          className="w-[25%]"
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          contentContainerStyle={{ padding: 10, paddingBottom: 85 }}
          scrollEnabled={scrollEnabled}
        >
          <View className='items-center'>

            <Input
              texto="Nome"
              value={form.nome}
              onChangeText={(text) => handleChange("nome", text)}
            />

            <Dropdown
                placeholder="Estado Civil"
                data={estadoCivilOptions}
                value={form.estadoCivil}  
                onChange={(item) => handleChange("estadoCivil", item.label)}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Input
              texto="Cônjuge"
              value={form.conjuge}
              onChangeText={(text) => handleChange("conjuge", text)}
            />
            
            
            <Dropdown
              placeholder="Grau de Instrução"
              data={grauInstrucaoOptions}
              value={form.grauInstrucao}  
              onChange={(item) => handleChange("grauInstrucao", item.label)}
              onOpen={() => setScrollEnabled(false)}
              onClose={() => setScrollEnabled(true)}
            />

            <Dropdown
                placeholder="Situação"
                data={situacaoOptions}
                value={form.situacao}  
                onChange={(item) => handleChange("situacao", item.value)}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Input
              texto="Celular"
              value={form.celular}
              onChangeText={(text) =>
                handleChange("celular", maskPhone(text))
              }
              keyboardType="phone-pad"
            />

            {/* Endereço */}
            <View className='gap-2 items-center flex-row justify-between'>
              <Text className='text-vermelho text-popRegular text-[18px]'>
                Endereço
              </Text>
              <View className='w-[70%] h-[1px] bg-vermelho'></View>
            </View>

            <View className='w-full flex-row justify-between px-[10px] mt-[7%]'>
              <Input
                texto="CEP"
                value={form.cep}
                containerStyle={{ width: "45%" }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const cepFormatado = maskCep(text);
                  handleChange("cep", cepFormatado);

                  if (cepFormatado.length === 9) {
                    buscarCep(cepFormatado);
                  }
                }}
              />

              <Input
                texto="UF"
                value={form.uf}
                containerStyle={{ width: "45%" }}
                onChangeText={(text) => handleChange("uf", text)}
              />
            </View>

            <Input
              texto="Endereço"
              value={form.endereco}
              onChangeText={(text) => handleChange("endereco", text)}
            />

            <Input
              texto="Bairro"
              value={form.bairro}
              onChangeText={(text) => handleChange("bairro", text)}
            />

            <Input
              texto="Cidade"
              value={form.cidade}
              onChangeText={(text) => handleChange("cidade", text)}
            />

            <Input
              texto="Número e Complemento"
              value={form.complemento}
              onChangeText={(text) => handleChange("complemento", text)}
            />

            {/* Conta */}
            <Input
              texto="Email"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />

            <View className="w-full items-center justify-center ">
              <Input
                texto="Senha"
                seguranca={!mostrarSenha}
                value={form.senha}
                onChangeText={(text) => handleChange("senha", text)}
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eye}
              >
                {mostrarSenha ? (
                  <Eye size={24} weight="light" className='text-placeInput dark:text-placeInput-dark' />
                ) : (
                  <EyeSlash size={24} weight="light" className='text-placeInput dark:text-placeInput-dark' />
                )}
              </TouchableOpacity>
            </View>

          </View>

            <View className='flex-row justify-between px-[3%] mb-[5%]'>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Perfil")}
                >
                    <View className='bg-vermelho px-10 py-2 rounded-full'> 
                        <Text className='text-branco font-popRegular text-[15px]'>Voltar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={handleSave}
                >
                    <View className='bg-vermelho px-10 py-2 rounded-full'> 
                        <Text className='text-branco font-popRegular text-[15px]'>Salvar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            

        </ScrollView>
      </KeyboardAvoidingView>

        <AlertCustom
            visible={alertVisible}
            type={alertType}
            title={alertTitle}
            message={alertMessage}
            onClose={() => {
                setAlertVisible(false);

                if (alertType === "success") {
                navigation.navigate("Perfil");
                }
            }}
        />

      <Nav
        active="Perfil"
        onChange={(r) => navigation.navigate(r)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eye: {
    position: "absolute",
    right: 25,
    top: "-18%",
  },
});

function maskPhone(value) {
  let v = value.replace(/\D/g, "");
  if (v.length > 0) v = "(" + v;
  if (v.length > 3) v = v.slice(0, 3) + ") " + v.slice(3);
  if (v.length > 10) v = v.slice(0, 10) + "-" + v.slice(10, 14);
  return v;
}

function maskCep(value) {
  let v = value.replace(/\D/g, "");
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
  return v;
}

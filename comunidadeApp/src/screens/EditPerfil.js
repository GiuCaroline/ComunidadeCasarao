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
import { Eye, EyeSlash, PlusCircleIcon, MinusCircleIcon } from "phosphor-react-native";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../services/authService";
import { useEffect, useState } from "react";

export function EditPerfil() {
  const navigation = useNavigation();

  const { user, atualizarUsuario } = useAuth();
  const [cargos, setCargos] = useState([]);

  const [usuario, setUsuario] = useState(null);

  
  const [form, setForm] = useState({
    nome: "",
    estadoCivil: null,
    conjuge: "",
    grauInstrucao: "",
    situacao: "",
    celular: "",
    cep: "",
    uf: "",
    endereco: "",
    bairro: "",
    cidade: "",
    complemento: "",
    email: "",
    senha: "",
  });
  const isCasadoOuUniao =
  form.estadoCivil === 1 || form.estadoCivil === 7;
  
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const estadoCivilOptions = [
    { value: 1, label: "Casado(a)" },
    { value: 2, label: "Desquitado(a)" },
    { value: 3, label: "Divorciado(a)" },
    { value: 4, label: "Não Informar" },
    { value: 5, label: "Separado(a)" },
    { value: 6, label: "Solteiro(a)" },
    { value: 7, label: "União Estável" },
    { value: 8, label: "Viúvo(a)" },
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

  function handleEstadoCivilChange(value) {
    const agoraCasadoOuUniao =
      value === 1 || value === 7;

    setForm((prev) => ({
      ...prev,
      estadoCivil: value,
      conjuge: !agoraCasadoOuUniao ? "" : prev.conjuge,
    }));
  }

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const data = await getUserById(user.id);

        setUsuario(data);

        setForm({
          nome: data.nome || "",
          estadoCivil: data.estadocivil ?? null,
          conjuge: data.conjuge || "",
          grauInstrucao: data.grauinst || "",
          situacao: data.situacao || "",
          celular: data.celular || "",
          cep: data.cep || "",
          uf: data.uf || "",
          endereco: data.endereco || "",
          bairro: data.bairro || "",
          cidade: data.cidade || "",
          complemento: data.complemento || "",
          email: data.email || "",
          senha: "", 
        });

        const listaCargos = [
          data.cargo,
          data.cargo2,
          data.cargo3,
          data.cargo4
        ].filter(c => c);

        setCargos(listaCargos.length ? listaCargos : [null]);

      } catch (error) {
        console.log(error);
      }
    }

    if (user?.id) {
      carregarUsuario();
    }
  }, [user]);

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

  function adicionarCargo() {
    if (cargos.length < 4) {
      setCargos([...cargos, null]);
    }
  }

  function removerCargo(index) {
    const novos = cargos.filter((_, i) => i !== index);
    setCargos(novos.length ? novos : [null]);
  }

  function atualizarCargo(index, valor) {
    const novos = [...cargos];
    novos[index] = valor;
    setCargos(novos);
  }

  async function handleSave() {
    try {
      const payload = {
        id: user.id,

        nome: form.nome,
        estadoCivil: form.estadoCivil,
        conjuge: form.conjuge,
        escolaridade: form.grauInstrucao,
        situacao: form.situacao,
        telefone: form.celular,
        cep: form.cep,
        uf: form.uf,
        endereco: form.endereco,
        bairro: form.bairro,
        complemento: form.complemento,
        cidade: form.cidade,
        email: form.email,
        senha: form.senha,
        cargo: cargos[0] || null,
        cargo2: cargos[1] || null,
        cargo3: cargos[2] || null,
        cargo4: cargos[3] || null,
      };

      if (!payload.senha) {
        delete payload.senha;
      }

      console.log("ENVIANDO:", payload);

      await atualizarUsuario(payload);

      setAlertType("success");
      setAlertTitle("Sucesso!");
      setAlertMessage("Perfil atualizado com sucesso!");
      setAlertVisible(true);

    } catch (error) {
      console.log(error);

      setAlertType("error");
      setAlertTitle("Erro!");
      setAlertMessage("Não foi possível atualizar o perfil.");
      setAlertVisible(true);
    }
  }


  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      
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
              value={form?.nome || ""}
              onChangeText={(text) => handleChange("nome", text)}
            />

            <Dropdown
                placeholder="Estado Civil"
                data={estadoCivilOptions}
                value={form?.estadoCivil || ""}
                onChange={(item) => handleEstadoCivilChange(item.value)}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            {isCasadoOuUniao && (
              <Input
                texto="Cônjuge"
                value={form?.conjuge || ""}
                onChangeText={(text) => handleChange("conjuge", text)}
              />
            )}
            
            
            <Dropdown
              placeholder="Grau de Instrução"
              data={grauInstrucaoOptions}
              value={form?.grauInstrucao || ""}  
              onChange={(item) => handleChange("grauInstrucao", item.value)}
              onOpen={() => setScrollEnabled(false)}
              onClose={() => setScrollEnabled(true)}
            />

            <Dropdown
                placeholder="Situação"
                data={situacaoOptions}
                value={form?.situacao  || ""}  
                onChange={(item) => handleChange("situacao", item.label)}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Input
              texto="Celular"
              value={form?.celular || ""}
              onChangeText={(text) =>
                handleChange("celular", maskPhone(text))
              }
              keyboardType="phone-pad"
            />

            <View className="w-full pl-[2%]">

              {cargos.map((cargo, index) => (
                <View key={index} className="flex-row mb-2">

                  <View className="flex-1">
                    <Dropdown
                      placeholder={`Cargo ${index + 1}`}
                      data={[
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
                      ]}
                      value={cargo}
                      onChange={(item) => atualizarCargo(index, item.value)}
                      onOpen={() => setScrollEnabled(false)}
                      onClose={() => setScrollEnabled(true)}
                    />
                  </View>
                  
                  {cargos.length > 1 && (
                    <TouchableOpacity onPress={() => removerCargo(index)}>
                      <MinusCircleIcon size={32} weight="fill" className='text-vermelho mt-2' />
                    </TouchableOpacity>
                  )}

                  {index === cargos.length - 1 && cargos.length < 4 && (
                    <TouchableOpacity onPress={adicionarCargo}>
                      <PlusCircleIcon size={32} weight="fill" className='text-vermelho mt-2'/>
                    </TouchableOpacity>
                  )}

                </View>
              ))}
            </View>

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
                value={form?.cep || ""}
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
                value={form?.uf || ""}
                containerStyle={{ width: "45%" }}
                onChangeText={(text) => handleChange("uf", text)}
              />
            </View>

            <Input
              texto="Endereço"
              value={form?.endereco || ""}
              onChangeText={(text) => handleChange("endereco", text)}
            />

            <Input
              texto="Bairro"
              value={form?.bairro || ""}
              onChangeText={(text) => handleChange("bairro", text)}
            />

            <Input
              texto="Cidade"
              value={form?.cidade || ""}
              onChangeText={(text) => handleChange("cidade", text)}
            />

            <Input
              texto="Número e Complemento"
              value={form?.complemento || ""}
              onChangeText={(text) => handleChange("complemento", text)}
            />

            {/* Conta */}
            <Input
              texto="Email"
              value={form?.email || ""}
              onChangeText={(text) => handleChange("email", text)}
            />

            <View className="w-full items-center justify-center ">
              <Input
                texto="Nova senha"
                seguranca={!mostrarSenha}
                value={form?.senha || ""}
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

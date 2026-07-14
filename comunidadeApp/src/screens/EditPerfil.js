import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  Animated
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Nav } from "../components/nav";
import { AlertCustom } from "../components/alert";
import { Input } from "../components/input";
import { Dropdown } from "../components/dropdown";
import { Eye, EyeSlash, PlusCircleIcon, MinusCircleIcon } from "phosphor-react-native";
import { useAuth } from "../context/AuthContext";
import { getUserById, getEstados, getGraus, getCargos } from "../services/authService";
import { useEffect, useState } from "react";
import { DateField } from '../components/dateField';

export function EditPerfil() {
  const navigation = useNavigation();

  const { user, atualizarUsuario } = useAuth();
  const [cargos, setCargos] = useState([]);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [graus, setGraus] = useState([]);

  const [usuario, setUsuario] = useState(null);

  const [calMembroVisible, setCalMembroVisible] = useState(false);
  const [calBatismoVisible, setCalBatismoVisible] = useState(false);
  const [membroDay, setMembroDay] = useState(null);
  const [batismoDay, setBatismoDay] = useState(null);

  
  useEffect(() => {
    async function carregarEstados() {
      try {
        const data = await getEstados();
        let arrayDeEstados = [];

        if (Array.isArray(data)) {
          arrayDeEstados = data;
        } else if (data && Array.isArray(data.estados)) {
          arrayDeEstados = data.estados;
        } else if (data && Array.isArray(data.data)) {
          arrayDeEstados = data.data;
        } else if (data && typeof data === 'object') {
          const extrairArray = Object.values(data).find(Array.isArray);
          arrayDeEstados = extrairArray || [];
        }

        const estadosFormatados = arrayDeEstados.map((item) => ({
          value: String(item.id),
          label: item.estado || "Sem Nome"
        }));

        setEstados(estadosFormatados);
      } catch (error) {
        console.log(error);
        setEstados([]);
      }
    }
    carregarEstados();
  }, []);

  useEffect(() => {
      async function carregarGraus() {
      try {
          const data = await getGraus();
          let arrayDeGraus = [];

          if (Array.isArray(data)) {
            arrayDeGraus = data;
          } else if (data && Array.isArray(data.graus)) {
            arrayDeGraus = data.graus;
          } else if (data && Array.isArray(data.data)) {
            arrayDeGraus = data.data;
          } else if (data && typeof data === 'object') {
            const extrairArray = Object.values(data).find(Array.isArray);
            arrayDeGraus = extrairArray || [];
          }

          const grausFormatados = arrayDeGraus.map((item) => ({
            value: String(item.id),
            label: item.instrucao || "Sem Nome"
          }));

          setGraus(grausFormatados);
      } catch (error) {
        console.log(error);
        setGraus([]);
      }
    }
    carregarGraus();
  }, []);
  
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
  
  const [mostrarConjuge, setMostrarConjuge] = useState(false);
  const animConjuge = useState(new Animated.Value(0))[0];
  
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
          mae: data.mae || "",
          pai: data.pai || "",
          cep: data.cep || "",
          uf: data.uf || "",
          endereco: data.endereco || "",
          bairro: data.bairro || "",
          cidade: data.cidade || "",
          complemento: data.complemento || "",
          membrodesde: data.membrodesde || "",
          dtabatismo: data.dtabatismo || "",
          email: data.email || "",
          senha: "", 
        });

        const estadoInicial = data.estadocivil;
        const deveMostrarInicial = estadoInicial === 1 || estadoInicial === 7;
        setMostrarConjuge(deveMostrarInicial);
        animConjuge.setValue(deveMostrarInicial ? 1 : 0);
        
        setMembroDay(data.membrodesde ? { dateString: data.membrodesde } : null);
        setBatismoDay(data.dtabatismo ? { dateString: data.dtabatismo } : null);

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

  useEffect(() => {
    async function carregarCargosLista() {
      try {
        const data = await getCargos();
        let arrayDeCargos = [];

        if (Array.isArray(data)) {
          arrayDeCargos = data;
        } else if (data && Array.isArray(data.cargos)) {
          arrayDeCargos = data.cargos;
        } else if (data && Array.isArray(data.data)) {
          arrayDeCargos = data.data;
        } else if (data && typeof data === 'object') {
          const extrairArray = Object.values(data).find(Array.isArray);
          arrayDeCargos = extrairArray || [];
        }

        const isPrivilegiado = [usuario.cargo, usuario.cargo2, usuario.cargo3, usuario.cargo4].some(
          (c) => String(c) === "9" || String(c) === "16"
        );

        const cargosFormatados = arrayDeCargos
          .filter((item) => {
            if (isPrivilegiado) return true;
            return String(item.id) !== "9" && String(item.id) !== "16";
          })
          .map((item) => ({
            value: String(item.id),
            label: item.cargo || "Sem Nome"
          }));

        setOpcoesCargos(cargosFormatados);
      } catch (error) {
        console.log(error);
        setOpcoesCargos([]);
      }
    }

    if (usuario) {
      carregarCargosLista();
    }
  }, [usuario]);

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

  useEffect(() => {
    if (membroDay?.dateString) {
      handleChange("membrodesde", membroDay.dateString);
    }
  }, [membroDay]);

  useEffect(() => {
    if (batismoDay?.dateString) {
      handleChange("dtabatismo", batismoDay.dateString);
    }
  }, [batismoDay]);

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
        mae: form.mae,
        pai: form.pai,
        cep: form.cep,
        uf: form.uf,
        endereco: form.endereco,
        bairro: form.bairro,
        complemento: form.complemento,
        cidade: form.cidade,
        membrodesde: form.membrodesde,
        dtabatismo: form.dtabatismo,
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

            <View className='w-full ml-[5%]'>
              <Dropdown
                  placeholder="Estado Civil"
                  data={estados}
                  value={form?.estadoCivil || ""}
                  onChange={(item) => {
                      const value = item.value;
                      const deveMostrar = value === 1 || value === 7;

                      setForm((prev) => ({
                          ...prev,
                          estadoCivil: value,
                          conjuge: !deveMostrar ? "" : prev.conjuge,
                      }));

                      setMostrarConjuge(deveMostrar);

                      Animated.timing(animConjuge, {
                          toValue: deveMostrar ? 1 : 0,
                          duration: 400,
                          useNativeDriver: false,
                      }).start();
                  }}
                  onOpen={() => setScrollEnabled(false)}
                  onClose={() => setScrollEnabled(true)}
              />

              <Animated.View
                  style={{
                      width: '100%',
                      overflow: 'hidden',
                      height: animConjuge.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 100],
                      }),
                      opacity: animConjuge,
                      transform: [
                          {
                              translateY: animConjuge.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [-20, 0],
                              }),
                          },
                      ],
                  }}
              >
                  <View className='w-full pt-[15px]'>
                      <Input
                          texto="Cônjuge"
                          value={form?.conjuge || ""}
                          onChangeText={(text) => handleChange("conjuge", text)}
                      />
                  </View>
              </Animated.View>
              
              <Dropdown
                placeholder="Grau de Instrução"
                data={graus}
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
            </View>

            <Input
              texto="Celular"
              value={form?.celular || ""}
              onChangeText={(text) =>
                handleChange("celular", maskPhone(text))
              }
              keyboardType="phone-pad"
            />

            <Input
              texto="Mãe"
              value={form?.mae || ""}
              onChangeText={(text) => handleChange("mae", text)}
            />
            
            <Input
              texto="Pai"
              value={form?.pai || ""}
              onChangeText={(text) => handleChange("pai", text)}
            />

            <View className="w-full pl-[2%]">

              {cargos.map((cargo, index) => (
                <View key={index} className="flex-row mb-2">

                  <View className="flex-1">
                    <Dropdown
                      placeholder={`Cargo ${index + 1}`}
                      data={opcoesCargos}
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

            <View className='w-full justify-center mt-[-5%] mb-[6%]'>
              <DateField
                label="Membro Desde"
                value={form?.membrodesde}
                onChange={(dateString) => handleChange("membrodesde", dateString)}
                maximumDate={new Date()}
              />

              <DateField
                label="Data de Batismo"
                value={form?.dtabatismo}
                onChange={(dateString) => handleChange("dtabatismo", dateString)}
                maximumDate={new Date()}
              />
            </View>

            <Input
              texto="Email"
              value={form?.email || ""}
              onChangeText={(text) => handleChange("email", text)}
            />

            <View className="w-full items-center justify-center relative">
              <Input
                texto="Nova Senha"
                seguranca={!mostrarSenha}
                value={form?.senha || ""}
                onChangeText={(text) => handleChange("senha", text)}
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eye}
                className="absolute right-6 z-10 top-3"
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
  sombra: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  }
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
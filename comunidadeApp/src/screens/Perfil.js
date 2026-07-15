import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { IdentificationCard, Paperclip, PencilSimple, SunDim, MoonStars, SignOutIcon, DeviceMobile } from "phosphor-react-native";
import { useAuth } from "../context/AuthContext";
import { getUserById, getEstados, getGraus, getCargos } from "../services/authService";
import { useEffect, useState } from "react";
import { AlertCustom } from '../components/alert';
import { useColorScheme } from "nativewind";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/loadingOverlay';

export function Perfil() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [themePref, setThemePref] = useState("system");

  const [estados, setEstados] = useState([]);
  const [graus, setGraus] = useState([]);
  const [cargos, setCargos] = useState([]);

  const genero = [
    { value: "F", label: "Feminino" },
    { value: "M", label: "Masculino" },
  ];
  const dicGenero = genero.find(c => c.value == usuario?.sexo)?.label || "";

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

  
  useEffect(() => {
    async function carregarCargos() {
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

        const cargosFormatados = arrayDeCargos.map((item) => ({
          value: String(item.id),
          label: item.cargo || "Sem Nome"
        }));

        setCargos(cargosFormatados);
      } catch (error) {
        console.log(error);
        setCargos([]);
      }
    }
    carregarCargos();
  }, []);

  const cargosUsuario = [
    usuario?.cargo,
    usuario?.cargo2,
    usuario?.cargo3,
    usuario?.cargo4
  ]
  .filter(c => c) 
  .map(c => cargos.find(item => item.value == c)?.label)
  .filter(c => c);

  const dicEstado = estados.find(c => c.value == usuario?.estadocivil)?.label || "";

  const dicGrau = graus.find(c => c.value == usuario?.grauinst)?.label || "";

  const { colorScheme, setColorScheme } = useColorScheme();

  const iconVerm = colorScheme === 'dark' ? '#ee2400' : '#BB1C00';

  useEffect(() => {
    async function loadThemePref() {
      const savedTheme = await AsyncStorage.getItem('@theme_pref');
      if (savedTheme) {
        setThemePref(savedTheme);
      }
    }
    loadThemePref();
  }, []);

  useEffect(() => {
    async function carregarUsuario() {
    setIsLoading(true);
      try {
        const data = await getUserById(user.id);
        setUsuario(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user?.id) {
      carregarUsuario();
    }
  }, [user]);

  async function handleCycleTheme() {
    let nextPref = "system";
    if (themePref === "system") nextPref = "light";
    else if (themePref === "light") nextPref = "dark";
    else if (themePref === "dark") nextPref = "system";

    setThemePref(nextPref);
    setColorScheme(nextPref);
    await AsyncStorage.setItem('@theme_pref', nextPref);
  }

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');

  function formatarData(data) {
    if (!data) return "";

    if (typeof data === "string") {
        const datePart = data.split("T")[0];
        const partes = datePart.split("-");
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
    }

    const d = new Date(data);

    return d.toLocaleDateString("pt-BR");
  }

  function formatarMesAnoCustom(data) {
    if (!data) return "";

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    if (typeof data === "string") {
        const datePart = data.split("T")[0];
        const partes = datePart.split("-");
        if (partes.length === 3) {
            const mes = meses[parseInt(partes[1], 10) - 1];
            return `${mes}/${partes[0]}`;
        }
    }

    const d = new Date(data);

    const mes = meses[d.getMonth()];
    const ano = d.getFullYear();

    return `${mes}/${ano}`;
  }

  function camposFaltando() {
    const faltando = [];

    const temCargo =
      usuario?.cargo ||
      usuario?.cargo2 ||
      usuario?.cargo3 ||
      usuario?.cargo4;

    if (!temCargo) faltando.push("Cargo");
    if (!usuario?.dtanasc) faltando.push("Data de Nascimento");
    if (!usuario?.membrodesde) faltando.push("Membro Desde");
    if (!usuario?.dtabatismo) faltando.push("Data de Batismo");

    return faltando;
  }

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
      title: "",
      message: "",
      type: "error",
  });

  function showAlert(title, message, type = "error") {
    setAlertConfig({ title, message, type });
    setAlertVisible(true);

    setTimeout(() => {
        setAlertVisible(false);
    }, 1500);
  }

  function temValor(valor) {
    return valor !== null && valor !== undefined && valor !== "";
  }

  const temEndereco =
    temValor(usuario?.endereco) ||
    temValor(usuario?.bairro) ||
    temValor(usuario?.cep) ||
    temValor(usuario?.uf) ||
    temValor(usuario?.complemento)
  ;

  const temIgreja =
    temValor(usuario?.membrodesde) ||
    temValor(usuario?.dtabatismo)
  ;

  function formataNome(nome) {
    if (!nome) return "Visitante";
    const partes = nome.trim().split(" ");

    return partes.slice(0, 2).join(" ");
  }

  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-18%] mt-[-12%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Perfil</Text>
          <Image
            source={logo}
            className="w-[25%] "
            resizeMode="contain"
          />
      </View>

      <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 85 }} className='flex'>
        <View className='items-center'>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              const faltando = camposFaltando();

              if (faltando.length === 0) {
                navigation.navigate("Carteira");
              } else {
                showAlert("Atenção!", `Preencha os seguintes campos:\n• ${faltando.join("\n• ")}` , "warning");
              }
            }}
            className="w-[95%] px-4 py-3 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <View>
                <Text className="text-base font-popRegular text-preto dark:text-branco">
                  {formataNome(user?.nome)}
                </Text>
                <View className="mt-[2%]">
                  {cargosUsuario.map((cargo, index) => (
                    <Text
                      key={index}
                      className="text-[14px] font-popLight text-preto dark:text-branco"
                    >
                      {cargo}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <IdentificationCard size={30} weight="light" color={camposFaltando().length === 0 ? iconVerm : "#999"}/>
          </TouchableOpacity>
        </View>

        <View className='px-[5%]'>
          {temValor(usuario?.dtanasc) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>
                Data de Nascimento
              </Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">
                {formatarData(usuario?.dtanasc)}
              </Text>
            </View>
          )}

          <View className='flex-row justify-between'>
            {temValor(usuario?.sexo) && (
              <View className='mt-[5%] items-start'>
                <Text className='font-popRegular text-base text-preto dark:text-branco'>Sexo</Text>
                <Text className="text-[15px] font-popLight text-preto dark:text-branco">{dicGenero}</Text>
              </View>
            )}
            
            {temValor(usuario?.estadocivil) && (
              <View className='mt-[5%] mr-[15%] items-start'>
                <Text className='font-popRegular text-base text-preto dark:text-branco'>Estado Civil</Text>
                <Text className="text-[15px] font-popLight text-preto dark:text-branco">{dicEstado}</Text>
              </View>
            )}
          </View>

          {temValor(usuario?.conjuge) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Cônjuge</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.conjuge}</Text>
            </View>
          )}

          {temValor(usuario?.grauinst) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Grau de Instrução</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{dicGrau}</Text>
            </View>
          )}
          
          <View className='flex-row justify-between'>
            {temValor(usuario?.situacao) && (
              <View className='mt-[5%] items-start'>
                <Text className='font-popRegular text-base text-preto dark:text-branco'>Situação</Text>
                <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.situacao}</Text>
              </View>
            )}

            {temValor(usuario?.celular) && (
              <View className='mt-[5%] mr-[10%] items-start'>
                <Text className='font-popRegular text-base text-preto dark:text-branco'>Celular</Text>
                <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.celular}</Text>
              </View>
            )}
          </View>
          
          {temValor(usuario?.mae) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Mãe</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.mae}</Text>
            </View>
          )}

          {temValor(usuario?.pai) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Pai</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.pai}</Text>
            </View>
          )}
          
          {temValor(usuario?.email) && (
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Email</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.email}</Text>
            </View>
          )}
          
          {temEndereco && (
            <>
              <View className='mt-[5%] items-center flex-row justify-between'>
                <Text className='text-vermelho dark:text-vermelho-dark text-popRegular text-[18px]'>Endereço</Text>
                <View className='w-[73%] h-[1px] bg-vermelho dark:bg-vermelho-dark'></View>
              </View>

              {temValor(usuario?.endereco) && (
                <View className='mt-[5%] items-start'>
                  <Text className='font-popRegular text-base text-preto dark:text-branco'>Endereço</Text>
                  <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.endereco}</Text>
                </View>
              )}

              {temValor(usuario?.bairro) && (
                <View className='mt-[5%] items-start'>
                  <Text className='font-popRegular text-base text-preto dark:text-branco'>Bairro</Text>
                  <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.bairro}</Text>
                </View>
              )}

              {(temValor(usuario?.cep) || temValor(usuario?.uf)) && (
                <View className='flex-row justify-between'>
                  {temValor(usuario?.cep) && (
                    <View className='mt-[5%] items-start'>
                      <Text className='font-popRegular text-base text-preto dark:text-branco'>CEP</Text>
                      <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.cep}</Text>
                    </View>
                  )}

                  {temValor(usuario?.uf) && (
                    <View className='mt-[5%] mr-[34%] items-start'>
                      <Text className='font-popRegular text-base text-preto dark:text-branco'>UF</Text>
                      <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.uf}</Text>
                    </View>
                  )}
                </View>
              )}

              {temValor(usuario?.complemento) && (
                <View className='mt-[5%] items-start'>
                  <Text className='font-popRegular text-base text-preto dark:text-branco'>Número e complemento</Text>
                  <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario?.complemento}</Text>
                </View>
              )}
            </>
          )}

          {temIgreja && (
            <>
              <View className='mt-[5%] items-center flex-row justify-between'>
                <Text className='text-vermelho dark:text-vermelho-dark text-popRegular text-[18px]'>Igreja</Text>
                <View className='w-[82%] h-[1px] bg-vermelho dark:bg-vermelho-dark'></View>
              </View>

              <View className='flex-row justify-between'>
                {temValor(usuario?.membrodesde) && (
                  <View className='mt-[5%] items-start'>
                    <Text className='font-popRegular text-base text-preto dark:text-branco'>Membro Desde</Text>
                    <Text className="text-[15px] font-popLight text-preto dark:text-branco">
                      {formatarMesAnoCustom(usuario?.membrodesde)}
                    </Text>
                  </View>
                )}

                {temValor(usuario?.dtabatismo) && (
                  <View className='mt-[5%] mr-[1%] items-start'>
                    <Text className='font-popRegular text-base text-preto dark:text-branco'>Data de Batismo</Text>
                    <Text className="text-[15px] font-popLight text-preto dark:text-branco">
                      {formatarData(usuario?.dtabatismo)}
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
        </View>

        <View className='items-center'>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Solicitacao")}
            className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-[7%] mb-[5%]"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base font-popRegular text-preto dark:text-branco">
                Solicitações para a Secretaria
              </Text>
            </View>

            <Paperclip size={25} weight="light" color={iconVerm}/>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCycleTheme}
            className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mb-[5%]"
            style={styles.sombra}
          >
            <Text className="text-base font-popRegular text-preto dark:text-branco">
              Tema {themePref === "system" ? "Sistema" : themePref === "light" ? "Claro" : "Escuro"}
            </Text>

            {themePref === "dark" ? (
              <MoonStars size={25} weight="light" color={iconVerm} />
            ) : themePref === "light" ? (
              <SunDim size={25} weight="light" color={iconVerm} />
            ) : (
              <DeviceMobile size={25} weight="light" color={iconVerm} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              await logout();
              navigation.navigate("Login");
            }}
            className="w-[95%] px-4 py-5 bg-transparent border-solid border-vermelho dark:border-vermelho-dark border-[1px] rounded-[20px] flex-row items-center justify-between mb-[25%]"
            
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base font-popRegular text-vermelho dark:text-vermelho-dark">
                LogOut
              </Text>
            </View>

            <SignOutIcon size={25} weight="light" color={iconVerm}/>
          </TouchableOpacity>
        </View>
      </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditPerfil")}
          className="absolute bottom-32 right-5 bg-vermelho dark:bg-vermelho-dark rounded-full p-4"
          style={styles.sombra}
        >
          <PencilSimple  size={28} weight="light" color="#FAFAFA"/>
        </TouchableOpacity>

      <Nav
        active="Perfil"
        onChange={(r) => navigation.navigate(r)}
      />
      <LoadingOverlay visible={isLoading} />

      <AlertCustom
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
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
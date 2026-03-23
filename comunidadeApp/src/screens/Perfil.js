import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { IdentificationCard, Paperclip, PencilSimple, SunDim, MoonStars } from "phosphor-react-native";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../services/authService";
import { useEffect, useState } from "react";
import { AlertCustom } from '../components/alert';

export function Perfil() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [usuario, setUsuario] = useState(null);

  const genero = [
    { value: "F", label: "Feminino" },
    { value: "M", label: "Masculino" },
  ];
  const dicGenero = genero.find(c => c.value == usuario?.sexo)?.label || "";

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
  const cargosUsuario = [
    usuario?.cargo,
    usuario?.cargo2,
    usuario?.cargo3,
    usuario?.cargo4
  ]
  .filter(c => c) 
  .map(c => cargos.find(item => item.value == c)?.label)
  .filter(c => c);

  const estado = [
    { value: "1", label: "Casado(a)" },
    { value: "2", label: "Desquitado(a)" },
    { value: "3", label: "Divorciado(a)" },
    { value: "4", label: "Não Informar" },
    { value: "5", label: "Separado(a)" },
    { value: "6", label: "Solteiro(a)" },
    { value: "7", label: "União Estável" },
    { value: "8", label: "Viúvo(a)" },
  ];
  const dicEstado = estado.find(c => c.value == usuario?.estadocivil)?.label || "";

  const grau = [
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
  const dicGrau = grau.find(c => c.value == usuario?.grauinst)?.label || "";


  useEffect(() => {
    async function carregarUsuario() {
      try {
        const data = await getUserById(user.id);
        setUsuario(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (user?.id) {
      carregarUsuario();
    }
  }, [user]);

  const { theme, toggleTheme } = useTheme();

  function formatarData(data) {
    if (!data) return "";

    const d = new Date(data);

    return d.toLocaleDateString("pt-BR");
  }

  function formatarMesAnoCustom(data) {
    if (!data) return "";

    const d = new Date(data);

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

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
    }, 2500);
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
            source={require('../../assets/images/logoPreto.png')}
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
                  {formataNome(user?.name)}
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

            <IdentificationCard size={30} color={camposFaltando().length === 0 ? "#B3261E" : "#999"}/>
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
                <Text className='text-vermelho text-popRegular text-[18px]'>Endereço</Text>
                <View className='w-[73%] h-[1px] bg-vermelho'></View>
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
                <Text className='text-vermelho text-popRegular text-[18px]'>Igreja</Text>
                <View className='w-[82%] h-[1px] bg-vermelho'></View>
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

            <Paperclip size={25} color="#B3261E"/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleTheme}
            className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mb-[25%]"
            style={styles.sombra}
          >
            <Text className="text-base font-popRegular text-preto dark:text-branco">
              Tema do App
            </Text>

            {theme === "dark" ? (
              <MoonStars size={25} color="#B3261E" />
            ) : (
              <SunDim size={25} color="#B3261E" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditPerfil")}
          className="absolute bottom-32 right-5 bg-vermelho rounded-full p-4"
          style={styles.sombra}
        >
          <PencilSimple  size={28} color="#FAFAFA"/>
        </TouchableOpacity>

      <Nav
        active="Perfil"
        onChange={(r) => navigation.navigate(r)}
      />

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
      // iOS
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      // Android
      elevation: 6,
  }
});

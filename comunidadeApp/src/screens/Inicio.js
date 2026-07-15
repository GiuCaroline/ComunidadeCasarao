import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useState, useEffect } from "react";
import { InstagramLogo, YoutubeLogo, FacebookLogo, MapPinAreaIcon, Bank, PixLogo } from "phosphor-react-native";
import { WhatsappLogo, Phone, EnvelopeSimple } from "phosphor-react-native";
import { Carrossel } from '../components/carrossel';
import { Nav } from '../components/nav';
import LoadingOverlay from '../components/loadingOverlay';
import { useAuth } from "../context/AuthContext";
import { useColorScheme } from "nativewind";
import { getProximosEventos } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';
import { AlertCustom } from "../components/alert";

export function Inicio(){
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const icon = colorScheme === 'dark' ? '#FAFAFA' : '#000000';
  const iconVerm = colorScheme === 'dark' ? '#ee2400' : '#BB1C00';

  const [loading, setLoading] = useState(true);
  const [proximosEventos, setProximosEventos] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  
  const [alerta, setAlerta] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error"
  });

  const copiarTexto = async (texto) => {
    await Clipboard.setStringAsync(texto);
      setAlerta({
        visible: true,
        title: "Copiado!",
        message: "Foi copiado para a área de transferência.",
        type: "success"
      });
  };

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');

  function primeiroNome(nome) {
    if (!nome) return "Visitante";
    return nome.split(" ")[0];
  }

  async function carregarDados() {
    try {
      const data = await getProximosEventos();
      setProximosEventos(data || []);
    } catch (error) {
      setAlerta({
        visible: true,
        title: "Erro",
        message: "Não foi possível carregar os próximos eventos.",
        type: "error"
      });
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);
  
  return (
    <>
    <AlertCustom
        visible={alerta.visible}
        title={alerta.title}
        message={alerta.message}
        type={alerta.type}
        onClose={() => setAlerta({ ...alerta, visible: false })}
    />

    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      {loading && <LoadingOverlay />}

      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 110 }} className='flex w-full'>
        <View className='w-full flex-row justify-between items-center px-[2%] mb-[-18%] mt-[-15%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Olá {primeiroNome(user?.nome)}!</Text>
          <Image
              source={logo}
              className="w-[25%] "
              resizeMode="contain"
          />
        </View>

        <Carrossel setLoading={setLoading} />

        <View className='mt-[5%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-preto dark:text-branco'>Próximos Eventos</Text>

          {proximosEventos.length > 0 ? (
            proximosEventos.map((evento, index) => (
              <View key={evento.id || index} className='bg-input dark:bg-input-dark rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
                <View className='flex-row items-center justify-between'>
                  <Text className='font-popLight text-[16px] ml-[2%] text-preto dark:text-branco'>{evento.nome}</Text>
                  <Text className='font-popLight text-[14px] text-preto dark:text-branco'>{formataHora(evento.horarioString)}</Text>
                </View>
                <Text className='font-popExtralight text-[16px] ml-[2%] text-preto dark:text-branco'>{evento.data}</Text>
              </View>
            ))
          ) : (
            <Text className='font-popLight text-[14px] text-preto dark:text-branco mt-[5%]'>Nenhum evento próximo programado.</Text>
          )}

        </View>

        <View className='items-center mt-[15%]'>
          <Text className='underline font-popRegular text-[18px] text-preto dark:text-branco'>Nos acompanhe nas nossas{' '}
            <Text className='text-vermelho underline'>redes</Text>
          </Text>

         <View className='mt-[5%]'>
          <TouchableOpacity 
            className='flex-row items-center gap-2'
            onPress={() => Linking.openURL('https://instagram.com/comunidade.casarao')}
          >
            <InstagramLogo color={icon} weight="light" size={35} />
            <Text className='text-[16px] text-vermelho'>@comunidade.casarao</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className='flex-row items-center gap-2 mt-[2%]'
            onPress={() => Linking.openURL('https://www.youtube.com/@comunidade.casarao')}
          >
            <YoutubeLogo color={icon} weight="light" size={35} />
            <Text className='text-[16px] text-vermelho'>Comunidade Casarão</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className='flex-row items-center gap-2 mt-[2%]'
            onPress={() => Linking.openURL('https://facebook.com/comunidade.casarao')}
          >
            <FacebookLogo color={icon} weight="light" size={35} />
            <Text className='text-[16px] text-vermelho'>comunidade.casarao</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View className='mt-[20%] bg-input dark:bg-input-dark mx-[5%] px-[4%] py-[3%] rounded-xl' style={[styles.sombra]}>
          <View className='flex-row justify-between items-center'>
            <Text className='text-vermelho underline text-[18px] ml-[1%]'>Contatos</Text>
            <View className='flex-row items-center gap-2'>
              <MapPinAreaIcon color={icon} weight="light" size={30}/>
              <Text className='text-[15px] font-popRegular text-preto dark:text-branco'>Onde estamos</Text>
            </View>
          </View>

          <View className='mt-[5%] flex-row justify-between'>
            <View>
              <View className='flex-row items-center gap-2'>
                <WhatsappLogo color={icon} weight="light" size={32}/>
                <Text className='text-preto dark:text-branco text-[15px] font-popLight'>(11) 91342-2341</Text>
              </View>

              <View className='flex-row items-center gap-2 mt-[12%]'>
                <Phone color={icon}  weight="light" size={32}/>
                <Text className='text-preto dark:text-branco text-[15px] font-popLight'>(11) 4455-3943</Text>
              </View>
            </View>
            
            <View className='justify-centter items-center'>
              <Text className='font-popLight text-[15px] text-preto dark:text-branco'>Av. da Saudade</Text>
              <Text className='font-popLight text-[15px] text-preto dark:text-branco'>137,</Text>
              <Text className='font-popLight text-[15px] text-preto dark:text-branco'>Vila Nossa Senhora</Text>
              <Text className='font-popLight text-[15px] text-preto dark:text-branco'>das Vitórias</Text>
            </View>
          </View>

          <View className='flex-row items-center gap-2 mt-[2%]'>
            <EnvelopeSimple color={icon} weight="light" size={32}/>
            <Text className='text-preto dark:text-branco text-[15px] font-popLight'>contato@comunidadecasarao.com</Text>
          </View>
        </View>

        <View className='mt-[15%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-preto dark:text-branco'>Dízimos e Ofertas</Text>

          <Text className='font-popLight text-[15px] mt-[3%] text-preto dark:text-branco'>{'    Contribuir é um ato de fé e gratidão.\nA sua oferta ajuda a sustentar os projetos da Comunidade Casarão e a expandir o Reino de Deus na cidade.'} </Text>

          <View className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[3%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center gap-2'>
              <Bank color={iconVerm} weight="light" size={32}/>
              <Text className='text-preto dark:text-branco font-popRegular text-[16px]'>Transferência Bancária</Text>
            </View>

            <TouchableOpacity className='mt-[5%]' onPress={() => copiarTexto('001')}>
              <Text className='text-[15px] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Banco:</Text> Banco Bradesco</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => copiarTexto('0121')}>
              <Text className='text-[15px] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Agência:</Text> 0121</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => copiarTexto('145880-9')}>
              <Text className='text-[15px] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Conta:</Text> 145880-9</Text>
            </TouchableOpacity>
            
            <View className='flex-row justify-between'>
              <View>
                <View className='flex-row items-center gap-2 mt-[5%]'>
                  <PixLogo color={iconVerm} weight="light" size={32}/>
                  <Text className='text-preto dark:text-branco font-popRegular text-[16px]'>Pix</Text>
                </View>
                <Text className='mt-[3%] font-popLight text-preto dark:text-branco text-[15px]'>{'  Escaneie o QR\nCode com o app do\nseu banco para\ncontribuir.'}</Text>
                <Text className='text-preto dark:text-branco font-popRegular text-[16px] mt-[10%]'>Chave Pix:</Text>
              </View>
                <Image
                  source={require('../../assets/images/pix.png')}
                  className="w-[150px] mt-[10%]"
                  resizeMode="contain"
                />
            </View>

            <TouchableOpacity onPress={() => copiarTexto('55.046.445/0001-02')}>
              <Text className='text-[16px] font-popLight text-preto dark:text-branco'>55.046.445/0001-02</Text>
            </TouchableOpacity>
          </View> 
        </View>
        <Text className='text-[16px] text-preto dark:text-branco font-popLightItalic px-[5%] text-center mt-[5%]'>Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.</Text>
        <Text className='text-[16px] text-vermelho font-popSemiboldItalic px-[5%] text-center'>2 Coríntios 9:7</Text>

      </ScrollView>
      <Nav
        active="Inicio"
        onChange={(r) => navigation.navigate(r)} />
    </View>
    </>
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

function formataHora(tempo) {
  if (!tempo) return "";

  const horarios = tempo.split(" e ");

  const horariosFormatados = horarios.map(horario => {
    const partes = horario.split("h");
    
    if (partes.length >= 2) {
      const hora = partes[0];
      const minuto = partes[1];

      if (minuto === "00") {
        return `${hora}h`;
      }
      return `${hora}h${minuto}`;
    }
    
    return horario;
  });

  return horariosFormatados.join(" e ");
}
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { InstagramLogo, YoutubeLogo, FacebookLogo, MapPinAreaIcon, Bank, PixLogo } from "phosphor-react-native";
import { WhatsappLogo, Phone, EnvelopeSimple } from "phosphor-react-native";
import { Carousel } from '../components/carousel';
import { Nav } from '../components/nav';
import { useAuth } from "../context/AuthContext";
import { useColorScheme } from "nativewind";

import { useNavigation } from "@react-navigation/native";


export function Inicio(){
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');

  function primeiroNome(nome) {
    if (!nome) return "Visitante";
    return nome.split(" ")[0];
  }
  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 95 }} className='flex'>
        <View className='w-full flex-row justify-between items-center px-[2%] mb-[-18%] mt-[-15%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Olá {primeiroNome(user?.nome)}!</Text>
          <Image
              source={logo}
              className="w-[25%] "
              resizeMode="contain"
          />
        </View>

        <Carousel />

        <View className='mt-[5%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-preto dark:text-branco'>Próximos Eventos</Text>

          <View className='bg-input dark:bg-input-dark rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%] text-preto dark:text-branco'>Culto e Santa Ceia</Text>
              <Text className='font-popLight text-[14px] text-preto dark:text-branco'>10h e 18h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%] text-preto dark:text-branco'>07/12</Text>
          </View>

          <View className='bg-input dark:bg-input-dark rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%] text-preto dark:text-branco'>Jantar Líderes</Text>
              <Text className='font-popLight text-[14px] text-preto dark:text-branco'>18h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%] text-preto dark:text-branco'>13/12</Text>
          </View>

          <View className='bg-input dark:bg-input-dark rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%] text-preto dark:text-branco'>Cantata de Natal</Text>
              <Text className='font-popLight text-[14px] text-preto dark:text-branco'>10h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%] text-preto dark:text-branco'>21/12</Text>
          </View>
        </View>

        <View className='items-center mt-[15%]'>
          <Text className='underline font-popRegular text-[18px] text-preto dark:text-branco'>Nos acompanhe nas nossas{' '}
            <Text className='text-vermelho underline'>redes</Text>
          </Text>

          <View className='mt-[5%]'>
            <TouchableOpacity className='flex-row items-center gap-2'>
              <InstagramLogo className='text-preto dark:text-branco' weight="light" size={35} />
              <Text className='text-[16px] text-vermelho'>@comunidade.casarao</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row items-center gap-2 mt-[2%]'>
              <YoutubeLogo className='text-preto dark:text-branco' weight="light" size={35} />
              <Text className='text-[16px] text-vermelho'>Comunidade Casarão</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row items-center gap-2 mt-[2%]'>
              <FacebookLogo className='text-preto dark:text-branco' weight="light" size={35} />
              <Text className='text-[16px] text-vermelho'>comunidade.casarao</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='mt-[20%] bg-input dark:bg-input-dark mx-[5%] px-[4%] py-[3%] rounded-xl' style={[styles.sombra]}>
          <View className='flex-row justify-between items-center'>
            <Text className='text-vermelho underline text-[18px] ml-[1%]'>Contatos</Text>
            <View className='flex-row items-center gap-2'>
              <MapPinAreaIcon className='text-preto dark:text-branco' weight="light" size={30}/>
              <Text className='text-[15px] font-popRegular text-preto dark:text-branco'>Onde estamos</Text>
            </View>
          </View>

          <View className='mt-[5%] flex-row justify-between'>
            <View>
              <View className='flex-row items-center gap-2'>
                <WhatsappLogo className='text-preto dark:text-branco' weight="light" size={32}/>
                <Text className='text-preto dark:text-branco text-[15px] font-popLight'>(11) 91342-2341</Text>
              </View>

              <View className='flex-row items-center gap-2 mt-[12%]'>
                <Phone className='text-preto dark:text-branco' weight="light" size={32}/>
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
            <EnvelopeSimple className='text-preto dark:text-branco' weight="light" size={32}/>
            <Text className='text-preto dark:text-branco text-[15px] font-popLight'>contato@comunidadecasarao.com</Text>
          </View>
        </View>

        <View className='mt-[15%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-preto dark:text-branco'>Dízimos e Ofertas</Text>

          <Text className='font-popLight text-[15px] mt-[3%] text-preto dark:text-branco'>{'     Contribuir é um ato de fé e gratidão.\nA sua oferta ajuda a sustentar os projetos da Comunidade Casarão e a expandir o Reino de Deus na cidade.'} </Text>

          <View className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[3%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center gap-2'>
              <Bank className='text-vermelho' weight="light" size={32}/>
              <Text className='text-preto dark:text-branco font-popRegular text-[16px]'>Transferência Bancária</Text>
            </View>

            <Text className='text-[15px] mt-[5%] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Banco:</Text> 001 - Banco Santander</Text>
            <Text className='text-[15px] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Agência:</Text> 1234-5</Text>
            <Text className='text-[15px] font-popLight text-preto dark:text-branco'><Text className='font-popRegular'>Conta:</Text> 67890-1</Text>

            
            <View className='flex-row justify-between'>
              <View>
                <View className='flex-row items-center gap-2 mt-[5%]'>
                  <PixLogo className='text-vermelho' weight="light" size={32}/>
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
            <Text className='text-[16px] font-popLight text-preto dark:text-branco'>contato@comunidadecasarao.com</Text>
          </View>

        </View>

        <Text className='text-[16px] text-preto dark:text-branco font-popLightItalic px-[5%] text-center mt-[5%]'>Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.</Text>
        <Text className='text-[16px] text-vermelho font-popSemiboldItalic px-[5%] text-center'>2 Coríntios 9:7</Text>

      </ScrollView>
      <Nav
        active="Inicio"
        onChange={(r) => navigation.navigate(r)} />
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
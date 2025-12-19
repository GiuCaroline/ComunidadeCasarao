import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { InstagramLogo, YoutubeLogo, FacebookLogo, MapPinAreaIcon, Bank, PixLogo } from "phosphor-react-native";
import { WhatsappLogo, Phone, EnvelopeSimple } from "phosphor-react-native";
import { Carousel } from '../components/carousel';


export function Inicio(){

    return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <ScrollView contentContainerStyle={{ padding: 10 }} className='flex'>
        <View className='w-full flex-row justify-between items-center px-[2%] mb-[-18%] mt-[-15%]'>
          <Text className='text-[18px] font-popRegular mt-[5%]'>Olá Fulano!</Text>
          <Image
              source={require('../../assets/images/logoPreto.png')}
              className="w-[25%] "
              resizeMode="contain"
          />
        </View>

        <Carousel />

        <View className='mt-[5%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-black'>Próximos Eventos</Text>

          <View className='bg-input rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%]'>Culto e Santa Ceia</Text>
              <Text className='font-popLight text-[14px]'>10h e 18h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%]'>07/12</Text>
          </View>

          <View className='bg-input rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%]'>Jantar Líderes</Text>
              <Text className='font-popLight text-[14px]'>18h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%]'>13/12</Text>
          </View>

          <View className='bg-input rounded-xl px-[3%] py-[1%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center justify-between'>
              <Text className='font-popLight text-[16px] ml-[2%]'>Cantata de Natal</Text>
              <Text className='font-popLight text-[14px]'>10h</Text>
            </View>
            <Text className='font-popExtralight text-[16px] ml-[2%]'>21/12</Text>
          </View>
        </View>

        <View className='items-center mt-[15%]'>
          <Text className='underline font-popRegular text-[18px]'>Nos acompanhe nas nossas{' '}
            <Text className='text-vermelho underline'>redes</Text>
          </Text>

          <View className='mt-[5%]'>
            <TouchableOpacity className='flex-row items-center gap-2'>
              <InstagramLogo className='text-black' size={35} />
              <Text className='text-[16px] text-vermelho'>@comunidade.casarao</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row items-center gap-2 mt-[2%]'>
              <YoutubeLogo className='text-black' size={35} />
              <Text className='text-[16px] text-vermelho'>Comunidade Casarão</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row items-center gap-2 mt-[2%]'>
              <FacebookLogo className='text-black' size={35} />
              <Text className='text-[16px] text-vermelho'>comunidade.casarao</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='mt-[20%] bg-input mx-[5%] px-[4%] py-[3%] rounded-xl' style={[styles.sombra]}>
          <View className='flex-row justify-between items-center'>
            <Text className='text-vermelho underline text-[18px] ml-[1%]'>Contatos</Text>
            <View className='flex-row items-center gap-2'>
              <MapPinAreaIcon className='text-black' size={30}/>
              <Text className='text-[15px] font-popRegular'>Onde estamos</Text>
            </View>
          </View>

          <View className='mt-[5%] flex-row justify-between'>
            <View>
              <View className='flex-row items-center gap-2'>
                <WhatsappLogo className='text-black' size={32}/>
                <Text className='text-black text-[15px] font-popLight'>(11) 91342-2341</Text>
              </View>

              <View className='flex-row items-center gap-2 mt-[12%]'>
                <Phone className='text-black' size={32}/>
                <Text className='text-black text-[15px] font-popLight'>(11) 4455-3943</Text>
              </View>
            </View>
            
            <View className='justify-centter items-center'>
              <Text className='font-popLight text-[15px] text-black'>Av. da Saudade</Text>
              <Text className='font-popLight text-[15px] text-black'>137,</Text>
              <Text className='font-popLight text-[15px] text-black'>Vila Nossa Senhora</Text>
              <Text className='font-popLight text-[15px] text-black'>das Vitórias</Text>
            </View>
          </View>

          <View className='flex-row items-center gap-2 mt-[2%]'>
            <EnvelopeSimple className='text-black' size={32}/>
            <Text className='text-black text-[15px] font-popLight'>contato@comunidadecasarao.com</Text>
          </View>
        </View>

        <View className='mt-[15%] px-[5%]'>
          <Text className='font-popRegular text-[18px] text-black'>Dízimos e Ofertas</Text>

          <Text className='font-popLight text-[15px] mt-[3%]'>{'     Contribuir é um ato de fé e gratidão.\nA sua oferta ajuda a sustentar os projetos da Comunidade Casarão e a expandir o Reino de Deus na cidade.'} </Text>

          <View className='bg-input rounded-xl h-[500px] px-[4%] py-[2%] mt-[5%]' style={[styles.sombra]}>
            <View className='flex-row items-center gap-2'>
              <Bank className='text-vermelho' size={32}/>
              <Text className='text-black font-popRegular text-[16px]'>Transferência Bancária</Text>
            </View>

            <Text className='text-[15px] mt-[5%] font-popLight'><Text className='font-popRegular'>Banco:</Text> 001 - Banco Santander</Text>
            <Text className='text-[15px] font-popLight'><Text className='font-popRegular'>Agência:</Text> 1234-5</Text>
            <Text className='text-[15px] font-popLight'><Text className='font-popRegular'>Conta:</Text> 67890-1</Text>

            
            <View className='flex-row'>
              <Text></Text>
              <View className='flex-row items-center gap-2 mt-[5%]'>
                <PixLogo className='text-vermelho' size={32}/>
                <Text className='text-black font-popRegular text-[16px]'>Pix</Text>
              </View>

              <Image
                source={require('../../assets/images/pix.png')}
                className="w-[250px] h-[100px]"
                resizeMode="contain"
              />
            </View>

          </View>

        </View>

      </ScrollView>
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
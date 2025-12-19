import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { InstagramLogo, YoutubeLogo, FacebookLogo, MapPinAreaIcon } from "phosphor-react-native";
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

        <View className='mt-[20%] bg-input h-[300px] mx-[5%] px-[4%] py-[3%] rounded-xl' style={[styles.sombra]}>
          <View className='flex-row justify-between items-center'>
            <Text className='text-vermelho underline text-[18px] ml-[1%]'>Contatos</Text>
            <View className='flex-row items-center gap-2'>
              <MapPinAreaIcon className='text-black' size={30}/>
              <Text className='text-[16px] font-popRegular'>Onde estamos</Text>
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
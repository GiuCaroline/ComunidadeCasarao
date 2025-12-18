import { View, KeyboardAvoidingView, Image, ScrollView, Text, Platform } from "react-native";

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

      </ScrollView>
    </View>
  );
}
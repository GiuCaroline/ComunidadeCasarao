import { View, Text, ScrollView, Image } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";

export function Cursos() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
    <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 85 }} className='flex'>
        <View className='w-full flex-row justify-between items-center px-[2%] mb-[-18%] mt-[-15%]'>
            <Text className='text-[18px] font-popRegular mt-[5%]'>Cursos</Text>
            <Image
                source={require('../../assets/images/logoPreto.png')}
                className="w-[25%] "
                resizeMode="contain"
            />
        </View>

    </ScrollView>
      <Nav
        active="Cursos"
        onChange={(r) => navigation.navigate(r)} 
      />
    </View>
  );
}

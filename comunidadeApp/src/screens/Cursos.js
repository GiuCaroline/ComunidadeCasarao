import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { Info } from "phosphor-react-native";

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
        <View
        className="bg-branco rounded-xl px-4 py-3 mt-4"
        style={styles.shadow}
        >
          <View className="flex-col">
            <View className='flex-row items-center gap-1'>
              <Info size={25} weight="fill" className="text-vermelho" />
              <Text className="font-popRegular text-[17px] text-[14px] dark:tex-branco">
                  Informações Adicionais
              </Text>
            </View>
              <Text className="text-[14px] font-Light text-preto dark:tex-branco flex-1">
              Para mais detalhes sobre os cursos, entre em contato com os
              responsáveis ou procure a secretaria da igreja.
              </Text>
          </View>
        </View>
    </ScrollView>
      <Nav
        active="Cursos"
        onChange={(r) => navigation.navigate(r)} 
      />
    </View>
  );
}


const styles = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  },
});

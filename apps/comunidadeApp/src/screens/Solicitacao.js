import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, File } from "phosphor-react-native";


export function Solicitacao() {
    const navigation = useNavigation();

  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Perfil")}
      >
          <View className='w-full flex-row items-center px-[4%] mt-[16%]'>
              <ArrowLeft className='text-preto dark:text-branco' />
              <Text className='ml-[4%] mt-[1%] text-[18px] font-popRegular text-preto dark:text-branco'>Solicitação</Text>
          </View>
      </TouchableOpacity>

      <View className='items-center'>
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-[7%] mb-[6%]"
          style={styles.sombra}
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-base font-popRegular text-preto dark:text-branco">
              Carta de Recomendação
            </Text>
          </View>

          <File size={25} color="#B3261E"/>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mb-[6%]"
          style={styles.sombra}
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-base font-popRegular text-preto dark:text-branco">
              Carta de Tensferência
            </Text>
          </View>

          <File size={25} color="#B3261E"/>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mb-[6%]"
          style={styles.sombra}
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-base font-popRegular text-preto dark:text-branco">
              Outras solicitações
            </Text>
          </View>

          <File size={25} color="#B3261E"/>
        </TouchableOpacity>
      </View>

      <Nav
        active="Perfil"
        onChange={(r) => navigation.navigate(r)}
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

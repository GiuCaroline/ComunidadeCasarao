import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { IdentificationCard  } from "phosphor-react-native";

export function Perfil() {
  const navigation = useNavigation();

  const usuario = [
    { id: "1",
     nome: "Fulano de tal",
     cargo: "Membro",
     dtaNascimento: "10/01/2006",
     sexo: "Masculino",
     estadoCivil: "Solteiro(a)",
     grauInstrucao: "Ensino Superior",
     situacao: "Ativo",
     celular: "(11) 940028922",
     mae: "Siclana de tal",
     pai: "Siclano de tal",
     email: "teste@teste.com",
     endereco: "Rua dos bobos",
     bairro: "Vila Vitória",
     cep: "09111-231",
     uf: "SP",
     complemento: "Nenhum",
     membro: "Ago/2015",
     dtaBatismo: "19/10/2019"
    },
  ];

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
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full px-4 py-3 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-3"
          style={styles.sombra}
        >
          <View className="flex-row items-center gap-3">
            <View>
              <Text className="text-base font-popRegular text-preto dark:text-branco">
                {usuario[0].nome}
              </Text>
              <Text className="text-[14px] font-popLight text-preto dark:text-branco mt-[2%]">
                {usuario[0].cargo}
              </Text>
            </View>
          </View>

          <IdentificationCard size={30} color="#B3261E"  />
        </TouchableOpacity>
      </ScrollView>
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

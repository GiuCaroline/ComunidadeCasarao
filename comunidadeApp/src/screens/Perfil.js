import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { IdentificationCard, Paperclip, PencilSimple  } from "phosphor-react-native";

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
        <View className='items-center'>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Carteira")}
            className="w-[95%] px-4 py-3 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between"
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
        </View>

        <View className='px-[5%]'>
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Data de Nascimento</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].dtaNascimento}</Text>
          </View>

          <View className='flex-row justify-between'>
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Sexo</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].sexo}</Text>
            </View>
            <View className='mt-[5%] mr-[15%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Estado Civil</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].estadoCivil}</Text>
            </View>
          </View>

          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Grau de Instrução</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].grauInstrucao}</Text>
          </View>
          
          <View className='flex-row justify-between'>
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Situação</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].situacao}</Text>
            </View>
            <View className='mt-[5%] mr-[10%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Celular</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].celular}</Text>
            </View>
          </View>
          
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Mãe</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].mae}</Text>
          </View>
          
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Pai</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].pai}</Text>
          </View>
          
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Email</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].email}</Text>
          </View>

          <View className='mt-[5%] items-center flex-row justify-between'>
            <Text className='text-vermelho text-popRegular text-[18px]'>Endereço</Text>
            <View className='w-[73%] h-[1px] bg-vermelho'></View>
          </View>
          
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Endereço</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].endereco}</Text>
          </View>
          
          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Bairro</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].bairro}</Text>
          </View>
          
          <View className='flex-row justify-between'>
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>CEP</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].cep}</Text>
            </View>
            <View className='mt-[5%] mr-[34%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>UF</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].uf}</Text>
            </View>
          </View>

          <View className='mt-[5%] items-start'>
            <Text className='font-popRegular text-base text-preto dark:text-branco'>Complemento</Text>
            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].complemento}</Text>
          </View>

          <View className='mt-[5%] items-center flex-row justify-between'>
            <Text className='text-vermelho text-popRegular text-[18px]'>Igreja</Text>
            <View className='w-[82%] h-[1px] bg-vermelho'></View>
          </View>

          <View className='flex-row justify-between'>
            <View className='mt-[5%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Membro Desde</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].membro}</Text>
            </View>
            <View className='mt-[5%] mr-[1%] items-start'>
              <Text className='font-popRegular text-base text-preto dark:text-branco'>Data de Batismo</Text>
              <Text className="text-[15px] font-popLight text-preto dark:text-branco">{usuario[0].dtaBatismo}</Text>
            </View>
          </View>
        </View>

        <View className='items-center'>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Solicitacao")}
            className="w-[95%] px-4 py-5 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-[7%] mb-[15%]"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base font-popRegular text-preto dark:text-branco">
                Solicitações para a Secretaria
              </Text>
            </View>

            <Paperclip size={25} color="#B3261E"/>
          </TouchableOpacity>
        </View>
      </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditPerfil")}
          className="absolute bottom-24 right-5 bg-vermelho rounded-full p-4"
          style={styles.sombra}
        >
          <PencilSimple  size={28} color="#FAFAFA"/>
        </TouchableOpacity>

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

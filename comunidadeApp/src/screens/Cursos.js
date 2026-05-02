import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { Info } from "phosphor-react-native";
import { DropdownContent } from '../components/dropdownContent';
import { useColorScheme } from "nativewind";
import { getCursos } from "../services/authService";
import LoadingOverlay from '../components/loadingOverlay';

export function Cursos() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  
  const [cursos, setCursos] = useState([]);

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');

  useEffect(() => {
    async function carregarCursos() {
    setIsLoading(true);
      try {
        const data = await getCursos();
        setCursos(data.cursos);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarCursos();
  }, []);

  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 125 }} className='flex'>
          <View className='w-full flex-row justify-between items-center px-[2%] mb-[-18%] mt-[-15%]'>
              <Text className='text-[18px] text-preto dark:text-branco font-popRegular mt-[5%]'>Cursos</Text>
              <Image
                  source={logo}
                  className="w-[25%] "
                  resizeMode="contain"
              />
          </View>
          <View
          className="flex-col bg-branco dark:bg-input-dark rounded-3xl p-[5%] mt-[1%] mx-[2%]"
          style={styles.shadow}
          >
            <View className='flex-row items-center gap-1'>
              <Info size={25} weight="fill" className="text-vermelho" />
              <Text className="font-popRegular text-preto text-[17px] dark:text-branco">
                  Informações Adicionais
              </Text>
            </View>
              <Text className="text-[15px] mt-[2%] font-popLight text-preto dark:text-branco">
              Para mais detalhes sobre os cursos, entre em contato com os
              responsáveis ou procure a secretaria da igreja.
              </Text>
          </View>

          <View className='items-center mt-[10%]'>
            {cursos.map((curso) => (
              <DropdownContent
                key={curso.id}
                title={curso.nomeCurso}
                subtitle={curso.dias + ' - ' + curso.horario}
                description={curso.descricao}
                whatsapp={curso.celular}
                email={curso.email}
              />
            ))}
          </View>

      </ScrollView>
      <Nav
        active="Cursos"
        onChange={(r) => navigation.navigate(r)} 
      />
      
      <LoadingOverlay visible={isLoading} />
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
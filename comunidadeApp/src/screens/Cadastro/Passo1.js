import {
  View, Text, Image, KeyboardAvoidingView, ScrollView,
  Platform, TouchableOpacity, StyleSheet, Modal
} from 'react-native';

import { Input } from '../../components/input';
import { Calendario } from '../../components/calendario';
import { Dropdown } from '../../components/dropdown';
import { MascFem } from '../../components/genero';

import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useCadastro } from "../CadastroContext";

export function Passo1() {
  const navigation = useNavigation();
  const { cadastro, updateCadastro } = useCadastro();
  
    const [show, setShow] = useState(false);
    const [day, setDay] = useState(null);

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [calendarioVisible, setCalendarioVisible] = useState(false);

  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          scrollEnabled={scrollEnabled}
          contentContainerStyle={{ padding: 10, alignItems: 'center' }}
        >

            <Image
                source={require('../../../assets/images/logoPreto.png')}
                className="w-[60%] mt-[-10%]"
                resizeMode="contain"
            />

            <Text className="font-popMedium text-[22px] text-vermelho mt-[-15%] mb-[5%]">
                Cadastro
            </Text>

            <View className="w-[70%] flex-row items-center justify-between mb-[10%]">
        
                <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho">1</Text>
                </View>

                <View className="flex-1 h-[4px] bg-input" />

                <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho/50">2</Text>
                </View>

                <View className="flex-1 h-[4px] bg-input" />

                <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho/50">3</Text>
                </View>

            </View>

            {/* Nome */}
            <Input
                texto="Nome*"
                value={cadastro.nome}
                onChangeText={(text) => updateCadastro({ nome: text })}
            />

            {/* Data */}
                <View className='flex flex-row justify-center items-baseline'>
                    <Text className="text-[16px] font-popRegular text-placeInput w-[200px]">Data de Nascimento*</Text>
                    <TouchableOpacity className='bg-[#BB1C00] rounded-xl py-2 flex items-center w-[130px]' onPress={() => setCalendarioVisible(true)}>
                        <Text className='text-[#fafafa]'>Selecionar Data</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={calendarioVisible} transparent animationType="fade">
                    <Calendario day={day} setDay={setDay} close={() => setCalendarioVisible(false)} />
                </Modal>


                <TouchableOpacity style={[styles.sombra]}
                    className="bg-input rounded-xl flex px-4 justify-center w-[95%] h-[50px] mb-[10%]"
                    onPress={() => setShow(true)}
                >
                    <Text>
                    {day?.dateString}
                    </Text>
                </TouchableOpacity>

            {/* Sexo */}
            <MascFem
                value={cadastro.sexo}
                onChange={(sexo) => updateCadastro({ sexo })}
            />

            {/* Estado civil */}
            <Dropdown
                placeholder="Estado Civil*"
                data={[
                    { value: "1", label: "Casado(a)" },
                    { value: "2", label: "Desquitado(a)" },
                    { value: "3", label: "Divorciado(a)" },
                    { value: "4", label: "Não Informar" },
                    { value: "5", label: "Separado(a)" },
                    { value: "6", label: "Solteiro(a)" },
                    { value: "7", label: "União Estável" },
                    { value: "8", label: "Viúvo(a)" },
                ]}
                onChange={(item) => updateCadastro({ estadoCivil: item.value })}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Input
                texto="Cônjuge"
                value={cadastro.conjuge}
                onChangeText={(text) => updateCadastro({ conjuge: text })}
            />

            <Dropdown
                placeholder="Grau de Instrução"
                data={[
                    { value: "1", label: "Alfabetizado" },
                    { value: "2", label: "Bacharelado" },
                    { value: "3", label: "Doutorado" },
                    { value: "4", label: "Especialização/Pós Graduação" },
                    { value: "5", label: "Fundamental (1°Grau) Completo" },
                    { value: "6", label: "Fundamental (1°Grau) Incompleto" },
                    { value: "7", label: "Médio (2°Grau) Completo" },
                    { value: "8", label: "Médio (2°Grau) Incompleto" },
                    { value: "9", label: "Mestrado" },
                    { value: "10", label: "Não Sabe Ler/Escrever" },
                    { value: "11", label: "Superior Completo" },
                    { value: "12", label: "Superior Incompleto" },
                ]}
                onChange={(item) => updateCadastro({ escolaridade: item.value })}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Dropdown
                placeholder="Situação*"
                data={[
                    { value: "Ativo", label: "Ativo" },
                    { value: "Em Tranferência", label: "Em Tranferência" },
                    { value: "Inativo", label: "Inativo" },
                ]}
                onChange={(item) => updateCadastro({ situacao: item.value })}
                onOpen={() => setScrollEnabled(false)}
                onClose={() => setScrollEnabled(true)}
            />

            <Input
                texto="Mãe"
                value={cadastro.mae}
                onChangeText={(text) => updateCadastro({ mae: text })}
            />

            <Input
                texto="Pai"
                value={cadastro.pai}
                onChangeText={(text) => updateCadastro({ pai: text })}
            />

            <Input
                texto="Celular"
                value={cadastro.telefone}
                onChangeText={(text) =>
                updateCadastro({ telefone: maskPhone(text) })
                }
                keyboardType="phone-pad"
            />

            {/* Avançar */}
            <TouchableOpacity
                className="w-[65%] h-[3%] bg-vermelho rounded-full items-center justify-center mt-4"
                onPress={() => navigation.navigate("Passo2")}
            >
                <Text className="text-white font-popLight text-[16px]">
                Avançar
                </Text>
            </TouchableOpacity>

            <Text className='font-popLight text-[13px] mt-[10%] mb-[10%]' onPress={() => navigation.navigate('Login')}>
                Já tem cadastro? Faça o login clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Login')}>aqui</Text>
            </Text>

        </ScrollView>
      </KeyboardAvoidingView>
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

function maskPhone(value) {
  // remove tudo que não for número
  let v = value.replace(/\D/g, "");

  // (11
  if (v.length > 0) {
    v = "(" + v;
  }

  // (11)
  if (v.length > 3) {
    v = v.slice(0, 3) + ") " + v.slice(3);
  }

  // (11) 98765-
  if (v.length > 10) {
    v = v.slice(0, 10) + "-" + v.slice(10, 14);
  }

  return v;
}

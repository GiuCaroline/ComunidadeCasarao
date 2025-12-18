import {
  View, Text, Image, KeyboardAvoidingView, ScrollView,
  Platform, TouchableOpacity
} from 'react-native';

import { Input } from '../../components/input';

import { useNavigation } from '@react-navigation/native';
import { useCadastro } from "../CadastroContext";

export function Passo2() {
    const navigation = useNavigation();
    const { cadastro, updateCadastro } = useCadastro();

    async function buscarCep(cep) {
        const cepLimpo = cep.replace(/\D/g, "");

        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
            );
            const data = await response.json();

            if (data.erro) return;

            updateCadastro({
            endereco: data.logradouro,
            bairro: data.bairro,
            uf: data.uf,
            cidade: data.localidade,
            });
        } catch (error) {
            console.log("Erro ao buscar CEP", error);
        }
    }


  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          contentContainerStyle={{ padding: 10, alignItems: 'center' }}
        >

            <Image
                source={require('../../../assets/images/logoPreto.png')}
                className="w-[50%] mt-[-10%]"
                resizeMode="contain"
            />

            <Text className="font-popMedium text-[22px] text-vermelho mt-[-15%] mb-[5%]">
                Cadastro
            </Text>

            <View className="w-[70%] flex-row items-center justify-between mb-[10%]">
        
                <View className="w-10 h-10 bg-vermelho rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-branco">1</Text>
                </View>

                <View className="flex-1 h-[4px] bg-vermelho" />

                <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho">2</Text>
                </View>

                <View className="flex-1 h-[4px] bg-input" />

                <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho/50">3</Text>
                </View>

            </View>

            <View className='w-full flex-row justify-between px-[10px]'>
                <Input 
                    texto="CEP"
                    value={cadastro.cep}
                    containerStyle={{ width: "45%" }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const cepFormatado = maskCep(text);
                        updateCadastro({ cep: cepFormatado });

                        if (cepFormatado.length === 9) {
                            buscarCep(cepFormatado);
                        }
                    }}
                />
                
                <Input texto='UF' 
                value={cadastro.uf}
                containerStyle={{
                    width: '45%',
                }}
                onChangeText={(text) => updateCadastro({ uf: text })} />
            </View>

            <Input
                texto='Endereço'
                value={cadastro.endereco}
                onChangeText={(text) => updateCadastro({ endereco: text })} 
            />

            <Input
                texto='Bairro'
                value={cadastro.bairro}
                onChangeText={(text) => updateCadastro({ bairro: text })}
            />

            <Input 
                texto='Cidade'
                value={cadastro.cidade}
                onChangeText={(text) => updateCadastro({ cidade: text })} 
            />

            <Input 
                texto='Número e Complemento'
                value={cadastro.complemento}
                onChangeText={(text) => updateCadastro({ complemento: text })} 
            />


            <View className='w-full flex-row justify-between px-[10px]  mt-[10%]'>        
                <TouchableOpacity
                    className="w-[35%] h-[40px] bg-vermelho rounded-full items-center justify-center"
                    onPress={() => navigation.navigate("Cadastro")}
                >
                    <Text className="text-white font-popLight text-[16px]">
                    Voltar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[35%] h-[40px] bg-vermelho rounded-full items-center justify-center"
                    onPress={() => navigation.navigate("Passo3")}
                >
                    <Text className="text-white font-popLight text-[16px]">
                    Avançar
                    </Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function maskCep(value) {
  let v = value.replace(/\D/g, "");

  if (v.length > 5) {
    v = v.slice(0, 5) + "-" + v.slice(5, 8);
  }

  return v;
}

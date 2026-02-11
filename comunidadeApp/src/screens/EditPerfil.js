import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Nav } from "../components/nav";
import { Input } from "../components/input";
import { Dropdown } from "../components/dropdown";
import { useCadastro } from "../screens/CadastroContext";
import { Eye, EyeSlash } from "phosphor-react-native";


export function EditPerfil() {
  const navigation = useNavigation();

    const { cadastro, updateCadastro, resetCadastro } = useCadastro();
  
    const [show, setShow] = useState(false);
    const [day, setDay] = useState(null);
    useEffect(() => {
        if (day?.dateString) {
            updateCadastro({ nascimento: day.dateString });
        }
    }, [day]);

    const [scrollEnabled, setScrollEnabled] = useState(true);

    const [mostrarSenha, setMostrarSenha] = useState(false);

    
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
     conjuge: "Teste de nome grande para ver",
     email: "teste@teste.com",
     endereco: "Rua dos bobos",
     bairro: "Vila Vitória",
     cep: "09111-231",
     uf: "SP",
     complemento: "Nenhum",
     membro: "Ago/2015",
     dtaBatismo: "19/10/2019",
     senha: "40028922"
    },
  ];

  
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
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-18%] mt-[-12%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Editar</Text>
          <Image
            source={require('../../assets/images/logoPreto.png')}
            className="w-[25%] "
            resizeMode="contain"
          />
      </View>


        <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
            <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 85 }} className='flex'
                scrollEnabled={scrollEnabled}
                >
                <View className='items-center'>
                <Input
                        texto="Nome"
                        value={usuario[0].nome}
                        onChangeText={(text) => updateCadastro({ nome: text })}
                    />

                    {/* Estado civil */}
                    <Dropdown
                        placeholder="Estado Civil"
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
                        onChange={(item) => updateCadastro({ estadoCivil: item.estadoCivil })}
                        onOpen={() => setScrollEnabled(false)}
                        onClose={() => setScrollEnabled(true)}
                    />

                    <Input
                        texto="Cônjuge"
                        value={usuario[0].conjuge}
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
                        texto="Celular"
                        value={usuario[0].celular}
                        onChangeText={(text) =>
                        updateCadastro({ telefone: maskPhone(text) })
                        }
                        keyboardType="phone-pad"
                    />
                    
                <View className='gap-2 items-center flex-row justify-between'>
                    <Text className='text-vermelho text-popRegular text-[18px]'>Endereço</Text>
                    <View className='w-[70%] h-[1px] bg-vermelho'></View>
                </View>

                    <View className='w-full flex-row justify-between px-[10px] mt-[7%]'>
                        <Input 
                            texto="CEP"
                            value={usuario[0].cep}
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
                        value={usuario[0].uf}
                        containerStyle={{
                            width: '45%',
                        }}
                        onChangeText={(text) => updateCadastro({ uf: text })} />
                    </View>
                    <Input
                        texto='Endereço'
                        value={usuario[0].endereco}
                        onChangeText={(text) => updateCadastro({ endereco: text })} 
                    />

                    <Input
                        texto='Bairro'
                        value={usuario[0].bairro}
                        onChangeText={(text) => updateCadastro({ bairro: text })}
                    />

                    <Input 
                        texto='Cidade'
                        value={usuario[0].cidade}
                        onChangeText={(text) => updateCadastro({ cidade: text })} 
                    />

                    <Input 
                        texto='Número e Complemento'
                        value={usuario[0].complemento}
                        onChangeText={(text) => updateCadastro({ complemento: text })} 
                    />

                    <View className='gap-2 items-center flex-row justify-between mb-[7%]'>
                        <Text className='text-vermelho text-popRegular text-[18px]'>Igreja</Text>
                        <View className='w-[78%] h-[1px] bg-vermelho'></View>
                    </View>

                    
                    <Input 
                        texto="Email"
                        value={usuario[0].email}
                        onChangeText={(text) => updateCadastro({ email: text })}
                    />

                    <View className="w-full items-center justify-center">
                        <Input
                            texto="Senha"
                            seguranca={!mostrarSenha}
                            value={usuario[0].senha}
                            onChangeText={(text) => updateCadastro({ senha: text })}
                        />

                        <View className='w-full relative mt-[-24%]'>
                            <TouchableOpacity
                                onPress={() => setMostrarSenha(!mostrarSenha)}
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: "90%",
                                    transform: [{ translateY: -12 }],
                                    zIndex: 10,
                                }}
                                activeOpacity={0.8}
                            >
                                {mostrarSenha ? (
                                <Eye size={24}  weight="light" className='text-placeInput dark:text-placeInput-dark'/>
                                ) : (
                                <EyeSlash size={24}  weight="light" className='text-placeInput dark:text-placeInput-dark' />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

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



function maskCep(value) {
  let v = value.replace(/\D/g, "");

  if (v.length > 5) {
    v = v.slice(0, 5) + "-" + v.slice(5, 8);
  }

  return v;
}
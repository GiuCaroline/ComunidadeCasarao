import {
  View, Text, Image, KeyboardAvoidingView, ScrollView,
  Platform, TouchableOpacity, StyleSheet, Modal
} from 'react-native';

import { Input } from '../../components/input';
import { Dropdown } from '../../components/dropdown';
import { Calendario } from '../../components/calendario';
import { AlertCustom } from '../../components/alert';
import { PlusCircleIcon, MinusCircleIcon } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { registerUser } from "../../services/authService";
import { useCadastro } from "../CadastroContext";
import { useColorScheme } from 'nativewind';


export function Passo3() {

    const navigation = useNavigation();
    const { cadastro, updateCadastro, resetCadastro } = useCadastro();
    const [cargos, setCargos] = useState([null]);
    const { colorScheme } = useColorScheme();

    const logo = colorScheme === 'dark'? require('../../../assets/images/logoBranco.png') : require('../../../assets/images/logoPreto.png') ;
    
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const [show, setShow] = useState(false);
    const [day, setDay] = useState(null);

    const [membroDay, setMembroDay] = useState(null);
    const [batismoDay, setBatismoDay] = useState(null);
    
    useEffect(() => {
    if (membroDay?.dateString) {
        updateCadastro({ membro: membroDay.dateString });
    }
    }, [membroDay]);

    useEffect(() => {
    if (batismoDay?.dateString) {
        updateCadastro({ batismo: batismoDay.dateString });
    }
    }, [batismoDay]);

    const [calMembroVisible, setCalMembroVisible] = useState(false);
    const [calBatismoVisible, setCalBatismoVisible] = useState(false);

    function validarCadastro() {
        if (!cadastro.email) return "Informe o e-mail.";
        if (!cadastro.senha || cadastro.senha.length < 6)
            return "A senha deve ter no mínimo 6 caracteres";


        return null;
    }

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: "",
        message: "",
        type: "error",
    });

    function showAlert(title, message, type = "error") {
        setAlertConfig({ title, message, type });
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    }

    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [termosVisible, setTermosVisible] = useState(false);
    
    function adicionarCargo() {
        if (cargos.length < 4) {
            setCargos([...cargos, null]);
        }
    }

    function atualizarCargo(index, valor) {
        const novosCargos = [...cargos];
        novosCargos[index] = valor;
        setCargos(novosCargos);

        updateCadastro({
            cargo: novosCargos[0] || "",
            cargo2: novosCargos[1] || "",
            cargo3: novosCargos[2] || "",
            cargo4: novosCargos[3] || "",
        });
    }

    function removerCargo(index) {
        const novosCargos = cargos.filter((_, i) => i !== index);

        const listaFinal = novosCargos.length ? novosCargos : [null];

        setCargos(listaFinal);

        updateCadastro({
            cargo: listaFinal[0] || "",
            cargo2: listaFinal[1] || "",
            cargo3: listaFinal[2] || "",
            cargo4: listaFinal[3] || "",
        });
    }

    async function handleConcluir() {
        if (!aceitouTermos) {
            showAlert("Atenção!", "Você precisa aceitar os Termos de Uso.", "warning");
            return;
        }

        const erro = validarCadastro();
        if (erro) {
            showAlert("Atenção", erro);
            return;
        }

        try {
            const data = await registerUser(cadastro);
            console.log("Cadastro enviado:", cadastro);

            showAlert("Sucesso", "Cadastro realizado com sucesso!", "success");

            setTimeout(() => {
                navigation.navigate("Login");
            }, 2000);

            await registerUser(cadastro);

            resetCadastro();

        } catch (error) {
            showAlert("Erro", error.error || "Erro no cadastro");
            console.log("erro:", error);
        }
    }

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
                source={logo}
                className="w-[50%] mt-[-10%]"
                resizeMode="contain"
            />

            <Text className="font-popMedium text-[22px] text-vermelho mt-[-15%] mb-[5%]">
                Cadastro
            </Text>

            <View className="w-[70%] flex-row items-center justify-between mb-[10%]">
        
                <View className="w-10 h-10 bg-vermelho rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-branco dark:text-preto-dark">1</Text>
                </View>

                <View className="flex-1 h-[4px] bg-vermelho" />

                <View className="w-10 h-10 bg-vermelho rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-branco dark:text-preto-dark">2</Text>
                </View>

                <View className="flex-1 h-[4px] bg-vermelho" />

                <View className="w-10 h-10 bg-input dark:bg-input-dark rounded-full items-center justify-center">
                    <Text className="font-popSemibold text-[15px] text-vermelho">3</Text>
                </View>

            </View>


            <View className='w-full pl-[5%]'>
                {cargos.map((cargo, index) => (
                    <View key={index} className="flex-row mb-2">
                        <View className="flex-1">
                            <Dropdown
                                placeholder={`Cargo ${index + 1}`}
                                data={[
                                    { value: "1", label: "Cooperador" },
                                    { value: "2", label: "Discipulador" },
                                    { value: "3", label: "Equipe de Intercessão" },
                                    { value: "4", label: "Funcionário" },
                                    { value: "5", label: "Líder de Departamento" },
                                    { value: "6", label: "Líder de GR" },
                                    { value: "7", label: "Líder de Ministério" },
                                    { value: "8", label: "Membro" },
                                    { value: "9", label: "Pastor" },
                                    { value: "10", label: "STAFF ILUMINAÇÃO" },
                                    { value: "11", label: "STAFF MÍDIA" },
                                    { value: "12", label: "STAFF PROJEÇÃO" },
                                    { value: "13", label: "STAFF SOM" },
                                    { value: "14", label: "STAFF VÍDEO" },
                                    { value: "15", label: "Visitante" },
                                ]}
                                onChange={(item) => atualizarCargo(index, item.value)}
                                onOpen={() => setScrollEnabled(false)}
                                onClose={() => setScrollEnabled(true)}
                            />
                        </View>

                        
                        {cargos.length > 1 && (
                            <TouchableOpacity onPress={() => removerCargo(index)}>
                                <MinusCircleIcon size={32} weight="fill" className="text-vermelho mt-2" />
                            </TouchableOpacity>
                        )}

                        {index === cargos.length - 1 && cargos.length < 4 &&  (
                            <TouchableOpacity onPress={adicionarCargo}>
                                <PlusCircleIcon size={32} weight="fill" className="text-vermelho mt-2" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
            

            <View className='flex flex-row justify-center items-baseline'>
                <Text className="text-[16px] font-popRegular text-placeInput dark:text-placeInput-dark w-[200px]">Membro Desde</Text>
                <TouchableOpacity className='bg-vermelho rounded-xl py-2 flex items-center w-[130px]' onPress={() => setCalMembroVisible(true)}>
                    <Text className='text-branco'>Selecionar Data</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={calMembroVisible} transparent animationType="fade">
                <Calendario day={membroDay} setDay={setMembroDay} close={() => setCalMembroVisible(false)} />
            </Modal>


            <View style={[styles.sombra]}
                className="bg-input dark:bg-input-dark rounded-xl flex px-4 justify-center w-[95%] h-[50px] mb-[10%]"
            >
                <Text className='text-preto dark:text-branco'>
                {membroDay?.dateString}
                </Text>
            </View>


            <View className='flex flex-row justify-center items-baseline'>
                <Text className="text-[16px] font-popRegular text-placeInput text-placeInput-dark w-[200px]">Data de Batismo</Text>
                <TouchableOpacity className='bg-vermelho rounded-xl py-2 flex items-center w-[130px]' onPress={() => setCalBatismoVisible(true)}>
                    <Text className='text-branco'>Selecionar Data</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={calBatismoVisible} transparent animationType="fade">
                <Calendario day={batismoDay} setDay={setBatismoDay} close={() => setCalBatismoVisible(false)} />
            </Modal>


            <View style={[styles.sombra]}
                className="bg-input dark:bg-input-dark rounded-xl flex px-4 justify-center w-[95%] h-[50px] mb-[10%]"
            >
                <Text className='text-preto dark:text-branco'>
                {batismoDay?.dateString}
                </Text>
            </View>

            <Input 
                texto="Email*"
                value={cadastro.email}
                onChangeText={(text) => updateCadastro({ email: text.toLowerCase().trim() })}
                keyboardType="email-address"
                autoCorrect={false}
            />

            <Input
                texto = 'Senha*' 
                seguranca={true}
                value={cadastro.senha}
                onChangeText={(text) => updateCadastro({ senha: text })}
            />

            <TouchableOpacity
                className="flex-row items-center mb-[10%] w-[90%]"
                activeOpacity={0.8}
                onPress={() => {
                    if (!aceitouTermos) {
                    setTermosVisible(true);
                    } else {
                    setAceitouTermos(false);
                    }
                }}
                >
                {/* Caixa do checkbox */}
                <View
                    className={`w-5 h-5 mr-3 rounded 
                    ${aceitouTermos ? 'bg-vermelho border-vermelho' : 'bg-input dark:bg-input-dark'}
                    items-center justify-center`} style={[styles.sombra]}
                >
                    {aceitouTermos && (
                        <Text className="text-branco text-[12px]">✓</Text>
                    )}
                </View>

                {/* Texto */}
                <Text className="font-popLight text-[14px] text-placeInput dark:text-placeInput-dark">
                    Li e aceito os{" "}
                    <Text className="text-vermelho underline" 
                        onPress={() => setTermosVisible(true)}
                    >
                    Termos de Uso
                    </Text>
                    *
                </Text>
            </TouchableOpacity>

            <View className='w-full flex-row justify-between px-[10px] mb-[5%]'>        
                <TouchableOpacity
                    className="w-[35%] h-[40px] bg-vermelho rounded-full items-center justify-center"
                    onPress={() => navigation.navigate("Passo2")}
                >
                    <Text className="text-white font-popLight text-[16px]">
                    Voltar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[35%] h-[40px] bg-vermelho rounded-full items-center justify-center"
                    onPress={handleConcluir}
                >
                    <Text className="text-white font-popLight text-[16px]">
                    Concluir
                    </Text>
                </TouchableOpacity>
            </View>

            <AlertCustom
                visible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />

            <Modal visible={termosVisible} transparent animationType="fade">
                <View className="flex-1 bg-black/60 items-center justify-center px-4">
                    
                    <View className="bg-branco rounded-2xl w-full max-h-[80%] p-4">

                    <Text className="font-popSemibold text-[18px] text-vermelho mb-3 text-center">
                        Termos de Uso
                    </Text>

                    <ScrollView className="mb-[5%]">
                        <Text className="font-popLight text-[14px] text-black leading-5">
                        Ao realizar seu cadastro, você concorda com o uso das informações
                        fornecidas para fins administrativos, organizacionais e de
                        comunicação interna da instituição.
                        {"\n\n"}
                        Seus dados não serão compartilhados com terceiros sem autorização,
                        exceto quando exigido por lei.
                        {"\n\n"}
                        É de sua responsabilidade manter suas informações atualizadas.
                        O uso indevido da plataforma pode resultar no bloqueio do acesso.
                        {"\n\n"}
                        Ao aceitar estes termos, você declara estar ciente e de acordo com
                        todas as condições descritas acima.
                        </Text>
                    </ScrollView>

                    <View className="flex-row justify-between">
                        <TouchableOpacity
                        className="w-[45%] h-[40px] border border-vermelho rounded-full items-center justify-center"
                        onPress={() => setTermosVisible(false)}
                        >
                        <Text className="text-vermelho font-popRegular">
                            Cancelar
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        className="w-[45%] h-[40px] bg-vermelho rounded-full items-center justify-center"
                        onPress={() => {
                            setAceitouTermos(true);
                            setTermosVisible(false);
                        }}
                        >
                        <Text className="text-branco font-popRegular">
                            Aceitar
                        </Text>
                        </TouchableOpacity>
                    </View>

                    </View>
                </View>
            </Modal>


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
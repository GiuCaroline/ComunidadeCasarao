import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, StyleSheet,
    Modal, 
 } from 'react-native';
import { Input } from '../components/input';
import { Calendario } from '../components/calendario'
import { Dropdown } from '../components/dropdown';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { GenderMale,GenderFemale } from "phosphor-react-native";

export function Cadastro() {
    const [day, setDay] = useState(null);

    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false); 
        if (selectedDate) {
        setDate(selectedDate);
        }
    };

    const [valor, setValor] = useState(null);

    const [calendarioVisible, setCalendarioVisible] = useState(false);

    const navigation = useNavigation();
    return(
        <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
            <View id='passo1'>
                <KeyboardAvoidingView 
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={{ padding: 20, alignItems:'center', }} className='flex'>
                        <Image
                            source={require('../../assets/images/logoPreto.png')}
                            className="w-[60%]  mt-[-10%]"
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
                                <Text className="font-popSemibold text-[15px] text-vermelho/60">2</Text>
                            </View>

                            <View className="flex-1 h-[4px] bg-input" />

                            <View className="w-10 h-10 bg-input rounded-full items-center justify-center">
                                <Text className="font-popSemibold text-[15px] text-vermelho/60">3</Text>
                            </View>

                        </View>
            
                        <Input texto = 'Nome*' seguranca={false}/>
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
                            className="bg-input rounded-xl flex px-4 justify-center w-[320px] h-[50px] mb-[10%]"
                            onPress={() => setShow(true)}
                        >
                            <Text>
                            {day?.dateString}
                            </Text>
                        </TouchableOpacity>


                    <View className='w-[310px]'>
                        <Text className="text-[16px] font-popRegular text-placeInput">
                        Sexo
                        </Text>
                    </View>

                    <View className='flex flex-row gap-9  mb-[10%]'>
                        <View className='flex flex-row items-center gap-2'>
                            <View style={[styles.sombra]} className="w-16 h-16 bg-input rounded-full items-center justify-center">
                                <GenderMale size={30} className="text-placeInput font-popSemibold"/>
                            </View>
                            <Text className='text-black font-popLight text-[16px]'>Masculino</Text>
                        </View>
                        
                        <View className='flex flex-row items-center gap-2'>
                            <View style={[styles.sombra]} className="w-16 h-16 bg-input rounded-full items-center justify-center">
                                <GenderFemale size={30} className="font-popSemibold text-[15px] text-placeInput"/>
                            </View>
                            <Text className='text-black font-popLight text-[16px]'>Feminino</Text>
                        </View>
                    </View>

                    <Input texto={'Estado Civil'} seguranca={false} />

                    <Dropdown
                        placeholder="Selecione"
                        data={[
                            { value: "1", label: "React Native" },
                            { value: "2", label: "Swift" },
                            { value: "3", label: "Kotlin" },
                        ]}
                        onChange={(item) => console.log(item)}
                    />



                    <Input texto={'Cônjuge'} seguranca={false} />


            
                    <TouchableOpacity 
                        className="w-[65%] h-[4%] bg-vermelho rounded-full items-center justify-center mt-2"
                        onPress={() => console.log('Clicou em Entrar')}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-popLight text-[16px]">
                        Entrar
                        </Text>
                    </TouchableOpacity>
                    
                    
                    <Text className='font-popLight text-[13px] mt-[20%] mb-[10%]' onPress={() => navigation.navigate('Login')}>
                        Já tem cadastro? Faça o login clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Login')}>aqui</Text>
                    </Text>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
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
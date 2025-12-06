import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from '../components/input';
import DatePickerPopup from "../components/data";

import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { GenderMale,GenderFemale } from "phosphor-react-native";
import RNPickerSelect from "react-native-picker-select";

export function Cadastro() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const [valor, setValor] = useState(null);

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
                    <Text className="text-[16px] font-popRegular text-placeInput w-[310px]">Data de Nascimento*</Text>

                    <TouchableOpacity style={[styles.sombra]}
                        className="bg-input rounded-xl flex px-4 justify-center w-[320px] h-[50px] mb-[10%]"
                        onPress={() => setShow(true)}
                    >
                        <Text>
                        {date.toLocaleDateString("pt-BR")}
                        </Text>
                    </TouchableOpacity>

                    {show && (
                        <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                        style="border-radius:20px;"
                        />
                    )}
                    
                <DatePickerPopup date={date} setDate={setDate} />

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

                <Input texto={'Cônjuge'} seguranca={false} />

                    <Text className="text-lg font-bold mb-2">Escolha uma opção:</Text>

                        <RNPickerSelect
                            onValueChange={(value) => setValor(value)}
                            placeholder={{ label: "Selecione...", value: null }}
                            items={[
                            { label: "Opção 1", value: "1" },
                            { label: "Opção 2", value: "2" },
                            { label: "Opção 3", value: "3" },
                            ]}
                            style={{
                            inputAndroid: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 10,
                                backgroundColor: "#fff",
                                fontSize: 16,
                            },
                            inputIOS: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 10,
                                backgroundColor: "#fff",
                                fontSize: 16,
                            },
                            }}
                        />

        
                <TouchableOpacity 
                    className="w-[65%] h-[6%] bg-vermelho rounded-full items-center justify-center mt-2"
                    onPress={() => console.log('Clicou em Entrar')}
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-popLight text-[16px]">
                    Entrar
                    </Text>
                </TouchableOpacity>
        
                <Text className='font-popLight text-[13px] mt-[25%]' onPress={() => navigation.navigate('Login')}>
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
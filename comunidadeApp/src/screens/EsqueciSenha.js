import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/input';

export function EsqueciSenha(){
  const navigation = useNavigation();
    return(
        <View className='flex-1 items-center bg-branco dark:bg-preto-dark'>
            <KeyboardAvoidingView 
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >
            <ScrollView contentContainerStyle={{ padding: 10, alignItems:'center', }} className='flex'>
                <Image
                    source={require('../../assets/images/logoPreto.png')}
                    className="w-[60%]  mt-[30%]"
                    resizeMode="contain"
                />
                <Text className="font-popMedium text-[22px] text-vermelho mt-[-10%] mb-[5%]">
                    Esqueci Senha
                </Text>

                <Text className='font-popLight mb-[10%] text-center'>
                    {`Iremos enviar um token de verificação no\n seu email como segurança.`}
                </Text>
    
    
                <View className='w-[350px] items-center'>
                    <Input texto = 'Email'/>
                </View>
    
                <TouchableOpacity 
                    className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2"
                    onPress={() => navigation.navigate('Inicio')}
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-popLight text-[16px]">
                        Entrar
                    </Text>
                </TouchableOpacity>
    
                <Text className='font-popLight text-[13px] mt-[7%]' onPress={() => navigation.navigate('Cadastro')}>
                Lembrou a senha? Volte pro login clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Login')}>aqui</Text>
                </Text>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
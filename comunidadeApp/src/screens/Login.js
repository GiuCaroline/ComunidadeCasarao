import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogo, FacebookLogo, InstagramLogo } from 'phosphor-react-native';

export function Login() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView contentContainerStyle={{ padding: 10, alignItems:'center', }} className='flex'>
          <Image
            source={require('../../assets/images/logoPreto.png')}
            className="w-[60%]  mt-[10%]"
            resizeMode="contain"
          />
          <Text className="font-popMedium text-[22px] text-vermelho mt-[-10%] mb-[10%]">
            Login
          </Text>

          <View className='w-[350px] items-center'>
            <Input texto = 'Email'/>
            <Input texto = 'Senha' seguranca={true}/>
          </View>

          <View className='w-[95%]'>
            <Text className="font-popLight text-[12px] text-placeInput mt-[-5%] mb-[10%]"
            onPress={() => navigation.navigate('EsqueciSenha')}>
              Esqueci minha senha
            </Text>
          </View>

          <TouchableOpacity 
            className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2 mt-2"
            onPress={() => navigation.navigate('Inicio')}
            activeOpacity={0.8}
          >
            <Text className="text-white font-popLight text-[16px]">
              Entrar
            </Text>
          </TouchableOpacity>

          <Text className='font-popLight mt-[10%] mb-[10%]'>
            - ou acesse por -
          </Text>

          <View className='flex flex-row gap-14'>
            <TouchableOpacity>
              <GoogleLogo size={30} color='#000' weight="light"/>
            </TouchableOpacity>

            
            <TouchableOpacity>
              <FacebookLogo size={30} color='#000' weight="light"/>
            </TouchableOpacity>

            
            <TouchableOpacity>
              <InstagramLogo size={30} color='#000' weight="light"/>
            </TouchableOpacity>
          </View>

          <Text className='font-popLight text-[13px] mt-[15%]' onPress={() => navigation.navigate('Cadastro')}>
            Não tem login? Faça o cadastro clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Cadastro')}>aqui</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
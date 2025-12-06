import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import '../components/input'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogo, FacebookLogo, InstagramLogo } from 'phosphor-react-native';

export function Login() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center bg-branco dark:bg-preto-dark">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 20, alignItems:'center', }} className='flex'>
          <Image
            source={require('../../assets/images/logoPreto.png')}
            className="w-[60%]  mt-[15%]"
            resizeMode="contain"
          />
          <Text className="font-popMedium text-[22px] text-vermelho mt-[-15px] mb-[10%]">
            Login
          </Text>

          <Input texto = 'Email' seguranca={false}/>
          <Input texto = 'Senha' seguranca={true}/>

          <View className='w-[310px]'>
            <Text className="font-popLight text-[12px] text-placeInput mt-[-15px] mb-[10%]"
            onPress={() => navigation.navigate('EsqueciSenha')}>
              Esqueci minha senha
            </Text>
          </View>

          <TouchableOpacity 
            className="w-[65%] h-[6%] bg-vermelho rounded-full items-center justify-center mt-2"
            onPress={() => console.log('Clicou em Entrar')}
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

          <Text className='font-popLight text-[13px] mt-[25%]'>
            Não tem login? Faça o cadastro clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Cadastro1')}>aqui</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogo, FacebookLogo, InstagramLogo } from 'phosphor-react-native';
import { useCadastro } from '../screens/CadastroContext';
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { AlertCustom } from '../components/alert';

export function Login() {
  const navigation = useNavigation();
  const { resetCadastro } = useCadastro();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
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


  async function handleLogin() {
    if (!email || !senha) {
      showAlert("Atenção", "Preencha email e senha");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, senha);

      login(data.user);

      showAlert("Sucesso", "Usuário logado!", "success");

      navigation.navigate("Inicio");

    } catch (error) {
      showAlert("Erro", error.error || "Erro no login");
    } finally {
      setLoading(false);
    }
  }

  function irParaCadastro() {
    resetCadastro();
    navigation.navigate('Cadastro');
  }

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
            <Input 
              texto="Email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input 
              texto="Senha"
              seguranca={true}
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View className='w-[95%]'>
            <Text className="font-popLight text-[12px] text-placeInput mt-[-5%] mb-[10%]"
            onPress={() => navigation.navigate('EsqueciSenha')}>
              Esqueci minha senha
            </Text>
          </View>

          <TouchableOpacity 
            className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2 mt-2"
            onPress={handleLogin}
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

          <Text className='font-popLight text-[13px] mt-[15%]' onPress={irParaCadastro}>
            Não tem login? Faça o cadastro clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Cadastro')}>aqui</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>


        <AlertCustom
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
            title={alertConfig.title}
            message={alertConfig.message}
            type={alertConfig.type}
        />
    </View>
  );
}
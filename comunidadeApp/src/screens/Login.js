import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogo, FacebookLogo, InstagramLogo } from 'phosphor-react-native';
import { useCadastro } from '../screens/CadastroContext';
import { useState, useEffect } from "react";
import { loginUser, loginGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { AlertCustom } from '../components/alert';
import { useColorScheme } from "nativewind";
import LoadingOverlay from '../components/loadingOverlay';

import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { resetCadastro } = useCadastro();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const { colorScheme } = useColorScheme();

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');

  const icon = colorScheme === 'dark' ? '#FAFAFA' : '#000';

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
      title: "",
      message: "",
      type: "error",
  });

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, 
  });


  async function handleFirebaseGoogleLogin(credential) {
    setIsLoading(true);
    try {
      const userCredential = await signInWithCredential(auth, credential);
      const userEmail = userCredential.user.email;

      const data = await loginGoogle(userEmail);

      login(data.user);
      showAlert("Sucesso", "Usuário logado!", "success");
      navigation.navigate("Inicio");

    } catch (error) {
      if (error.status === 404 || error.response?.status === 404) {
        showAlert("Aviso", "Conta não encontrada. Redirecionando...", "warning");
        irParaCadastro();
      } else {
        showAlert("Erro", "Erro ao autenticar com o Google");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;
        const credential = GoogleAuthProvider.credential(idToken);
        await handleFirebaseGoogleLogin(credential); 
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          showAlert("Erro", "Google Play Services indisponível");
        }
      } else {
        showAlert("Erro", "Erro ao autenticar com o Google");
      }
    }
  }

  function showAlert(title, message, type = "error") {
      setAlertConfig({ title, message, type });
      setAlertVisible(true);

      setTimeout(() => {
          setAlertVisible(false);
      }, 2500);
  }

  async function handleLogin() {
    setIsLoading(true);

    if (!email || !senha) {
      showAlert("Atenção!", "Preencha email e senha.", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, senha);

      login(data.user);

      showAlert("Sucesso", "Usuário logado!", "success");

      navigation.navigate("Inicio");

    } catch (error) {
      showAlert("Erro", error.error || "Erro no login");
    } finally {
      setIsLoading(false);
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
            source={logo}
            className="w-[60%] mt-[10%]"
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
            <Text className="font-popLight text-[12px] text-placeInput dark:text-placeInput-dark mt-[-5%] mb-[10%]"
            onPress={() => navigation.navigate('EsqueciSenha')}>
              Esqueci minha senha
            </Text>
          </View>

          <TouchableOpacity 
            className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text className="text-branco font-popLight text-[16px]">
              Entrar
            </Text>
          </TouchableOpacity>

          <View className='mt-[20%]'>
            <TouchableOpacity 
              className='flex-row items-center gap-1 border p-2 rounded-xl border-vermelho dark:border-vermelho-dark'
              onPress={handleGoogleLogin}
            >
              <GoogleLogo size={23} weight="light" color={icon} />
              <Text className='font-popLight text-[16px] text-preto dark:text-branco'> Acesse pelo Google</Text>
            </TouchableOpacity>
          </View>

          <Text className='font-popLight text-[13px] mt-[15%] text-preto dark:text-branco' onPress={irParaCadastro}>
            Não tem login? Faça o cadastro clicando <Text className='text-vermelho underline' onPress={() => navigation.navigate('Cadastro')}>aqui</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay visible={isLoading} />

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
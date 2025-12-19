import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';


import { useFonts,
   Poppins_200ExtraLight,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, 
    Poppins_600SemiBold_Italic,
    Poppins_500Medium, Poppins_600SemiBold,
    Poppins_700Bold } from '@expo-google-fonts/poppins';

import { Loading } from './src/screens/Loading';
import { Login } from './src/screens/Login';
import { EsqueciSenha } from './src/screens/EsqueciSenha';
import { CadastroProvider } from './src/screens/CadastroContext';
import { Passo1 } from './src/screens/Cadastro/Passo1';
import { Passo2 } from './src/screens/Cadastro/Passo2';
import { Passo3 } from './src/screens/Cadastro/Passo3';
import { Inicio } from './src/screens/Inicio';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <CadastroProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 1000 }}>
          
          <Stack.Screen name="Splash" component={Loading} />
          
          <Stack.Screen name="Login" component={Login}  
            options={{ animation: 'fade', animationDuration: 5000 }}
          />

          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />

          <Stack.Screen name="Cadastro" component={Passo1} />

          <Stack.Screen name="Passo2" component={Passo2} />

          <Stack.Screen name="Passo3" component={Passo3} />

          <Stack.Screen name="Inicio" component={Inicio} />
          
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </CadastroProvider>
  );
}
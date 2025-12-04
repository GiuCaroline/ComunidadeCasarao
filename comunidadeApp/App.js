import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';


import { useFonts, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { Loading } from './src/screens/Loading';
import { Login } from './src/screens/Login';
import { EsqueciSenha } from './src/screens/EsqueciSenha';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 1000 }}>
        
        <Stack.Screen name="Splash" component={Loading} />
        
        <Stack.Screen name="Login" component={Login}  
          options={{ animation: 'fade', animationDuration: 5000 }}
        />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
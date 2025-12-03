import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// IMPORTANTE: Note as chaves { } nas importações abaixo. 
// Isso corrige o erro "got: undefined".
import { Loading } from './src/screens/Loading';
import { Login } from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 5000 }}>
        
        {/* A primeira tela da lista é a que aparece primeiro */}
        <Stack.Screen name="Splash" component={Loading} />
        
        {/* Definimos o nome 'Login' para usar no navigation.replace('Login') */}
        <Stack.Screen name="Login" component={Login}  
          options={{ animation: 'fade', animationDuration: 5000 }}
        />
        
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
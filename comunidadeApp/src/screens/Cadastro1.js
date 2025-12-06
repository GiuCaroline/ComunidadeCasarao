import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function Cadastro1() {
  const navigation = useNavigation();
    return(
        <View className='flex justify-center items-center p-20'>
            <Text onPress={() => navigation.navigate('Login')}>Funciona novamente!</Text>
        </View>
    )
}
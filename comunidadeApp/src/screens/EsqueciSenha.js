import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function EsqueciSenha(){
  const navigation = useNavigation();
    return(
        <View className='flex justify-center items-center p-20'>
            <Text className='text-2xl font-popMedium text-vermelho'
            onPress={() => navigation.navigate('Login')}>
                Funciona!!
            </Text>
        </View>
    )
}
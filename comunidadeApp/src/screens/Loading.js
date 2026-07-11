import { useEffect } from 'react';
import { View, Image } from 'react-native';
import { awake } from '../services/authService';

export function Loading({ navigation }) {

  useEffect(() => {
    awake();
    const timer = setTimeout(() => {
      if (navigation) {
        navigation.replace('Login');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      
      <Image 
        source={require('../../assets/images/logoBranco.png')} 
        className="w-[50%]"
        resizeMode="contain"
      />

    </View>
  );
}
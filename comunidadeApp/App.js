import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-white text-2xl font-bold">
        Funciona! Atualiza na hora
      </Text>
      <Text className="text-gray-400 mt-2">
        Tailwind 3.3.2 + NativeWind
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
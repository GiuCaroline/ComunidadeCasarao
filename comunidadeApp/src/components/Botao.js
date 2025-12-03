import { Text, TouchableOpacity } from 'react-native';

export function Botao({ titulo, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full bg-blue-600 p-4 rounded-lg items-center mt-4"
      activeOpacity={0.7}
    >
      <Text className="text-white font-bold text-lg">
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}
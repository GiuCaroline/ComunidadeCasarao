import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

export function DetalhesEvento() {
  const route = useRoute();
  const { nome, data } = route.params;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">{nome}</Text>
      <Text className="mt-2">Data: {data}</Text>
    </View>
  );
}

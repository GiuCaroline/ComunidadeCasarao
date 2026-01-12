import { View, Text } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";

export function Galeria() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-branco">
      <View className="flex-1 justify-center items-center">
        <Text>Galeria</Text>
      </View>

      <Nav
        active="Galeria"
        onChange={(r) => navigation.navigate(r)} 
      />
    </View>
  );
}

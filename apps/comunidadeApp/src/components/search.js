import { View, TextInput, StyleSheet } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";

export function Search({ value, onChange }) {
  return (
    <View
      className="w-[95%] h-[45px] bg-input dark:bg-input-dark rounded-full flex-row items-center px-4"
      style={styles.shadow}
    >
    <TextInput
        placeholder="Pesquisar..."
        value={value}
        onChangeText={onChange}
        className="flex-1 font-popLight text-[15px] text-preto dark:text-branco"
        placeholderTextColor="#5e5e5e"
    />

    <MagnifyingGlass size={30} weight="light" classname='text-preto' />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  },
});
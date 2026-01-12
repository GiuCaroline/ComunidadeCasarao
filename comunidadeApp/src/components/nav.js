import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  House,
  ImagesSquare,
  GraduationCap,
  CalendarDots,
  User,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Nav({ active, onChange }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }, styles.sombra]}
      className="absolute bottom-0 w-full bg-branco flex-row justify-around py-[2%] items-center"
    >
      <Tab
        label="Cursos"
        active={active === "Cursos"}
        onPress={() => onChange("Cursos")}
        icon={GraduationCap}
      />

      <Tab
        label="Galeria"
        active={active === "Galeria"}
        onPress={() => onChange("Galeria")}
        icon={ImagesSquare}
      />

      <Pressable
        onPress={() => onChange("Inicio")}
        className="bg-preto w-14 h-14 rounded-full justify-center items-center "
      >
        <House size={26} weight="fill" color="#fff" />
      </Pressable>

      <Tab
        label="Agenda"
        active={active === "Agenda"}
        onPress={() => onChange("Agenda")}
        icon={CalendarDots}
      />

      <Tab
        label="Perfil"
        active={active === "Perfil"}
        onPress={() => onChange("Perfil")}
        icon={User}
      />
    </View>
  );
}

function Tab({ label, icon: Icon, active, onPress }) {
  return (
    <Pressable className="items-center justify-center" onPress={onPress}>
      {active && (
        <View className="absolute -top-2 w-full h-[3px] bg-preto rounded-full" />
      )}

      <Icon
        size={24}
        weight={active ? "fill" : "regular"}
        className="text-preto dark:text-branco"
      />

      <Text className="text-[12px] text-preto dark:text-branco font-popRegular">
        {label}
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 20,
    }
});
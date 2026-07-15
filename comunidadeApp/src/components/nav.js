import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  House,
  ImagesSquare,
  GraduationCap,
  CalendarDots,
  User,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

export function Nav({ active, onChange }) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#FAFAFA' : '#000000';
  const houseColor = colorScheme === 'dark' ? '#000000' : '#FAFAFA';

  return (
    <View
      style={[{ paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }, styles.sombra]}
      className="absolute bottom-0 w-full bg-branco dark:bg-preto-dark flex-row justify-around py-[2%] items-center"
    >
      <Tab
        label="Cursos"
        active={active === "Cursos"}
        onPress={() => onChange("Cursos")}
        icon={GraduationCap}
        color={iconColor}
      />

      <Tab
        label="Galeria"
        active={active === "Galeria"}
        onPress={() => onChange("Galeria")}
        icon={ImagesSquare}
        color={iconColor}
      />

      <Pressable
        onPress={() => onChange("Inicio")}
        className="bg-preto dark:bg-branco w-14 h-14 rounded-full justify-center items-center "
      >
        <House size={26} weight="fill" color={houseColor} />
      </Pressable>

      <Tab
        label="Agenda"
        active={active === "Agenda"}
        onPress={() => onChange("Agenda")}
        icon={CalendarDots}
        color={iconColor}
      />

      <Tab
        label="Perfil"
        active={active === "Perfil"}
        onPress={() => onChange("Perfil")}
        icon={User}
        color={iconColor}
      />
    </View>
  );
}

function Tab({ label, icon: Icon, active, onPress, color }) {
  return (
    <Pressable className="items-center justify-center" onPress={onPress}>
      {active && (
        <View className="absolute -top-2 w-full h-[3px] bg-preto dark:bg-branco rounded-full" />
      )}

      <Icon
        size={24}
        weight={active ? "fill" : "light"}
        color={color}
      />

      <Text className="text-[11px] text-preto dark:text-branco font-popRegular">
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
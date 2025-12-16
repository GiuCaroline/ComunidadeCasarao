import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GenderMale, GenderFemale } from "phosphor-react-native";

export function MascFem({ onChange }) {
  const [selected, setSelected] = useState(null); // "M" | "F"

  const selectMale = () => {
    setSelected("M");
    onChange && onChange("M");
  };

  const selectFemale = () => {
    setSelected("F");
    onChange && onChange("F");
  };

  return (
    <View>
      <View className="w-[310px]">
        <Text className="text-[16px] font-popRegular text-placeInput">
          Sexo
        </Text>
      </View>

      <View className="flex flex-row gap-9 mb-[10%]">
        {/* Masculino */}
        <TouchableOpacity
          onPress={selectMale}
          activeOpacity={0.8}
          className="flex flex-row items-center gap-2"
        >
          <View
            className='w-[64px] h-[64px] rounded-full bg-input items-center justify-center'
            style={[
              styles.sombra,
              selected === "M" && styles.activeMale
            ]}
          >
            <GenderMale
              size={30}
              color={selected === "M" ? "#2E9AFF" : "#5e5e5e"}
            />
          </View>

          <Text className="text-black font-popLight text-[16px]">
            Masculino
          </Text>
        </TouchableOpacity>

        {/* Feminino */}
        <TouchableOpacity
          onPress={selectFemale}
          activeOpacity={0.8}
          className="flex flex-row items-center gap-2"
        >
          <View
            className='w-[64px] h-[64px] rounded-full bg-input items-center justify-center'
            style={[
              styles.sombra,
              selected === "F" && styles.activeFemale
            ]}
          >
            <GenderFemale
              size={30}
              color={selected === "F" ? "#C700A2" : "#5e5e5e"}
            />
          </View>

          <Text className="text-black font-popLight text-[16px]">
            Feminino
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeMale: {
    backgroundColor: "#BCCFFF", // azul
  },
  activeFemale: {
    backgroundColor: "#FFBDF1", // rosa
  },
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});

import { View, Text, TouchableOpacity } from "react-native";

export function DayCell({ day, onPress, markers = [], isSelected }) {
  if (!day) {
    return <View className="w-[14.28%] h-[60px]" />;
  }

  return (
    <TouchableOpacity
      className={`w-[14.28%] h-[60px] items-center justify-center rounded-lg ${
        isSelected ? "bg-vermelho/20" : ""
      }`}
      onPress={onPress}
    >
      <Text className="text-[14px] font-popLight text-preto dark:text-branco">
        {day}
      </Text>

      <View className="flex-row w-[90%] justify-center mt-1">
        {markers.map((color, index) => (
          <View
            key={index}
            className="flex-1 max-w-[12px] h-[2px] rounded-full mx-[1px]"
            style={{ backgroundColor: color }}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}
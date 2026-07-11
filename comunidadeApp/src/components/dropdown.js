import { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
} from "react-native";
import { CaretUp, CaretDown } from "phosphor-react-native";

export function Dropdown({
  data = [],
  value: externalValue,
  onChange,
  placeholder,
  onOpen,
  onClose,
  containerStyle,
}) {
  const [expanded, setExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const value = externalValue !== undefined ? externalValue : internalValue;
  const selectedItem = data.find((item) => item.value == value);

  const isActive = expanded || !!selectedItem;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const labelTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [13, -16],
  });

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 14],
  });

  const openDropdown = () => {
    onOpen && onOpen();
    setExpanded(true);
  };

  const closeDropdown = () => {
    onClose && onClose();
    setExpanded(false);
  };

  const onSelect = (item) => {
    if (externalValue === undefined) {
      setInternalValue(item.value);
    }
    onChange && onChange(item);
    closeDropdown();
  };

  return (
    <View>
      <View
        style={[styles.sombra, containerStyle]}
        className="bg-input dark:bg-input-dark rounded-xl w-[95%] h-[50px] mb-[9%]"
      >
        <Animated.Text
          style={{
            position: "absolute",
            left: 16,
            top: labelTop,
            fontSize: labelSize,
            fontFamily: isActive ? "Poppins_300Light" : "Poppins_400Regular",
            zIndex: 1,
          }}
          className="text-placeInput dark:text-placeInput-dark"
        >
          {placeholder}
        </Animated.Text>

        <TouchableOpacity
          className="h-full px-4 flex-row justify-between items-center"
          onPress={expanded ? closeDropdown : openDropdown}
          activeOpacity={0.8}
        >
          <Text className="font-popRegular text-[16px] text-preto dark:text-branco">
            {selectedItem?.label || ""}
          </Text>

          {expanded ? (
            <CaretUp size={22} className="text-placeInput dark:text-placeInput-dark" />
          ) : (
            <CaretDown size={22} className="text-placeInput dark:text-placeInput-dark" />
          )}
        </TouchableOpacity>
      </View>

      {expanded && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDropdown} />

          <View
            className="absolute top-[52px] w-[95%] bg-input dark:bg-input-dark max-h-[300px] rounded-xl p-[10px] z-[999]"
            style={[styles.sombra]}
          >
            <ScrollView showsVerticalScrollIndicator>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className="h-[45px] justify-center"
                  onPress={() => onSelect(item)}
                  activeOpacity={0.8}
                >
                  <Text className="text-placeInput dark:text-placeInput-dark font-popRegular text-[16px]">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});
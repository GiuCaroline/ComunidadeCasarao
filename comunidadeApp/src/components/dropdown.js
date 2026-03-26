import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable, ScrollView 
} from "react-native";
import { CaretUp, CaretDown } from "phosphor-react-native";

export function Dropdown({
  data = [],
  value: externalValue,
  onChange,
  placeholder,
  onOpen,
  onClose
}) {
  const [expanded, setExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const value = externalValue !== undefined ? externalValue : internalValue;

  const selectedItem = data.find(item => item.value == value);

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
      <TouchableOpacity
        style={[styles.sombra]}
        className='h-[48px] bg-input dark:bg-input-dark rounded-xl px-[15px] flex-row justify-between items-center w-[95%] mb-[9%]'
        onPress={expanded ? closeDropdown : openDropdown}
        activeOpacity={0.8}
      >
        <Text className='text-placeInput dark:text-placeInput-dark font-popRegular text-[16px]'>
          {selectedItem?.label || placeholder}
        </Text>

        {expanded ? <CaretUp size={22} className='text-placeInput dark:text-placeInput-dark'/> : <CaretDown size={22}  className='text-placeInput dark:text-placeInput-dark'/>}
      </TouchableOpacity>

      {expanded && (
        <>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeDropdown}
          />

          <View className='absolute top-[52px] w-[95%] bg-input dark:bg-input-dark max-h-[300px] rounded-xl p-[10px] z-[999]'
            style={[styles.sombra]}>
            <ScrollView showsVerticalScrollIndicator>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className='h-[45px] justify-center'
                  onPress={() => onSelect(item)}
                  activeOpacity={0.8}
                >
                  <Text className='text-placeInput dark:text-placeInput-dark font-popRegular text-[16px]'>
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

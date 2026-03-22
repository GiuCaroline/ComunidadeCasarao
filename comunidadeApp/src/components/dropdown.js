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
  onChange,
  placeholder,
  onOpen,
  onClose
}) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");

  const openDropdown = () => {
    onOpen && onOpen();
    setExpanded(true);
  };

  const closeDropdown = () => {
    onClose && onClose();
    setExpanded(false);
  };

  const onSelect = (item) => {
    setValue(item.label);
    onChange && onChange(item);
    closeDropdown();
  };

  return (
    <View>
      <TouchableOpacity
        style={[ styles.sombra]}
        className='h-[48px] bg-input rounded-xl px-[15px] flex-row justify-between items-center w-[95%] mb-[9%]'
        onPress={expanded ? closeDropdown : openDropdown}
        activeOpacity={0.8}
      >
        <Text className='text-placeInput font-popRegular text-[16px]'>
          {value || placeholder}
        </Text>
        {expanded ? <CaretUp size={22} /> : <CaretDown size={22} />}
      </TouchableOpacity>

      {expanded && (
        <>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeDropdown}
          />

          <View className='absolute top-[52px] w-[95%] bg-input max-h-[300px] rounded-xl p-[10px] z-[999]'
           style={[styles.sombra]}>
            <ScrollView
              showsVerticalScrollIndicator
              >
               {data.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className='h-[45px] justify-center'
                  onPress={() => onSelect(item)}
                  activeOpacity={0.8}
                >
                  <Text className='text-placeInput font-popRegular text-[16px]'>{item.label}</Text>
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

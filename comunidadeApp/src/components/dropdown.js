import React, { useCallback, useState } from "react";
import {
  Modal,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { CaretUp, CaretDown } from "phosphor-react-native";

export function Dropdown({ data = [], onChange, placeholder }) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [top, setTop] = useState(0);

  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const onSelect = useCallback(
    (item) => {
      setValue(item.label);
      onChange && onChange(item);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const height = layout.height;

        const finalValue =
          topOffset +
          height +
          (Platform.OS === "android" ? -32 : 3);

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={[styles.button, styles.sombra]}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>
          {value || placeholder}
        </Text>
        {expanded ? <CaretUp size={18} className='text-placeInput'/> : <CaretDown size={18} className='text-placeInput'/>}
      </TouchableOpacity>

      <Modal visible={expanded} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
          <View style={styles.overlay}>
            <View style={[styles.dropdown, styles.sombra, { top }]}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => onSelect(item)}
                    activeOpacity={0.8}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "92%",
  },
  text: {
    fontSize: 16,
    color: "#5e5e5e",
    fontFamily: "Poppins_400Regular",
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
  position: "absolute",
  top: 52,
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: 12,
  padding: 10,
  maxHeight: 250,
  zIndex: 999,
},
  item: {
    height: 45,
    justifyContent: "center",
  },
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});

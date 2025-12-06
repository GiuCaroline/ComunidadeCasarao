import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePickerPopup({ date, setDate }) {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View>
      {/* CAMPO */}
      <TouchableOpacity
        className="border p-3 bg-white rounded-xl"
        onPress={() => setShow(true)}
      >
        <Text>{date.toLocaleDateString("pt-BR")}</Text>
      </TouchableOpacity>

      {/* POPUP */}
      <Modal visible={show} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-11/12">
            <Text className="text-lg font-semibold mb-4 text-center">
              Selecione a data
            </Text>

            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
            />

            <TouchableOpacity
              className="bg-blue-600 p-3 rounded-xl mt-4"
              onPress={() => setShow(false)}
            >
              <Text className="text-white text-center font-bold" onPress={() => setShow(false)}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function toDateObj(dateString) {
  if (!dateString) return null;
  const dataSemHora = dateString.split("T")[0];
  const [y, m, d] = dataSemHora.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatarBR(dateString) {
  if (!dateString) return "";
  const dataSemHora = dateString.split("T")[0];
  const [y, m, d] = dataSemHora.split("-");
  return `${d}/${m}/${y}`;
}

export function DateField({ label, value, onChange, maximumDate, minimumDate }) {
  const [showPicker, setShowPicker] = useState(false);

  function handleChangeNative(event, selectedDate) {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "dismissed") return;
    }
    if (selectedDate) {
      onChange(toDateString(selectedDate));
    }
  }

  return (
    <View className='w-full items-center'>
      <View className='flex flex-row justify-center items-baseline'>
        <Text className="text-[16px] font-popRegular text-placeInput dark:text-placeInput-dark w-[200px]">
          {label}
        </Text>
        <TouchableOpacity
          className='bg-vermelho rounded-xl py-2 flex items-center w-[130px]'
          onPress={() => setShowPicker(true)}
        >
          <Text className='text-branco font-popRegular text-[13px]'>Selecionar Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sombra} className="bg-input dark:bg-input-dark rounded-xl flex px-4 justify-center w-[95%] h-[50px] mb-4 mt-2">
        <Text className='text-preto dark:text-branco font-popRegular'>{formatarBR(value)}</Text>
      </View>

      {showPicker && (
        <DateTimePicker
          value={toDateObj(value) || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChangeNative}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          locale="pt-BR"
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <TouchableOpacity onPress={() => setShowPicker(false)} className="mt-2">
          <Text className="text-vermelho font-popSemibold">Confirmar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  }
});
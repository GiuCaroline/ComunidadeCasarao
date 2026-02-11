import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CaretLeft, CaretRight } from "phosphor-react-native";

const months = [
  "Jan","Fev","Mar","Abr","Maio","Jun",
  "Jul","Ago","Set","Out","Nov","Dez"
];

export function MonthHeader({ month, year, setMonth, setYear }) {

  function handlePrev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function handleNext() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <View style={styles.container} className="flex-row justify-between items-center bg-input dark:bg-input-dark rounded-full px-3 w-[80%]">
      <TouchableOpacity onPress={handlePrev}>
        <CaretLeft size={24} className='text-preto dark:text-branco' />
      </TouchableOpacity>

      <Text className='font-popLight text-[15px] bg-vermelho rounded-full px-6 py-3 text-branco'>
        {months[month]}
      </Text>

      <TouchableOpacity onPress={handleNext}>
        <CaretRight size={24} className='text-preto dark:text-branco' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginVertical:20
  },
});

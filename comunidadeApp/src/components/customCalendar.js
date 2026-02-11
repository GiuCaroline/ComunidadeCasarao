import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CaretLeft, CaretRight } from "phosphor-react-native";
import { generateCalendar } from "../utils/calendarUtils";
import { DayCell } from "./dayCell";

const monthsName = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function CustomCalendar({
  month,
  year,
  setMonth,
  setYear,
  onSelectDay,
  events = {}
}) {

  const days = generateCalendar(month, year);

  return (
    <View className='mt-[5%]'>
      <View className='flex-row items-center mb-[3%] ml-[5%]'>
        <Text className='font-popRegular text-preto dark:text-branco text-base'>
          {monthsName[month]} {year}
        </Text>
      </View>

      <View style={styles.sombra} className='bg-input dark:bg-input-dark mx-[5%] rounded-[20px] p-2'>
        {/* Calendário */}
        {/* Dias da semana */}
        <View className="flex-row justify-between mb-2">
          {weekDays.map((day, index) => (
            <Text
              key={index}
              className="w-[14.28%] text-center text-[12px] font-popSemibold text-preto daark:text-branco mt-[2%]"
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {days.map((day, index) => {

            if (!day) {
              return <View key={index} style={styles.empty} />;
            }

            const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const markers = events[dateKey] || [];

            return (
              <DayCell
                key={index}
                day={day}
                onPress={() => onSelectDay(dateKey)}
                markers={markers}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  empty:{
    width:"14.2%",
    height:60
  },
  sombra: {
    // iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    // Android
    elevation: 6,
  }
});

import { View, TouchableOpacity, StyleSheet, Text, Modal, FlatList } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { CaretLeft, CaretRight } from "phosphor-react-native"
import { ptBr } from '../utils/localeCalendarConfig'
import { useState } from "react";

LocaleConfig.locales["pt-br"] = ptBr
LocaleConfig.defaultLocale = "pt-br"

export function Calendario({ day, setDay, close }){
    const [yearPickerVisible, setYearPickerVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    return(
        <View className='flex justify-center items-center' style={styles.modalBackground}>
            <View style={styles.modalBoxCalendar}>
                <TouchableOpacity className='mb-[5%] bg-[#BB1C00] rounded-xl py-2 flex items-center w-[150px]' onPress={() => setYearPickerVisible(true)}>
                    <Text className='text-[#fafafa]'>Selecionar Ano</Text>
                </TouchableOpacity>

                <Calendar style={styles.calendar}
                    key={selectedYear}                      // <- força remount quando muda o ano
                    current={`${selectedYear}-01-01`}
                    onMonthChange={(month) => setSelectedYear(month.year)}
                    renderArrow={( direction ) => (direction == "left"? <CaretLeft className='text-black' size={20}/> 
                    : <CaretRight className='text-black' size={20}/>)}
                    theme={{
                        textMonthFontSize: 16,
                        monthTextColor: '#000',
                        textMonthFontFamily: "Poppins_300Light",
                        todayTextColor: '#BB1C00',
                        selectedDayBackgroundColor: '#BB1C00',
                        selectedDayTextColor: '#fafafa',
                        arrowColor: '#000',
                        calendarBackground: 'transparent',
                        textDayStyle: { color: '#000' },
                        arrowStyle: {
                            margin: 0,
                            padding: 0,
                        }
                    }}
                    onDayPress={(date) => {setDay(date); close();}}
                    hideExtraDays
                    markedDates={day &&{
                        [day.dateString]: { selected : true },
                    }}
                    dayComponent={({ date, state }) => {
                        const isSelected = day?.dateString === date.dateString;
                        return(
                            <TouchableOpacity 
                    onPress={() => {setDay(date);setTimeout(close, 150);}}    
                    style={[
                                styles.day,
                                isSelected && styles.daySelected
                                ]}>
                                <Text style={[
                                    styles.daytext,
                                    state === "today" && styles.today,
                                    isSelected && styles.daytextSelected,
                                    ]}
                                    >{date.day}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
             {yearPickerVisible && (
                <Modal transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                    <FlatList
                        data={Array.from({ length: 80 }, (_, i) => 2020 - i)}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                            setSelectedYear(item);
                            setYearPickerVisible(false);
                            }}
                            style={styles.yearItem}
                        >
                            <Text style={{ fontSize: 18 }}>{item}</Text>
                        </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: 'transparent',
    },
    daytext:{
        color: '#000',
        fontFamily: "Poppins_300Light" ,
    },
    day: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    today: {
        color: '#BB1C00',
        fontFamily: "Poppins_500Medium" ,
    },
    daySelected:{
        borderBottomColor: '#BB1C00',
        borderBottomWidth: 2,
        height: 'auto',

    },
    daytextSelected: {
        fontFamily: "Poppins_500Medium",
        paddingBottom: 0,   
    },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 250,
    height: 350,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  yearItem: {
    padding: 15,
    alignItems: "center",
  },
  modalBoxCalendar: {
    width: 300,
    height: 450,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 10,
  },
});





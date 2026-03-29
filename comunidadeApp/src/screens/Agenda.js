import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { MonthHeader } from "../components/monthHeader";
import { CustomCalendar } from "../components/customCalendar";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { CalendarDots, Paperclip, PencilSimple } from "phosphor-react-native";
import { useColorScheme } from "nativewind";
import { getEventos } from "../services/authService";

export function Agenda(){
  const navigation = useNavigation();
  const today = new Date();
  const { colorScheme } = useColorScheme();

    const logo = colorScheme === 'dark' 
    ? require('../../assets/images/logoBranco.png') 
    : require('../../assets/images/logoPreto.png');

  const [month,setMonth] = useState(today.getMonth());
  const [year,setYear] = useState(today.getFullYear());
  const [selected,setSelected] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function carregarEventos() {
      try {
        const data = await getEventos();
        setEventos(data.eventos);
      } catch (error) {
        console.log(error);
      }
    }
    carregarEventos();
  }, []);

  const eventsByDate = eventos.reduce((acc, event) => {
    if (!event || !event.dia1) return acc;

    if (!acc[event.dia1]) {
        acc[event.dia1] = [];
    }
    acc[event.dia1].push(event.color);
    return acc;
  }, {});

  const filteredEvents = selected
    ? eventos.filter(event => event && event.dia1 === selected)
    : eventos.filter(event => {
        if (!event || !event.dia1) return false;

        return event.dia1.startsWith(
            `${year}-${String(month + 1).padStart(2, "0")}`
        );
    }
  );

  return(
    <View className="flex-1 bg-branco dark:bg-preto-dark">
        <View className='w-full flex-row justify-between items-center px-[4%] mb-[-25%] mt-[-12%]'>
            <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Agenda</Text>
            <Image
            source={logo}
            className="w-[25%] "
            resizeMode="contain"
            />
        </View>
        <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 125 }} className='flex'>

            <View className='items-center'>
                <MonthHeader
                    month={month}
                    year={year}
                    setMonth={setMonth}
                    setYear={setYear}
                />
            </View>

            <CustomCalendar
                month={month}
                year={year}
                selected={selected} 
                onSelectDay={(date) => {
                    if (selected === date) {
                    setSelected(null); 
                    } else {
                    setSelected(date);
                    }
                }}
                events={eventsByDate}
            />

            <View className='mt-[5%] px-[3%]'>
                <View className='mt-[5%] px-[3%]'>

                    {filteredEvents.map((event) => (

                        <View
                        key={event.id}
                        className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[4%] mt-[4%] shadow-md flex-row items-start'
                        >

                        <CalendarDots
                            size={26}
                            color={event.color}
                            weight="light"
                        />

                        <View className='flex-1 ml-[3%]'>

                            <View className='flex-row justify-between items-center'>
                                <Text className='font-popRegular text-[16px] text-preto dark:text-branco'>
                                    {event.title}
                                </Text>

                                <Text className='font-popLight text-[14px] text-preto dark:text-branco'>
                                    {event.time}
                                </Text>
                                </View>

                                <Text className='font-popLight text-[14px] text-preto dark:text-branco mt-[2%]'>
                                Dia {event.date.split("-").reverse().join("/")}
                                </Text>

                            </View>

                        </View>

                    ))}

                    {filteredEvents.length === 0 && (
                        <Text className="text-center text-cinza mt-[10%] font-popLight">
                        Nenhum evento encontrado
                        </Text>
                    )}

                </View>
            </View>

        </ScrollView>

        <Nav
            active="Agenda"
            onChange={(r) => navigation.navigate(r)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
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
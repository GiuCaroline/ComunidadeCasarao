import {  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MonthHeader } from "../components/monthHeader";
import { CustomCalendar } from "../components/customCalendar";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { IdentificationCard, Paperclip, PencilSimple  } from "phosphor-react-native";

export function Agenda(){

  const navigation = useNavigation();
  const today = new Date();

  const [month,setMonth] = useState(today.getMonth());
  const [year,setYear] = useState(today.getFullYear());
  const [selected,setSelected] = useState(null);

  // MOCK de eventos
  const events = {
    "2026-02-11":["#BB1C00"],
    "2026-02-07":["#BB1C00","#16A34A"]
  };

  return(
    <View className="flex-1 bg-branco dark:bg-preto-dark">
        <View className='w-full flex-row justify-between items-center px-[4%] mb-[-25%] mt-[-12%]'>
            <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Agenda</Text>
            <Image
            source={require('../../assets/images/logoPreto.png')}
            className="w-[25%] "
            resizeMode="contain"
            />
        </View>
        <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 85 }} className='flex'>

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
                onSelectDay={(date)=> setSelected(date)}
                events={events}
            />
        </ScrollView>

        <Nav
            active="Agenda"
            onChange={(r) => navigation.navigate(r)}
        />
    </View>
  )
}

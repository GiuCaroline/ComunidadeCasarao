import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { MonthHeader } from "../components/monthHeader";
import { CustomCalendar } from "../components/customCalendar";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { CalendarDots, Paperclip, PencilSimple } from "phosphor-react-native";
import { useColorScheme } from "nativewind";
import { getEventos } from "../services/authService";
import LoadingOverlay from '../components/loadingOverlay';

export function Agenda(){
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const today = new Date();
  const { colorScheme } = useColorScheme();

    function formatarData(data) {
        if (!data) return "";

        if (typeof data === "string") {
            const datePart = data.split("T")[0];
            const partes = datePart.split("-");
            if (partes.length === 3) {
                return `${partes[2]}/${partes[1]}/${partes[0]}`;
            }
        }

        const d = new Date(data);

        return d.toLocaleDateString("pt-BR");
    }

    const logo = colorScheme === 'dark' 
    ? require('../../assets/images/logoBranco.png') 
    : require('../../assets/images/logoPreto.png');

  const [month,setMonth] = useState(today.getMonth());
  const [year,setYear] = useState(today.getFullYear());
  const [selected,setSelected] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function carregarEventos() {
        setIsLoading(true);
      try {
        const data = await getEventos();
        const eventosNormalizados = [];
        if (data.eventos) {
          data.eventos.forEach(evento => {
            const horariosDoDia = [evento.horario1, evento.horario2].filter(Boolean);

            if (evento.dia1) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia1,
                horariosExibicao: horariosDoDia
              });
            }
            if (evento.dia2 && evento.dia2 !== evento.dia1) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia2,
                horariosExibicao: horariosDoDia
              });
            }
            if (evento.dia3 && evento.dia3 !== evento.dia1 && evento.dia3 !== evento.dia2) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia3,
                horariosExibicao: horariosDoDia
              });
            }
          });
        }
        setEventos(eventosNormalizados);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        }
    }
    carregarEventos();
  }, []);

  const eventsByDate = eventos.reduce((acc, event) => {
    if (!event || !event.diaExibicao) return acc;

    if (!acc[event.diaExibicao]) {
        acc[event.diaExibicao] = [];
    }
    acc[event.diaExibicao].push(event.color);
    return acc;
  }, {});

  const filteredEvents = selected
    ? eventos.filter(event => event && event.diaExibicao === selected)
    : eventos.filter(event => {
        if (!event || !event.diaExibicao) return false;

        return event.diaExibicao.startsWith(
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

                    {filteredEvents.map((event, index) => (
                        <View
                            key={`${event.id}-${index}`}
                            className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[4%] mt-[4%] shadow-md flex-row items-start'
                        >
                            <CalendarDots
                                size={26}
                                color={event?.color}
                                weight="light"
                            />
                            <View className='flex-1 ml-[3%]'>
                                <View className='flex-row justify-between items-center'>
                                    <Text className='font-popRegular text-[16px] text-preto dark:text-branco'>
                                        {event?.nomeEvento}
                                    </Text>
                                    <View className="items-end flex-row gap-2">
                                        {event?.horariosExibicao?.map((horario, idx) => (
                                            <Text key={idx} className="font-popLight text-[14px] text-preto dark:text-branco">
                                                {horario}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                                <Text className='font-popLight text-[14px] text-preto dark:text-branco mt-[2%]'>
                                    Dia {formatarData(event?.diaExibicao)}
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
        
        <LoadingOverlay visible={isLoading} />
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
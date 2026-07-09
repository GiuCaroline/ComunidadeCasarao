import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { MonthHeader } from "../components/monthHeader";
import { CustomCalendar } from "../components/customCalendar";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { CalendarDots, UserCircle } from "phosphor-react-native";
import { useColorScheme } from "nativewind";
import { getEventos, getEscalas } from "../services/authService";
import LoadingOverlay from '../components/loadingOverlay';

export function Agenda() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const today = new Date();
  const { colorScheme } = useColorScheme();

  const logo = colorScheme === 'dark'
    ? require('../../assets/images/logoBranco.png')
    : require('../../assets/images/logoPreto.png');

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState(null);

  const [eventosBase, setEventosBase] = useState([]);
  const [agendaBase, setAgendaBase] = useState([]);
  const [canceladosBase, setCanceladosBase] = useState([]);
  const [escalasBase, setEscalasBase] = useState([]);
  
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventsByDate, setEventsByDate] = useState({});

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      
      try {
        const evData = await getEventos();
        setEventosBase(evData.eventos || []);
        setAgendaBase(evData.agenda || []);
        setCanceladosBase(evData.cancelados || []);
      } catch (error) {
        console.log(error);
      }

      try {
        const escData = await getEscalas().catch(() => null);
        let arrayEscalas = [];
        
        if (escData) {
          if (Array.isArray(escData)) {
            arrayEscalas = escData;
          } else if (escData.escalas && Array.isArray(escData.escalas)) {
            arrayEscalas = escData.escalas;
          } else if (escData.data && Array.isArray(escData.data)) {
            arrayEscalas = escData.data;
          } else if (typeof escData === 'object') {
            const extrairArray = Object.values(escData).find(Array.isArray);
            if (extrairArray) arrayEscalas = extrairArray;
          }
        }
        
        setEscalasBase(arrayEscalas);
      } catch (error) {
        console.log(error);
        setEscalasBase([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    carregarDados();
  }, []);

  const safeToDateString = useCallback((dateInput) => {
    if (!dateInput) return "";
    if (dateInput instanceof Date) {
      return dateInput.toISOString().split("T")[0];
    }
    return String(dateInput).substring(0, 10);
  }, []);

  const verificaSemanaMes = useCallback((dateObj, regra) => {
    if (!regra) return true;
    const normalizedRegra = regra.toUpperCase();
    const dia = dateObj.getDate();
    const mes = dateObj.getMonth();
    const ano = dateObj.getFullYear();
    const semanaDoMes = Math.ceil(dia / 7);

    if (normalizedRegra === "PRIMEIRA") return semanaDoMes === 1;
    if (normalizedRegra === "SEGUNDA") return semanaDoMes === 2;
    if (normalizedRegra === "TERCEIRA") return semanaDoMes === 3;
    if (normalizedRegra === "QUARTA") return semanaDoMes === 4;

    if (normalizedRegra === "ULTIMA") {
      const proximaSemana = new Date(ano, mes, dia + 7);
      return proximaSemana.getMonth() !== mes;
    }

    if (normalizedRegra === "EXCETO_ULTIMA") {
      const proximaSemana = new Date(ano, mes, dia + 7);
      return proximaSemana.getMonth() === mes;
    }

    return true;
  }, []);

  const getDadosParaData = useCallback((dateString, deventos, dagenda, dcancelados, descalas) => {
    const resultado = [];
    const dateObj = new Date(dateString + "T00:00:00");
    const dayOfWeek = dateObj.getDay();

    const daAgenda = dagenda.filter(ae => safeToDateString(ae.data) === dateString);
    resultado.push(...daAgenda.map(e => ({ ...e, type: 'evento', agenda_id: e.agenda_id, id: e.evento_id, date: dateString })));

    deventos.forEach(evento => {
      if ((evento.recorrente || evento.recorrencia_id) && evento.ativo !== false) {
        const isCancelado = dcancelados.some(c => Number(c.evento_id) === Number(evento.id) && safeToDateString(c.data) === dateString);
        if (isCancelado) return;

        const dataInicioStr = safeToDateString(evento.data_inicio);
        const dataFimStr = safeToDateString(evento.data_fim);

        if (dataInicioStr && dateString < dataInicioStr) return;
        if (dataFimStr && dateString > dataFimStr) return;

        if (Number(evento.dia_semana) === dayOfWeek) {
          if (Number(evento.intervalo_semanas) > 1 && dataInicioStr) {
            const d1 = new Date(dataInicioStr + "T00:00:00");
            d1.setDate(d1.getDate() - d1.getDay());

            const d2 = new Date(dateString + "T00:00:00");
            d2.setDate(d2.getDate() - d2.getDay());

            const diffTime = d2 - d1;
            if (diffTime >= 0) {
              const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
              const diffWeeks = Math.round(diffDays / 7);
              if (diffWeeks % Number(evento.intervalo_semanas) !== 0) return;
            } else {
              return;
            }
          }

          if (evento.semana_mes) {
            const passaFiltro = verificaSemanaMes(dateObj, evento.semana_mes);
            if (!passaFiltro) return;
          }

          resultado.push({
            ...evento,
            type: 'evento',
            date: dateString,
            isGroup: true
          });
        }
      }
    });

    const escalasDoDia = descalas.filter(escala => {
      const rawDate = escala.dia || escala.data;
      const dataEscala = rawDate ? String(rawDate).split("T")[0] : "";
      return dataEscala === dateString;
    });

    escalasDoDia.forEach(es => {
      resultado.push({
        ...es,
        type: 'escala',
        date: dateString,
        color: es.cor || "#000000"
      });
    });

    return resultado;
  }, [safeToDateString, verificaSemanaMes]);

  function formataHora(tempo) {
    if (!tempo) return "";
    const partes = tempo.split(":");
    if (partes.length >= 2) {
      const hora = partes[0];
      const minuto = partes[1];
      if (minuto === "00") {
        return `${hora}h`;
      }
      return `${hora}h${minuto}`;
    }
    return tempo;
  }

  function primeiroNome(nome) {
    if (!nome) return "";
    return nome.split(" ")[0];
  }

  function formatarData(dataString) {
    if (!dataString) return "";
    const partes = dataString.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  }

  function agruparListagem(lista) {
    const eventos = lista.filter(item => item.type === 'evento');
    const escalas = lista.filter(item => item.type === 'escala');
    const agrupados = [];
    
    eventos.sort((a, b) => new Date(`${a.date}T${a.horario || '00:00:00'}`) - new Date(`${b.date}T${b.horario || '00:00:00'}`));

    eventos.forEach(evento => {
      const horaFormatada = formataHora(evento.horario);
      const existente = agrupados.find(g => g.date === evento.date && g.nome === evento.nome);

      if (existente) {
        if (horaFormatada && !existente.horarios.includes(horaFormatada)) {
          existente.horarios.push(horaFormatada);
        }
      } else {
        agrupados.push({
          ...evento,
          horarios: horaFormatada ? [horaFormatada] : []
        });
      }
    });

    return [...agrupados, ...escalas];
  }

  useEffect(() => {
    const resultByDate = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const lista = getDadosParaData(currentDate, eventosBase, agendaBase, canceladosBase, escalasBase);
      
      if (lista.length > 0) {
        resultByDate[currentDate] = lista.map(e => e.color || '#E53935');
      }
    }
    setEventsByDate(resultByDate);
  }, [month, year, eventosBase, agendaBase, canceladosBase, escalasBase, getDadosParaData]);

  useEffect(() => {
    let lista = [];
    if (selected) {
      lista = getDadosParaData(selected, eventosBase, agendaBase, canceladosBase, escalasBase);
    } else {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        lista.push(...getDadosParaData(currentDate, eventosBase, agendaBase, canceladosBase, escalasBase));
      }
    }

    setFilteredEvents(agruparListagem(lista));
  }, [selected, month, year, eventosBase, agendaBase, canceladosBase, escalasBase, getDadosParaData]);

  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-25%] mt-[-12%]'>
        <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Agenda</Text>
        <Image
          source={logo}
          className="w-[25%] "
          resizeMode="contain"
        />
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 125 }} className='flex'>
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
            {filteredEvents.map((item, index) => {
              if (item.type === 'escala') {
                return (
                  <View
                    key={`escala-${item.id}-${index}`}
                    className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[4%] mt-[4%] shadow-md flex-row items-start'
                    style={styles.sombra}
                  >
                    <UserCircle
                      size={26}
                      color={item.cor || '#000000'}
                      weight="light"
                    />
                    <View className='flex-1 ml-[3%]'>
                      <View className='flex-row justify-between items-center'>
                        <Text style={{ color: item.cor || '#000000' }} className='font-popRegular text-[16px]'>
                          {item.nome_departamento || "Desconhecido"}
                        </Text>
                        <View className="items-end">
                          <Text className='font-popLight text-[14px] text-preto dark:text-branco'>
                            Dia {formatarData(item.date)}
                          </Text>
                        </View>
                      </View>
                      
                      <View className="mt-[2%]">
                        <Text className="font-popLight text-[14px] text-preto dark:text-branco">
                          {formataHora(item.horario1)} - {primeiroNome(item.responsavel1)}
                        </Text>
                        {item.responsavel2 && (
                          <Text className="font-popLight text-[14px] text-preto dark:text-branco mt-[1%]">
                            {formataHora(item.horario2)} - {primeiroNome(item.responsavel2)}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              }

              return (
                <View
                  key={`evento-${item.id || item.agenda_id}-${index}`}
                  className='bg-input dark:bg-input-dark rounded-xl px-[4%] py-[4%] mt-[4%] shadow-md flex-row items-start'
                  style={styles.sombra}
                >
                  <CalendarDots
                    size={26}
                    color={item.color || '#BB1C00'}
                    weight="light"
                  />
                  <View className='flex-1 ml-[3%]'>
                    <View className='flex-row justify-between items-center'>
                      <Text className='font-popRegular text-[16px] text-preto dark:text-branco'>
                        {item.nome}
                      </Text>
                      <View className="items-end flex-row gap-2">
                        <Text className="font-popLight text-[14px] text-preto dark:text-branco">
                          {item.horarios?.length > 1 ? item.horarios.join(' e ') : item.horarios[0]}
                        </Text>
                      </View>
                    </View>
                    <Text className='font-popLight text-[14px] text-preto dark:text-branco mt-[2%]'>
                      Dia {formatarData(item.date)}
                    </Text>
                  </View>
                </View>
              );
            })}

            {filteredEvents.length === 0 && (
              <Text className="text-center text-cinza mt-[10%] font-popLight">
                Nenhum evento ou escala encontrados
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
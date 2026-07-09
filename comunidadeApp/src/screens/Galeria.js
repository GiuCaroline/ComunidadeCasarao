import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { useState, useMemo, useEffect } from "react";
import { Search } from "../components/search";
import { CalendarCheck, CaretRight } from "phosphor-react-native";
import { useColorScheme } from "nativewind";
import { getGaleriaEventos, getGaleriaEvento } from "../services/authService";
import LoadingOverlay from '../components/loadingOverlay';

export function Galeria() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const logo = colorScheme === 'dark' 
  ? require('../../assets/images/logoBranco.png') 
  : require('../../assets/images/logoPreto.png');
  
  const [eventos, setEventos] = useState([]);

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

  useEffect(() => {
    setIsLoading(true);

    async function fetchEventos() {
      try {
        const data = await getGaleriaEventos();
        const agora = new Date();
        const eventosPassados = data.filter((evento) => new Date(evento.data) < agora);

        const eventosComFotosPromises = eventosPassados.map(async (evento) => {
          try {
            const midias = await getGaleriaEvento(evento.agendaevento_id);
            if (midias && midias.length > 0) {
              return evento;
            }
            return null;
          } catch (error) {
            return null;
          }
        });

        const eventosVerificados = await Promise.all(eventosComFotosPromises);
        const eventosComFotos = eventosVerificados.filter((evento) => evento !== null);

        setEventos(eventosComFotos);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEventos();
  }, []);

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const nomeEvento = evento.nome ? evento.nome.toLowerCase() : "";
      const dia = evento.data ? evento.data : "";
      
      return (
        nomeEvento.includes(search.toLowerCase()) ||
        dia.includes(search)
      );
    });
  }, [search, eventos]);

  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-18%] mt-[-12%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Galeria</Text>
          <Image
              source={logo}
              className="w-[25%] "
              resizeMode="contain"
          />
      </View>

      <View className="px-5 mb-3 items-center">
        <Search value={search} onChange={setSearch} />
      </View>

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("EventGalery", {
                evento: item,
              })
            }
            className="w-full p-4 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-3"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <CalendarCheck size={27} color="#B3261E" weight="light" />

              <View>
                <Text className="text-base font-popRegular text-preto dark:text-branco">
                  {item.nome} - {formataHora(item.horario)}
                </Text>
                <Text className="text-[14px] font-popLight text-preto dark:text-branco">
                  Dia {formatarData(item.data)}
                </Text>

              </View>
            </View>

            <CaretRight size={24} color="#B3261E" />
          </TouchableOpacity>
        )}
      />

      <Nav
        active="Galeria"
        onChange={(r) => navigation.navigate(r)}
      />
      
      <LoadingOverlay visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
});

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
}
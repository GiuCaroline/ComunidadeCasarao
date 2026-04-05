import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { useState, useMemo } from "react";
import { Search } from "../components/search";
import { CalendarCheck, CaretRight } from "phosphor-react-native";
import { useColorScheme } from "nativewind";
import { getEventos } from "../services/authService";
import { useEffect } from "react";

export function Galeria() {
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
    async function carregarEventos() {
      try {
        const data = await getEventos();
        const eventosNormalizados = [];
        if (data.eventos) {
          data.eventos.forEach(evento => {
            if (evento.dia1) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia1,
              });
            }
            if (evento.dia2 && evento.dia2 !== evento.dia1) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia2,
              });
            }
            if (evento.dia3 && evento.dia3 !== evento.dia1 && evento.dia3 !== evento.dia2) {
              eventosNormalizados.push({
                ...evento,
                diaExibicao: evento.dia3,
              });
            }
          });
        }
        setEventos(eventosNormalizados);
      } catch (error) {
        console.log(error);
      }
    }
    carregarEventos();
  }, []);

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const nomeEvento = evento.nomeEvento ? evento.nomeEvento.toLowerCase() : "";
      const dia = evento.diaExibicao ? evento.diaExibicao : "";
      
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

      {/* Search */}
      <View className="px-5 mb-3 items-center">
        <Search value={search} onChange={setSearch} />
      </View>

      {/* Lista */}
      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("DetalhesEvento", {
                nome: item.nomeEvento,
                data: item.diaExibicao,
              })
            }
            className="w-full p-4 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-3"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <CalendarCheck size={27} color="#B3261E" weight="light" />

              <View>
                <Text className="text-base font-popRegular text-preto dark:text-branco">
                  {item.nomeEvento}
                </Text>
                <Text className="text-[14px] font-popLight text-preto dark:text-branco">
                  Dia {formatarData(item.diaExibicao)}
                </Text>

              </View>
            </View>

            {/* Seta direita */}
            <CaretRight size={24} color="#B3261E" />
          </TouchableOpacity>
        )}
      />

      <Nav
        active="Galeria"
        onChange={(r) => navigation.navigate(r)}
      />
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

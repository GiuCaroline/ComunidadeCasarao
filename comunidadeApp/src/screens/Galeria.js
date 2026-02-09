import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { useState, useMemo } from "react";
import { Search } from "../components/search";
import { CalendarCheck, CaretRight } from "phosphor-react-native";

export function Galeria() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const eventos = [
    { id: "1", nome: "Culto", data: "12/05/2025" },
    { id: "2", nome: "Devocional", data: "20/06/2025" },
    { id: "3", nome: "Jovens", data: "10/12/2025" },
  ];

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) =>
      evento.nome.toLowerCase().includes(search.toLowerCase()) ||
      evento.data.includes(search)
    );
  }, [search]);

  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className='w-full flex-row justify-between items-center px-[4%] mb-[-18%] mt-[-12%]'>
          <Text className='text-[18px] font-popRegular mt-[5%] text-preto dark:text-branco'>Galeria</Text>
          <Image
              source={require('../../assets/images/logoPreto.png')}
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("DetalhesEvento", {
                nome: item.nome,
                data: item.data,
              })
            }
            className="w-full p-4 bg-input dark:bg-input-dark rounded-[20px] flex-row items-center justify-between mt-3"
            style={styles.sombra}
          >
            <View className="flex-row items-center gap-3">
              <CalendarCheck size={27} color="#B3261E" weight="light" />

              <View>
                <Text className="text-base font-popRegular text-preto dark:text-branco">
                  {item.nome}
                </Text>
                <Text className="text-[14px] font-popLight text-preto dark:text-branco">
                  Dia {item.data}
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

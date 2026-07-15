import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { CaretUp, CaretDown, ArrowLeft, X, DownloadSimple } from "phosphor-react-native";
import { getGaleriaEvento } from "../services/authService";
import { useColorScheme } from "nativewind";
import { useVideoPlayer, VideoView } from "expo-video";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';
import { AlertCustom } from "../components/alert";

function ReprodutorDeVideo({ url }) {
  const player = useVideoPlayer(url, (player) => {
    player.pause();
  });

  return (
    <View className="w-full h-full bg-black">
      <VideoView 
        player={player} 
        style={{ width: '100%', height: '100%' }} 
        allowsFullscreen 
        allowsPictureInPicture 
      />
    </View>
  );
}

export function EventGalery() {
  const navigation = useNavigation();
  const route = useRoute();
  const { evento } = route.params || {};
  
  const { colorScheme } = useColorScheme();
  const icon = colorScheme === 'dark' ? '#ee2400' : '#BB1C00';
  const iconSeta = colorScheme === 'dark' ? '#FAFAFA' : '#000';

  const [alerta, setAlerta] = useState({
      visible: false,
      title: "",
      message: "",
      type: "error"
  });

  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isPhotosOpen, setIsPhotosOpen] = useState(true);
  const [isVideosOpen, setIsVideosOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const animationPhotos = useRef(new Animated.Value(1)).current;
  const animationVideos = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function fetchMidias() {
      if (evento?.agendaevento_id) {
        try {
          const data = await getGaleriaEvento(evento.agendaevento_id);
          
          const imagensFiltradas = data.filter(item => item.tipo_arquivo === 'imagem');
          const videosFiltrados = data.filter(item => item.tipo_arquivo === 'video');
          
          setFotos(imagensFiltradas);
          setVideos(videosFiltrados);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchMidias();
  }, [evento]);

  const togglePhotos = () => {
    const toValue = isPhotosOpen ? 0 : 1;
    setIsPhotosOpen(!isPhotosOpen);
    
    Animated.timing(animationPhotos, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const toggleVideos = () => {
    const toValue = isVideosOpen ? 0 : 1;
    setIsVideosOpen(!isVideosOpen);
    
    Animated.timing(animationVideos, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const maxHeightPhotos = animationPhotos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3000],
  });

  const opacityPhotos = animationPhotos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const maxHeightVideos = animationVideos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3000],
  });

  const opacityVideos = animationVideos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleDownload = async (url) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para salvar a foto.');
        return;
      }

      const filename = url.split('/').pop().split('?')[0] || 'imagem.jpg';
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.saveToLibraryAsync(asset.uri);

      setAlerta({
          visible: true,
          title: "Sucesso!",
          message: "Foto salva na galeria.",
          type: "success"
      });
    } catch (error) {
      console.error(error);
      setAlerta({
          visible: true,
          title: "Erro",
          message: "Não foi possível baixar a foto.",
          type: "error"
      });
    }
  };

  return (
    <>
    <AlertCustom
        visible={alerta.visible}
        title={alerta.title}
        message={alerta.message}
        type={alerta.type}
        onClose={() => setAlerta({ ...alerta, visible: false })}
    />
    <View className="flex-1 bg-branco dark:bg-preto-dark">
      <View className="px-5 pt-12 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={30} color={iconSeta} weight="regular" />
        </TouchableOpacity>
        <Text className="text-[18px] font-popSemiBold text-preto dark:text-branco">
          {evento?.nome || "Galeria"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        
        <View className="w-full bg-input dark:bg-input-dark rounded-[20px] mb-4 overflow-hidden" style={styles.sombra}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={togglePhotos}
            className="w-full flex-row justify-between items-center px-5 py-4"
          >
            <Text className="text-[16px] font-popMedium text-vermelho dark:text-vermelho-dark">
              Fotos
            </Text>
            {isPhotosOpen ? (
              <CaretUp size={24} color={icon} />
            ) : (
              <CaretDown size={24} color={icon} />
            )}
          </TouchableOpacity>

          <Animated.View style={[{ maxHeight: maxHeightPhotos, opacity: opacityPhotos, overflow: "hidden" }]}>
            <View className="px-5 pb-5 flex-row flex-wrap justify-between">
              {fotos.length > 0 ? (
                fotos.map((foto) => (
                  <TouchableOpacity
                    key={foto.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedImage(foto.url_arquivo)}
                    className="w-[48%] mb-3"
                  >
                    <Image
                      source={{ uri: foto.url_arquivo }}
                      className="w-full h-32 rounded-xl bg-gray-200 dark:bg-gray-800"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-preto dark:text-branco font-popLight text-sm">
                  Nenhuma foto encontrada.
                </Text>
              )}
            </View>
          </Animated.View>
        </View>

        <View className="w-full bg-input dark:bg-input-dark rounded-[20px] overflow-hidden" style={styles.sombra}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleVideos}
            className="w-full flex-row justify-between items-center px-5 py-4"
          >
            <Text className="text-[16px] font-popMedium text-vermelho dark:text-vermelho-dark">
              Vídeos
            </Text>
            {isVideosOpen ? (
              <CaretUp size={24} color={icon} />
            ) : (
              <CaretDown size={24} color={icon} />
            )}
          </TouchableOpacity>

          <Animated.View style={[{ maxHeight: maxHeightVideos, opacity: opacityVideos, overflow: "hidden" }]}>
            <View className="px-5 pb-5">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <View key={video.id} className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-black">
                    <ReprodutorDeVideo url={video.url_arquivo} />
                  </View>
                ))
              ) : (
                <Text className="text-preto dark:text-branco font-popLight text-sm">
                  Nenhum vídeo encontrado.
                </Text>
              )}
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <View className="absolute top-12 right-6 z-50 flex-row gap-4">
            <TouchableOpacity
              className="p-2 bg-vermelho rounded-full"
              onPress={() => handleDownload(selectedImage)}
            >
              <DownloadSimple size={32} color="#FFFFFF" weight="light" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="p-2 bg-vermelho rounded-full"
              onPress={() => setSelectedImage(null)}
            >
              <X size={32} color="#FFFFFF" weight="light" />
            </TouchableOpacity>
          </View>
          
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </Modal>

    </View>
    </>
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
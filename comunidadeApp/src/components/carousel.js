import { View, Image, Dimensions, FlatList, Animated, Text } from "react-native";
import { useRef, useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from "nativewind";
import { getCarrossel } from "../services/authService";

const { width } = Dimensions.get('window');

export function Carousel(){
  const { colorScheme } = useColorScheme();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCarrossel();
        setCarouselData(data);
      } catch (error) {
        console.error("Erro ao carregar carrossel:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const animations = useRef([]).current;

useEffect(() => {
  if (carouselData.length > 0) {
    const newAnimations = carouselData.map(() => new Animated.Value(8));
    animations.splice(0, animations.length, ...newAnimations);
    
    setCurrentIndex(0); 
  }
}, [carouselData]);

useEffect(() => {
  if (animations.length === 0) return;

  animations.forEach((anim, index) => {
    Animated.timing(anim, {
      toValue: currentIndex === index ? 20 : 8,
      duration: 400,
      useNativeDriver: false,
    }).start();
  });
}, [currentIndex, carouselData]);


useEffect(() => {
  if (carouselData.length === 0) return;

  const interval = setInterval(() => {
    const nextIndex = currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1;
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setCurrentIndex(nextIndex);
  }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, carouselData]);

    return (
    <View className='relative'>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View className="px-3 ">
            <Image
              source={{ uri: item.url_arquivo }}
              className="rounded-xl"
              style={{
                width: width - 40,
                height: 200,
                resizeMode: 'cover',
              }}
            />
            <LinearGradient
              pointerEvents="none"
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              locations={[0.4, 1]}
              style={{
                left: 12,
                position: 'absolute',
                bottom: 0,
                width: width - 40,
                height: 110,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />

          </View>
        )}
      />

      <View
        pointerEvents="none"
        className='absolute bottom-8 left-5'
      >
        <Text className='text-branco text-[14px] font-popLight'>
          Veja um pouco da nossa última reunião
        </Text>
      </View>

      <View className="flex-row justify-center mt-[4%]">
        {carouselData.map((_, index) => (
          <Animated.View
            key={index}
            style={{
              height: 7,
              width: animations[index],
              borderRadius: 999,
              marginHorizontal: 4,
              backgroundColor:currentIndex === index
            ? '#BB1C00'
            : colorScheme === 'dark'
            ? '#646464'
            : '#D9D9D9',
            }}
          />
        ))}
      </View>
    </View>
  );
}
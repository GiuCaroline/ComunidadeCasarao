import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated } from "react-native";
import { CaretUp, CaretDown, WhatsappLogo, Envelope } from "phosphor-react-native";

export function DropdownContent({
  title,
  subtitle,
  description,
  whatsapp,
  email,
}) {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 450,
      useNativeDriver: false,
    }).start();
  };

  const openWhatsApp = () => {
    const phone = whatsapp.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/55${phone}`);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View className="w-[95%] mb-4">
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        className="bg-input dark:bg-input-dark rounded-xl px-4 py-3 flex-row justify-between items-center"
        style={styles.sombra}
      >
        <View>
          <Text className="font-popRegular text-base text-preto dark:text-branco">{title}</Text>
          {subtitle && (
            <Text className="font-popLight text-sm text-preto dark:text-branco">
              {subtitle}
            </Text>
          )}
        </View>

        {expanded ? <CaretUp size={22} className='text-placeInput dark:text-branco' /> : <CaretDown size={22} className='text-placeInput dark:text-branco'/>}
      </TouchableOpacity>

      <Animated.View
        style={[
          { maxHeight, opacity, overflow: "hidden" }
        ]}
      >
        <View
          className="bg-input dark:bg-input-dark rounded-xl mt-2 p-4"
          style={styles.sombra}
        >
          <Text className="font-popRegular mb-2 text-preto dark:text-branco">Descrição</Text>
          <Text className="font-popLight text-sm mb-4 text-preto dark:text-branco">
            {description}
          </Text>

          <Text className="font-popRegular mb-2 text-preto dark:text-branco">Responsáveis</Text>

          <TouchableOpacity
            onPress={openWhatsApp}
            className="flex-row items-center mb-2"
          >
            <WhatsappLogo size={20} className='text-vermelho' weight="light" />
            <Text className="ml-2 font-popRegular text-preto dark:text-branco">{whatsapp}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openEmail}
            className="flex-row items-center"
          >
            <Envelope size={20} className='text-vermelho' weight="light" />
            <Text className="ml-2 font-popRegular text-preto dark:text-branco">{email}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
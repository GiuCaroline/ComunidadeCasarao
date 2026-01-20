import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { CaretUp, CaretDown, WhatsappLogo, Envelope } from "phosphor-react-native";

export function DropdownContent({
  title,
  subtitle,
  description,
  whatsapp,
  email,
}) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  const openWhatsApp = () => {
    const phone = whatsapp.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/55${phone}`);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View className="w-[95%] mb-4">
      {/* HEADER */}
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        className="bg-input rounded-xl px-4 py-3 flex-row justify-between items-center"
        style={styles.sombra}
      >
        <View>
          <Text className="font-popMedium text-base">{title}</Text>
          {subtitle && (
            <Text className="font-popRegular text-sm text-placeInput">
              {subtitle}
            </Text>
          )}
        </View>

        {expanded ? <CaretUp size={22} /> : <CaretDown size={22} />}
      </TouchableOpacity>

      {/* CONTENT */}
      {expanded && (
        <View
          className="bg-input rounded-xl mt-2 p-4"
          style={styles.sombra}
        >
          <Text className="font-popRegular text-sm mb-4">
            {description}
          </Text>

          <Text className="font-popMedium mb-2">Responsáveis</Text>

          {/* WhatsApp */}
          <TouchableOpacity
            onPress={openWhatsApp}
            className="flex-row items-center mb-2"
          >
            <WhatsappLogo size={20} className='text-vermelho' />
            <Text className="ml-2 font-popRegular">{whatsapp}</Text>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            onPress={openEmail}
            className="flex-row items-center"
          >
            <Envelope size={20}  className='text-vermelho' />
            <Text className="ml-2 font-popRegular">{email}</Text>
          </TouchableOpacity>
        </View>
      )}
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

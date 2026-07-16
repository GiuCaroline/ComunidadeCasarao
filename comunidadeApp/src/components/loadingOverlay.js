import React, { useEffect, useRef } from 'react';
import { View, Modal, Image } from 'react-native';
import { useColorScheme } from "nativewind";

export default function LoadingOverlay({ visible }) {

    const { colorScheme } = useColorScheme();
    const logo = colorScheme === 'dark' 
    ? require('../../assets/images/branco.gif') 
    : require('../../assets/images/preto.gif');

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View className="flex-1 bg-white/90 dark:bg-black/90 justify-center items-center">
        <Image
          source={logo}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}
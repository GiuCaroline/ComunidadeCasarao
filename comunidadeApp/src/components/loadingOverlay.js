import React, { useEffect, useRef } from 'react';
import { View, Animated, Modal } from 'react-native';
import { useColorScheme } from "nativewind";

export default function LoadingOverlay({ visible }) {

    const { colorScheme } = useColorScheme();
    const logo = colorScheme === 'dark' 
    ? require('../../assets/images/logoBranco.png') 
    : require('../../assets/images/logoPreto.png');
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleValue.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View className="flex-1 bg-white/90 dark:bg-black/90 justify-center items-center">
        <Animated.Image
          source={logo}
          className="w-32 h-32"
          style={{ transform: [{ scale: scaleValue }] }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}
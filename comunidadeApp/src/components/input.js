import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

export function Input({
  texto,
  seguranca,
  value,
  onChangeText,
  keyboardType = 'default',
  containerStyle,
}) {
  const [internalText, setInternalText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const text = value !== undefined ? value : internalText;
  const setText = onChangeText || setInternalText;

  const isActive = isFocused || text.length > 0;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const labelTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [13, -16],
  });

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 14],
  });

  return (
    <View
      style={[styles.sombra, containerStyle]}
      className="bg-input rounded-xl flex items-center justify-center w-[95%] h-[50px] mb-[10%]"
    >
      <Animated.Text
        style={{
          position: 'absolute',
          left: 16,
          top: labelTop,
          fontSize: labelSize,
          color: '#5e5e5e',
          fontFamily: isActive ? 'Poppins_300Light' : 'Poppins_400Regular',
          zIndex: 1,
        }}
      >
        {texto}
      </Animated.Text>

      <TextInput
        className="font-popRegular px-[2%] w-[95%] text-[16px]"
        style={{ height: 65 }}
        value={text}
        onChangeText={setText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={seguranca}
        keyboardType={keyboardType}
      />
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
  },
});

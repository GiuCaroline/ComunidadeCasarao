import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

export function Input({ texto, seguranca }) {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const isActive = isFocused || text.length > 0;
    
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: (isFocused || text.length > 0) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, text]);

    const labelTop = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [13, -16], 
    });

    const labelSize = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14], 
    });

    const labelColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#5e5e5e', '#5e5e5e'], 
    });

    return (
        <View style={[styles.sombra]}
         className='bg-input rounded-xl flex items-center justify-center w-[320px] h-[50px] mb-[10%]'>
            <Animated.Text 
                style={{
                    position: 'absolute',
                    left: 16,
                    top: labelTop,
                    fontSize: labelSize,
                    color: labelColor,
                    fontFamily: isActive ? 'Poppins_300Light' : 'Poppins_400Regular',
                    zIndex: 1,
                }}
            >
                {texto}
            </Animated.Text>

            <TextInput 
                className="font-popRegular px-[4%] w-[320px] text-[16px]"
                style={{ 
                    height: 65,
                }}
                value={text}
                onChangeText={setText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={seguranca}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 6,
    }
});
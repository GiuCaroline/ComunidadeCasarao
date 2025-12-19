import { View, Text, StyleSheet } from "react-native";

export function Nav(){
    return(
        <View className='bg-branco w-full h-full' style={[styles.sombra]}>
            <Text>oi</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 20,
    }
});
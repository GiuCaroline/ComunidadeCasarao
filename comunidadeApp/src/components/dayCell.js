import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function DayCell({ day, onPress, markers = [] }) {

  if (!day) {
    return <View style={styles.empty} />;
  }

  return (
    <TouchableOpacity style={styles.day} onPress={() => onPress(day)}>
      <Text className='text-[14px] font-popLight text-preto dark:text-branco'>{day}</Text>

      <View style={styles.markerContainer}>
        {markers.map((color, index) => (
          <View
            key={index}
            style={[styles.marker, { backgroundColor: color }]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  empty:{
    width:"14.2%",
    height:60
  },
  day:{
    width:"14.2%",
    height:60,
    alignItems:"center",
    justifyContent:"center"
  },
  markerContainer:{
    flexDirection:"row",
    marginTop:4
  },
  marker:{
    width:6,
    height:2,
    borderRadius:2,
    marginHorizontal:1
  }
});

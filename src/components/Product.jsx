import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { IconButton, Title } from "react-native-paper";

export default function Product({ item, add, remove }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.title}>
          {item.concertName} {item.categoryName}
        </Text>
        <Text>$ {item.price * item.quantity}</Text>
      </View>
      <View style={styles.controls}>
        <IconButton onPress={() => add(item)} icon={"plus"} mode="contained" size={20} />
        <Text>{item.quantity}</Text>
        <IconButton onPress={() => remove(item)} icon={"minus"} mode="contained" size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 70,
    resizeMode: "cover",
    marginEnd: 10,
  },
  description: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  controls: {
    alignItems: "center",
  },
});

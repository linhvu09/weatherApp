import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Xin chào React Native!</Text>
      <Text style={styles.text}>Chạy trên iPhone bằng Expo Go 😎</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

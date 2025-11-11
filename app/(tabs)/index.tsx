import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Giữ splash hiển thị
        await SplashScreen.preventAutoHideAsync();

        // Giả lập load dữ liệu, fonts, API… (ví dụ 2 giây)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    // Chưa sẵn sàng → không render UI chính
    return null;
  }

  // Ẩn splash screen khi đã sẵn sàng
  SplashScreen.hideAsync();

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

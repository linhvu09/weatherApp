import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import "../../global.css";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
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
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-white-800">
          👋 Xin chào React Native!
        </Text>
        <Text className="text-base mt-2 text-blue-600">
          Chạy trên iPhone bằng Expo Go hi😎
        </Text>
      </View>
    </SafeAreaView>
  );
}

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LibraryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold color-white">
          🎵 Library Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}

import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("../(tabs)/home/index");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold mb-8 text-center">
          🎵 Đăng nhập
        </Text>

        <TextInput
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-500 rounded-lg py-3 mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <Link href="/auth/register" asChild>
          <TouchableOpacity>
            <Text className="text-blue-500 text-center">
              Chưa có tài khoản? Đăng ký
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

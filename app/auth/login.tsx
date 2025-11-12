import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8">Đăng nhập</Text>

      <TextInput
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
      />

      <TouchableOpacity className="w-full bg-blue-500 rounded-lg py-3 mb-4">
        <Text className="text-white text-center font-semibold">Đăng nhập</Text>
      </TouchableOpacity>

      <Link href="/auth/register" asChild>
        <TouchableOpacity>
          <Text className="text-blue-500">Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

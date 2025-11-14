import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function App() {
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const checkAuth = async () => {
            const isLoggedIn = true; // Giả sử đã đăng nhập

            setTimeout(() => {
                if (isLoggedIn) {
                    router.replace("/(tabs)/home");
                } else {
                    router.replace("/auth/login");
                }
            }, 1000);
        };

        checkAuth();
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-blue-500">
            <Text className="text-white text-3xl font-bold mb-4">
                🎵 MusicApp
            </Text>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
}

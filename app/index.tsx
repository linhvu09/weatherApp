import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function App() {
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // const isLoggedIn = await authService.isAuthenticated();
            const isLoggedIn = false; // Tạm thời đặt là false để kiểm tra

            setTimeout(() => {
                if (isLoggedIn) {
                    router.replace("/(tabs)/home");
                } else {
                    router.replace("/auth/login");
                }
            }, 1000);
        } catch (error) {
            console.error("Lỗi kiểm tra auth:", error);
            router.replace("/auth/login");
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#1DB954]">
            <Text className="text-white text-3xl font-bold mb-4">
                🎵 MusicApp
            </Text>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
}

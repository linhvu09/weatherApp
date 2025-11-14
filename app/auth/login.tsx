import { authService } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<
        "google" | "facebook" | null
    >(null);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            setLoading(true);
            const { user } = await authService.login({ username, password });

            Alert.alert(
                "Thành công",
                `Chào mừng ${user.displayName || user.username}!`,
            );
            router.replace("/(tabs)/home");
        } catch (error: any) {
            Alert.alert("Đăng nhập thất bại", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setOauthLoading("google");
            const { user } = await authService.loginWithGoogle();

            Alert.alert(
                "Thành công",
                `Chào mừng ${user.displayName || user.username}!`,
            );
            router.replace("/(tabs)/home");
        } catch (error: any) {
            if (error.message !== "Đã hủy đăng nhập") {
                Alert.alert("Đăng nhập Google thất bại", error.message);
            }
        } finally {
            setOauthLoading(null);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            setOauthLoading("facebook");
            const { user } = await authService.loginWithFacebook();

            Alert.alert(
                "Thành công",
                `Chào mừng ${user.displayName || user.username}!`,
            );
            router.replace("/(tabs)/home");
        } catch (error: any) {
            if (error.message !== "Đã hủy đăng nhập") {
                Alert.alert("Đăng nhập Facebook thất bại", error.message);
            }
        } finally {
            setOauthLoading(null);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black px-6">
            <View className="flex-1 justify-center">
                <Text className="text-white text-3xl font-bold mb-8">
                    Đăng nhập
                </Text>

                <TextInput
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-4"
                />

                <TextInput
                    placeholder="Mật khẩu"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-6"
                />

                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    className="bg-[#1DB954] rounded-full py-4 items-center mb-4"
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            Đăng nhập
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center my-6">
                    <View className="flex-1 h-[1px] bg-neutral-800" />
                    <Text className="text-gray-500 mx-4">hoặc</Text>
                    <View className="flex-1 h-[1px] bg-neutral-800" />
                </View>

                {/* Google Login */}
                <TouchableOpacity
                    onPress={handleGoogleLogin}
                    disabled={oauthLoading !== null}
                    className="bg-white rounded-full py-4 items-center mb-3 flex-row justify-center"
                    activeOpacity={0.8}
                >
                    {oauthLoading === "google" ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <>
                            <Ionicons
                                name="logo-google"
                                size={20}
                                color="#000"
                            />
                            <Text className="text-black font-semibold text-base ml-2">
                                Tiếp tục với Google
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Facebook Login */}
                <TouchableOpacity
                    onPress={handleFacebookLogin}
                    disabled={oauthLoading !== null}
                    className="bg-[#1877F2] rounded-full py-4 items-center mb-6 flex-row justify-center"
                    activeOpacity={0.8}
                >
                    {oauthLoading === "facebook" ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Ionicons
                                name="logo-facebook"
                                size={20}
                                color="#fff"
                            />
                            <Text className="text-white font-semibold text-base ml-2">
                                Tiếp tục với Facebook
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/auth/register")}>
                    <Text className="text-gray-400 text-center">
                        Chưa có tài khoản?{" "}
                        <Text className="text-[#1DB954]">Đăng ký ngay</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

import { authService } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<
        "google" | "facebook" | null
    >(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 40,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập và mật khẩu");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        try {
            setLoading(true);
            const { user } = await authService.register({
                username,
                password,
                email: email || undefined,
                displayName: displayName || undefined,
            });

            Alert.alert(
                "Thành công",
                `Chào mừng ${user.displayName || user.username}!`,
            );
            router.replace("/(tabs)/home");
        } catch (error: any) {
            Alert.alert("Đăng ký thất bại", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
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
                Alert.alert("Đăng ký Google thất bại", error.message);
            }
        } finally {
            setOauthLoading(null);
        }
    };

    const handleFacebookSignup = async () => {
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
                Alert.alert("Đăng ký Facebook thất bại", error.message);
            }
        } finally {
            setOauthLoading(null);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={["top", "bottom"]}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        className="flex-1 px-6"
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Animated.View
                            className="flex-1 justify-center py-8"
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }}
                        >
                            <Text className="text-white text-3xl font-bold mb-8">
                                Đăng ký
                            </Text>

                            <TextInput
                                placeholder="Tên đăng nhập *"
                                placeholderTextColor="#666"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                returnKeyType="next"
                                className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-4"
                            />

                            <TextInput
                                placeholder="Email (tùy chọn)"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-4"
                            />

                            <TextInput
                                placeholder="Tên hiển thị (tùy chọn)"
                                placeholderTextColor="#666"
                                value={displayName}
                                onChangeText={setDisplayName}
                                returnKeyType="next"
                                className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-4"
                            />

                            <TextInput
                                placeholder="Mật khẩu *"
                                placeholderTextColor="#666"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                returnKeyType="done"
                                onSubmitEditing={handleRegister}
                                className="bg-neutral-900 text-white rounded-lg px-4 py-3 mb-6"
                            />

                            <TouchableOpacity
                                onPress={handleRegister}
                                disabled={loading}
                                className="bg-[#1DB954] rounded-full py-4 items-center mb-4"
                                activeOpacity={0.7}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">
                                        Đăng ký
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Divider */}
                            <View className="flex-row items-center my-6">
                                <View className="flex-1 h-[1px] bg-neutral-800" />
                                <Text className="text-gray-500 mx-4">hoặc</Text>
                                <View className="flex-1 h-[1px] bg-neutral-800" />
                            </View>

                            {/* Google Signup */}
                            <TouchableOpacity
                                onPress={handleGoogleSignup}
                                disabled={oauthLoading !== null}
                                className="bg-white rounded-full py-4 items-center mb-3 flex-row justify-center"
                                activeOpacity={0.7}
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

                            {/* Facebook Signup */}
                            <TouchableOpacity
                                onPress={handleFacebookSignup}
                                disabled={oauthLoading !== null}
                                className="bg-[#1877F2] rounded-full py-4 items-center mb-6 flex-row justify-center"
                                activeOpacity={0.7}
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

                            <TouchableOpacity onPress={() => router.back()}>
                                <Text className="text-gray-400 text-center">
                                    Đã có tài khoản?{" "}
                                    <Text className="text-[#1DB954]">
                                        Đăng nhập
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

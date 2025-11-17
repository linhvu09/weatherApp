import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export default function SplashCustom() {
    const fade = useSharedValue(0);
    const scale = useSharedValue(0.8);

    // Animation cho từng icon
    const note1Y = useSharedValue(0);
    const note2Y = useSharedValue(0);
    const note3Y = useSharedValue(0);
    const centerScale = useSharedValue(0.5);

    useEffect(() => {
        fade.value = withTiming(1, { duration: 800 });
        scale.value = withSpring(1, { damping: 10, stiffness: 100 });

        // Center icon pulse
        centerScale.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(0.9, { duration: 800 }),
            ),
            -1,
            true,
        );

        // Note 1 - bounce
        note1Y.value = withRepeat(
            withSequence(
                withTiming(-15, { duration: 600 }),
                withTiming(0, { duration: 600 }),
            ),
            -1,
            false,
        );

        // Note 2 - bounce với delay
        note2Y.value = withDelay(
            200,
            withRepeat(
                withSequence(
                    withTiming(-15, { duration: 600 }),
                    withTiming(0, { duration: 600 }),
                ),
                -1,
                false,
            ),
        );

        // Note 3 - bounce với delay
        note3Y.value = withDelay(
            400,
            withRepeat(
                withSequence(
                    withTiming(-15, { duration: 600 }),
                    withTiming(0, { duration: 600 }),
                ),
                -1,
                false,
            ),
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: fade.value,
        transform: [{ scale: scale.value }],
    }));

    const centerIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: centerScale.value }],
    }));

    const note1Style = useAnimatedStyle(() => ({
        transform: [{ translateY: note1Y.value }],
    }));

    const note2Style = useAnimatedStyle(() => ({
        transform: [{ translateY: note2Y.value }],
    }));

    const note3Style = useAnimatedStyle(() => ({
        transform: [{ translateY: note3Y.value }],
    }));

    return (
        <ImageBackground
            source={require("@/assets/images/ảnh music.jpeg")}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 bg-black/60 justify-center items-center">
                <Animated.View style={animatedStyle} className="items-center">
                    {/* Icon nhạc với animation phức tạp */}
                    <View className="relative w-32 h-32 mb-6 items-center justify-center">
                        {/* Icon phụ 1 */}
                        <Animated.View
                            style={note1Style}
                            className="absolute -left-4 top-4"
                        >
                            <Ionicons
                                name="musical-note"
                                size={32}
                                color="#1DB954"
                            />
                        </Animated.View>

                        {/* Icon phụ 2 */}
                        <Animated.View
                            style={note2Style}
                            className="absolute -right-4 top-4"
                        >
                            <Ionicons
                                name="musical-note"
                                size={32}
                                color="#1ed760"
                            />
                        </Animated.View>

                        {/* Icon phụ 3 */}
                        <Animated.View
                            style={note3Style}
                            className="absolute bottom-0"
                        >
                            <MaterialCommunityIcons
                                name="music-note-eighth"
                                size={28}
                                color="#1DB954"
                            />
                        </Animated.View>

                        {/* Icon chính ở giữa */}
                        <Animated.View
                            style={centerIconStyle}
                            className="w-24 h-24 rounded-full bg-[#1DB954]/20 items-center justify-center"
                        >
                            <Ionicons
                                name="musical-notes"
                                size={56}
                                color="#1DB954"
                            />
                        </Animated.View>
                    </View>

                    <View className="items-center mb-2">
                        <Text className="text-white text-5xl font-extrabold tracking-wider">
                            MusicApp
                        </Text>
                        <View className="h-1 w-32 bg-[#1DB954] rounded-full mt-2" />
                    </View>

                    <Text className="text-white/90 text-lg font-medium mb-1 text-center px-8">
                        Âm Nhạc Của Bạn
                    </Text>
                    <Text className="text-white/70 text-sm font-light mb-12 text-center px-8">
                        Nơi mọi giai điệu trở nên sống động
                    </Text>

                    <View className="items-center">
                        <ActivityIndicator size="large" color="#1DB954" />
                        <Text className="text-white/60 text-xs mt-3 font-light">
                            Đang tải...
                        </Text>
                    </View>
                </Animated.View>

                <View className="absolute bottom-10 items-center">
                    <Text className="text-white/40 text-xs font-light">
                        Made with ❤️ in Vietnam
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

import { authService } from "@/services";
import { followingService } from "@/services/following/following.service";
import { User } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        loadUser();
    }, []);

    // Reload following count khi màn hình focus
    useFocusEffect(
        useCallback(() => {
            loadFollowingCount();
        }, []),
    );

    const loadUser = async () => {
        try {
            const userData = await authService.getStoredUser();
            setUser(userData);
        } catch (error) {
            console.error("❌ Lỗi load user:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadFollowingCount = async () => {
        try {
            const count = await followingService.getFollowingCount();
            setFollowingCount(count);
        } catch (error) {
            console.error("Error loading following count:", error);
        }
    };

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Đăng xuất",
                style: "destructive",
                onPress: async () => {
                    try {
                        await authService.logout();
                        router.replace("/auth/login");
                    } catch (error) {
                        Alert.alert("Lỗi", "Không thể đăng xuất");
                    }
                },
            },
        ]);
    };

    const handleFollowingPress = () => {
        router.push("/(tabs)/library/artists");
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-black">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-white">Đang tải...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 py-4">
                    <Text className="text-white text-2xl font-bold">Hồ sơ</Text>
                </View>

                {/* Profile Info */}
                <View className="items-center py-8">
                    {/* Avatar */}
                    {user?.avatar ? (
                        <Image
                            source={{ uri: user.avatar }}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                    ) : (
                        <View className="w-24 h-24 rounded-full bg-neutral-800 items-center justify-center mb-4">
                            <Ionicons name="person" size={48} color="#9CA3AF" />
                        </View>
                    )}

                    {/* Display Name */}
                    <Text className="text-white text-2xl font-bold mb-1">
                        {user?.displayName || user?.username || "User"}
                    </Text>

                    {/* Username */}
                    {user?.displayName && (
                        <Text className="text-gray-400 mb-1">
                            @{user.username}
                        </Text>
                    )}

                    {/* Email */}
                    {user?.email && (
                        <Text className="text-gray-500 text-sm">
                            {user.email}
                        </Text>
                    )}
                </View>

                {/* Stats */}
                <View className="flex-row justify-around px-6 py-4 mb-6">
                    <View className="items-center">
                        <Text className="text-white text-2xl font-bold">0</Text>
                        <Text className="text-gray-400 text-sm">Playlist</Text>
                    </View>

                    <TouchableOpacity
                        className="items-center"
                        onPress={handleFollowingPress}
                        activeOpacity={0.7}
                    >
                        <Text className="text-white text-2xl font-bold">
                            {followingCount}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            Đang theo dõi
                        </Text>
                    </TouchableOpacity>

                    <View className="items-center">
                        <Text className="text-white text-2xl font-bold">0</Text>
                        <Text className="text-gray-400 text-sm">
                            Người theo dõi
                        </Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="px-6">
                    {/* Artists Following */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-neutral-800"
                        activeOpacity={0.7}
                        onPress={handleFollowingPress}
                    >
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color="#9CA3AF"
                        />
                        <View className="flex-1 ml-4">
                            <Text className="text-white text-base">
                                Nghệ sĩ theo dõi
                            </Text>
                            <Text className="text-gray-500 text-sm mt-1">
                                {followingCount} nghệ sĩ
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* Account Settings */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-neutral-800"
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color="#9CA3AF"
                        />
                        <Text className="text-white text-base ml-4 flex-1">
                            Cài đặt tài khoản
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* Privacy */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-neutral-800"
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="lock-closed-outline"
                            size={24}
                            color="#9CA3AF"
                        />
                        <Text className="text-white text-base ml-4 flex-1">
                            Quyền riêng tư
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* Notifications */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-neutral-800"
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#9CA3AF"
                        />
                        <Text className="text-white text-base ml-4 flex-1">
                            Thông báo
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* About */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-neutral-800"
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="information-circle-outline"
                            size={24}
                            color="#9CA3AF"
                        />
                        <Text className="text-white text-base ml-4 flex-1">
                            Về ứng dụng
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center py-4 mt-4"
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color="#EF4444"
                        />
                        <Text className="text-red-500 text-base ml-4 font-semibold">
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}

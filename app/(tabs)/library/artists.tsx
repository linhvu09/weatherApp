import { IconSymbol } from "@/components/ui/icon-symbol";
import {
    FollowedArtist,
    followingService,
} from "@/services/following/following.service";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ArtistCard({
    artist,
    onPress,
    onUnfollow,
}: {
    artist: FollowedArtist;
    onPress: () => void;
    onUnfollow: () => void;
}) {
    return (
        <View className="items-center mb-6 w-[30%]">
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onUnfollow}
                activeOpacity={0.7}
            >
                <Image
                    source={{ uri: artist.imageUrl }}
                    className="w-24 h-24 rounded-full mb-2"
                />
                <Text
                    className="text-white font-medium text-sm text-center"
                    numberOfLines={1}
                >
                    {artist.name}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default function ArtistsScreen() {
    const router = useRouter();
    const [artists, setArtists] = useState<FollowedArtist[]>([]);
    const [filteredArtists, setFilteredArtists] = useState<FollowedArtist[]>(
        [],
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [ArtistsCount, setArtistsCount] = useState(0);

    useEffect(() => {
        loadArtists();
    }, []);

    // Reload count khi màn hình focus
    useFocusEffect(
        useCallback(() => {
            loadArtistsCount();
        }, []),
    );

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = artists.filter((artist) =>
                artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredArtists(filtered);
        } else {
            setFilteredArtists(artists);
        }
    }, [searchQuery, artists]);

    const loadArtists = async () => {
        try {
            setLoading(true);
            const followedArtists = await followingService.getFollowedArtists();
            setArtists(followedArtists);
            setFilteredArtists(followedArtists);
        } catch (error) {
            console.error("Error loading artists:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadArtistsCount = async () => {
        try {
            const count = await followingService.getFollowingCount();
            setArtistsCount(count);
        } catch (error) {
            console.error("Error loading Artists count:", error);
        }
    };

    const handleArtistPress = (artist: FollowedArtist) => {
        router.push({
            pathname: "/(tabs)/search/artist/[name]" as any,
            params: {
                id: artist.id,
                name: artist.name,
                img: artist.imageUrl,
            },
        });
    };

    const handleUnfollow = (artist: FollowedArtist) => {
        Alert.alert(
            "Bỏ theo dõi",
            `Bạn có chắc muốn bỏ theo dõi ${artist.name}?`,
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Bỏ theo dõi",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await followingService.unfollowArtist(artist.id);
                            await loadArtists();
                            Alert.alert(
                                "Thành công",
                                `Đã bỏ theo dõi ${artist.name}`,
                            );
                        } catch (error) {
                            Alert.alert("Lỗi", "Không thể bỏ theo dõi");
                        }
                    },
                },
            ],
        );
    };

    const handleAddMore = () => {
        router.push("/(tabs)/search");
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-5 pt-3 pb-4">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <IconSymbol
                            name="chevron.left"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold">
                        Artists Following
                    </Text>
                </View>

                <Text className="text-blue-500 text-sm mb-4">
                    {artists.length} nghệ sĩ đang theo dõi
                </Text>

                {/* Search Bar */}
                <View className="flex-row items-center gap-3">
                    <View className="flex-1 flex-row items-center bg-gray-800 rounded-lg px-4 py-3">
                        <IconSymbol
                            name="magnifyingglass"
                            size={20}
                            color="#9ca3af"
                        />
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="flex-1 ml-3 text-white text-base"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchQuery("")}
                            >
                                <IconSymbol
                                    name="xmark.circle.fill"
                                    size={18}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity className="bg-gray-800 rounded-lg p-3">
                        <IconSymbol
                            name="arrow.up.arrow.down"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Artist Grid */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#1DB954" />
                    <Text className="text-gray-400 mt-4">Đang tải...</Text>
                </View>
            ) : filteredArtists.length === 0 ? (
                <View className="flex-1 justify-center items-center px-8">
                    <IconSymbol
                        name="person.crop.circle.badge.plus"
                        size={64}
                        color="#666"
                    />
                    <Text className="text-gray-400 text-center mt-4 text-base">
                        {searchQuery
                            ? "Không tìm thấy nghệ sĩ"
                            : "Bạn chưa theo dõi nghệ sĩ nào"}
                    </Text>
                    {!searchQuery && (
                        <TouchableOpacity
                            onPress={handleAddMore}
                            className="bg-white rounded-full px-6 py-3 mt-6"
                        >
                            <Text className="text-black font-semibold">
                                Khám phá nghệ sĩ
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-row flex-wrap justify-between">
                        {filteredArtists.map((artist) => (
                            <ArtistCard
                                key={artist.id}
                                artist={artist}
                                onPress={() => handleArtistPress(artist)}
                                onUnfollow={() => handleUnfollow(artist)}
                            />
                        ))}

                        {/* Add More Button */}
                        <View className="items-center mb-6 w-[30%]">
                            <TouchableOpacity
                                className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-2"
                                onPress={handleAddMore}
                            >
                                <IconSymbol
                                    name="plus"
                                    size={32}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                            <Text className="text-white font-medium text-sm">
                                Thêm mới
                            </Text>
                        </View>
                    </View>

                    <View className="h-24" />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

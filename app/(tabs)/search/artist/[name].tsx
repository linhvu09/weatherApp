import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { artistService } from "@/services/artist/artist.service";
import type { SimplifiedAlbumObject } from "@/types/artist";

export default function ArtistDetail() {
    const router = useRouter();
    const { name, img, id } = useLocalSearchParams<{
        name: string;
        img: string;
        id: string;
    }>();

    const [albums, setAlbums] = useState<SimplifiedAlbumObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadArtistAlbums();
        }
    }, [id]);

    const loadArtistAlbums = async () => {
        try {
            setLoading(true);
            const response = await artistService.getArtistAlbums({
                id: id,
                include_groups: "album,single",
                limit: 50,
            });
            setAlbums(response.items);
        } catch (error) {
            console.error("Error loading artist albums:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Ảnh nền */}
                <View className="relative">
                    <Image source={{ uri: img }} className="w-full h-72" />
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.9)"]}
                        className="absolute inset-0"
                    />

                    {/* Nút back */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-5 left-5 bg-black/40 rounded-full p-2"
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>

                    {/* Tên nghệ sĩ */}
                    <View className="absolute bottom-6 left-4">
                        <Text className="text-white text-3xl font-bold">
                            {name}
                        </Text>
                        <Text className="text-gray-300 text-sm mt-1">
                            Artist
                        </Text>
                    </View>
                </View>

                {/* Follow / Share / Play */}
                <View className="flex-row justify-between items-center px-4 mt-4">
                    <Text className="text-gray-400 text-sm">
                        2.3M monthly listeners
                    </Text>
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity className="bg-white rounded-full px-5 py-2">
                            <Text className="font-semibold text-black">
                                Follow
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <Ionicons
                                name="share-outline"
                                size={22}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#1DB954] rounded-full p-3">
                            <Ionicons name="play" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Danh sách bài hát */}
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white text-lg font-semibold">
                            Popular releases
                        </Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#1DB954"
                            className="mt-10"
                        />
                    ) : albums.length > 0 ? (
                        albums.map((album, i) => (
                            <TouchableOpacity
                                key={album.id}
                                className="flex-row items-center mb-4"
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={{
                                        uri:
                                            album.images[0]?.url ||
                                            "https://via.placeholder.com/100",
                                    }}
                                    className="w-14 h-14 rounded-md mr-3"
                                />
                                <View className="flex-1">
                                    <Text
                                        className="text-white text-base font-medium"
                                        numberOfLines={1}
                                    >
                                        {album.name}
                                    </Text>
                                    <Text className="text-gray-400 text-xs mt-1">
                                        {album.album_type} •{" "}
                                        {album.release_date.split("-")[0]} •{" "}
                                        {album.total_tracks} tracks
                                    </Text>
                                </View>
                                <Ionicons
                                    name="ellipsis-vertical"
                                    size={18}
                                    color="gray"
                                    className="ml-auto"
                                />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text className="text-gray-400 text-center mt-10">
                            No releases found
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

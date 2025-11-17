import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
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
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    const maxTotal = 50;

    useEffect(() => {
        if (id) {
            loadAlbums();
        }
    }, [id]);

    const loadAlbums = async (loadMore = false) => {
        try {
            if (loadMore) setLoadingMore(true);
            else setLoading(true);

            const currentOffset = loadMore ? offset : 0;

            const response = await artistService.getArtistAlbums({
                id,
                include_groups: "album,single,appears_on,compilation",
                limit,
                offset: currentOffset,
            });

            const newAlbums = loadMore
                ? [...albums, ...response.items]
                : response.items;

            const limitedAlbums = newAlbums.slice(0, maxTotal);

            setAlbums(limitedAlbums);
            setOffset(currentOffset + response.items.length);
        } catch (error) {
            console.error("Error loading albums:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const renderAlbum = ({ item }: { item: SimplifiedAlbumObject }) => (
        <TouchableOpacity
            key={item.id}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
        >
            <Image
                source={{
                    uri:
                        item.images[0]?.url ||
                        "https://via.placeholder.com/100",
                }}
                className="w-14 h-14 rounded-md mr-3"
            />
            <View className="flex-1">
                <Text
                    className="text-white text-base font-medium"
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                    {item.album_type} • {item.release_date.split("-")[0]} •{" "}
                    {item.total_tracks} tracks
                </Text>
            </View>
            <Ionicons
                name="ellipsis-vertical"
                size={18}
                color="gray"
                className="ml-auto"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Header */}
            <View className="relative">
                <Image source={{ uri: img }} className="w-full h-72" />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.9)"]}
                    className="absolute inset-0"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-5 left-5 bg-black/40 rounded-full p-2"
                >
                    <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <View className="absolute bottom-6 left-4">
                    <Text className="text-white text-3xl font-bold">
                        {name}
                    </Text>
                    <Text className="text-gray-300 text-sm mt-1">Artist</Text>
                </View>
            </View>

            {/* Follow / Share / Play */}
            <View className="flex-row justify-between items-center px-4 mt-4">
                <Text className="text-gray-400 text-sm">
                    2.3M monthly listeners
                </Text>
                <View className="flex-row items-center space-x-4">
                    <TouchableOpacity className="bg-white rounded-full px-5 py-2">
                        <Text className="font-semibold text-black">Follow</Text>
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

            {/* Album list với FlatList và load more */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#1DB954"
                    className="mt-10"
                />
            ) : (
                <FlatList
                    data={albums}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAlbum}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingTop: 16,
                    }}
                    onEndReached={() => {
                        if (albums.length < maxTotal && !loadingMore)
                            loadAlbums(true);
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator color="#1DB954" />
                        ) : null
                    }
                />
            )}
        </SafeAreaView>
    );
}

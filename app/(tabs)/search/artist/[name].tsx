import { usePlayer } from "@/contexts/PlayerContext";
import { albumService } from "@/services/album/album.service";
import { artistService } from "@/services/artist/artist.service";
import { followingService } from "@/services/following/following.service";
import type { SimplifiedAlbumObject } from "@/types/artist";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistDetail() {
    const router = useRouter();
    const { playTrack } = usePlayer();
    const { name, img, id } = useLocalSearchParams<{
        name: string;
        img: string;
        id: string;
    }>();

    const [albums, setAlbums] = useState<SimplifiedAlbumObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const limit = 20;
    const maxTotal = 50;

    useEffect(() => {
        if (id) {
            loadAlbums();
            checkFollowStatus();
        }
    }, [id]);

    const checkFollowStatus = async () => {
        try {
            const status = await followingService.isFollowing(id);
            setIsFollowing(status);
        } catch (error) {
            console.error("Error checking follow status:", error);
        }
    };

    const handleFollowToggle = async () => {
        try {
            setFollowLoading(true);

            const newStatus = await followingService.toggleFollow({
                id,
                name,
                imageUrl: img,
            });

            setIsFollowing(newStatus);

            Alert.alert(
                "Thành công",
                newStatus ? `Đã theo dõi ${name}` : `Đã bỏ theo dõi ${name}`,
            );
        } catch (error) {
            console.error("Error toggling follow:", error);
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái theo dõi");
        } finally {
            setFollowLoading(false);
        }
    };

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

    const handleAlbumPress = async (item: SimplifiedAlbumObject) => {
        if (item.album_type === "single") {
            try {
                const tracks = await albumService.getAlbumTracks(item.id);

                if (tracks && tracks.length > 0) {
                    await playTrack(tracks[0]);
                    router.push({
                        pathname: "/player/[id]",
                        params: { id: tracks[0].id },
                    });
                }
            } catch (error) {
                console.error("Error loading single:", error);
            }
        } else {
            router.push({
                pathname: "/(tabs)/home/album/[id]",
                params: {
                    id: item.id,
                    albumTitle: item.name,
                    subtitle: `${item.album_type} • ${item.artists.map((a) => a.name).join(", ")}`,
                    image:
                        item.images[0]?.url ||
                        "https://via.placeholder.com/300",
                },
            });
        }
    };

    const renderAlbum = ({ item }: { item: SimplifiedAlbumObject }) => (
        <TouchableOpacity
            key={item.id}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
            onPress={() => handleAlbumPress(item)}
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
            <Ionicons name="ellipsis-vertical" size={18} color="gray" />
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
                    {/* Follow Button */}
                    <TouchableOpacity
                        onPress={handleFollowToggle}
                        disabled={followLoading}
                        className={`rounded-full px-5 py-2 ${
                            isFollowing
                                ? "bg-neutral-800 border border-white/20"
                                : "bg-white"
                        }`}
                    >
                        {followLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={isFollowing ? "white" : "black"}
                            />
                        ) : (
                            <Text
                                className={`font-semibold ${
                                    isFollowing ? "text-white" : "text-black"
                                }`}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </Text>
                        )}
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

            {/* Album list */}
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

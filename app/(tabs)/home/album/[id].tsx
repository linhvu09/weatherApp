import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { albumService } from "@/services/album/album.service";
import { NewReleaseTrack } from "@/types/album";

const SongItem: React.FC<{ item: NewReleaseTrack }> = ({ item }) => {
    const handleTrackPress = () => {};
    const handleMenuPress = () => {};

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
            }}
        >
            <TouchableOpacity
                onPress={handleTrackPress}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                }}
            >
                <Image
                    source={{
                        uri:
                            item.albumImageUrl ||
                            "https://via.placeholder.com/80x80.png?text=New",
                    }}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        marginRight: 12,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "600",
                        }}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{ color: "#888", fontSize: 14 }}
                        numberOfLines={1}
                    >
                        {item.artistNames} • {item.albumName}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleMenuPress}
                style={{ paddingVertical: 8, paddingLeft: 12 }}
            >
                <Ionicons name="ellipsis-vertical" size={20} color="gray" />
            </TouchableOpacity>
        </View>
    );
};

export default function AlbumDetailScreen() {
    const params = useLocalSearchParams();
    const { albumTitle, subtitle, image } = params;

    const [albumSongs, setAlbumSongs] = useState<NewReleaseTrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewSongs = async () => {
            try {
                const songs = await albumService.fetchNewReleaseTracks();
                setAlbumSongs(songs);
                setError(null);
            } catch (err: any) {
                console.error("Lỗi khi tải Playlist Ảo:", err);
                setError(
                    "Không thể tải dữ liệu bài hát mới. Vui lòng thử lại.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewSongs();
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#1DB954" />
                <Text style={{ color: "white", marginTop: 10 }}>
                    Đang tải Playlist Mới...
                </Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{ color: "red", textAlign: "center", padding: 20 }}
                >
                    {error}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "black" }}
            edges={["bottom"]}
        >
            <View>
                <View style={{ position: "relative" }}>
                    <Image
                        source={{ uri: image as string }}
                        style={{
                            width: "100%",
                            height: 260,
                            borderRadius: 0,
                        }}
                        resizeMode="cover"
                    />

                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.3)",
                            borderRadius: 0,
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: 8,
                            left: 16,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: 999,
                            padding: 8,
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <View
                        style={{ position: "absolute", bottom: 16, left: 16 }}
                    >
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 16,
                                fontWeight: "500",
                            }}
                        >
                            {subtitle}
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 28,
                                fontWeight: "800",
                            }}
                            numberOfLines={2}
                        >
                            {albumTitle}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: 14,
                        gap: 6,
                        paddingHorizontal: 16,
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name="heart-outline"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons
                            name="play-circle-sharp"
                            size={48}
                            color="#1DB954"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {albumSongs.map((song) => (
                        <SongItem key={song.id} item={song} />
                    ))}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

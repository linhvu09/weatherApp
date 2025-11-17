import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

// --- Dữ liệu Bài hát mô phỏng ---
interface SongData {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image?: string;
}

const MOCK_SONGS: SongData[] = [
    {
        id: "s1",
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: "3:20",
        image: "https://picsum.photos/id/10/200/200",
    },
    {
        id: "s2",
        title: "Heat Waves",
        artist: "Glass Animals",
        duration: "3:58",
        image: "https://picsum.photos/id/20/200/200",
    },
    {
        id: "s3",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "3:23",
        image: "https://picsum.photos/id/30/200/200",
    },
    {
        id: "s4",
        title: "Good 4 u",
        artist: "Olivia Rodrigo",
        duration: "2:58",
        image: "https://picsum.photos/id/40/200/200",
    },
    {
        id: "s5",
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        duration: "2:21",
        image: "https://picsum.photos/id/50/200/200",
    },
    {
        id: "s6",
        title: "Industry Baby",
        artist: "Lil Nas X, Jack Harlow",
        duration: "3:32",
        image: "https://picsum.photos/id/60/200/200",
    },
    {
        id: "s7",
        title: "Peaches",
        artist: "Justin Bieber ft. Daniel Caesar, Giveon",
        duration: "3:18",
        image: "https://picsum.photos/id/70/200/200",
    },
    {
        id: "s8",
        title: "Kiss Me More",
        artist: "Doja Cat ft. SZA",
        duration: "3:28",
        image: "https://picsum.photos/id/80/200/200",
    },
    {
        id: "s9",
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        duration: "4:58",
        image: "https://picsum.photos/id/90/200/200",
    },
    {
        id: "s10",
        title: "Shivers",
        artist: "Ed Sheeran",
        duration: "3:27",
        image: "https://picsum.photos/id/100/200/200",
    },

    // 10 bài thêm, auto picsum id
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `s${i + 11}`,
        title: `Bài hát ${i + 11}`,
        artist: `Nghệ sĩ ${i + 11}`,
        duration: "3:00",
        image: `https://picsum.photos/id/${110 + i}/200/200`,
    })),
];

// Component SongItem
const SongItem: React.FC<{ item: any }> = ({ item }) => (
    <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
        }}
    >
        <Image
            source={{
                uri:
                    item.image ||
                    "https://via.placeholder.com/80x80.png?text=Song",
            }}
            style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
            <Text
                style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                numberOfLines={1}
            >
                {item.title}
            </Text>
            <Text style={{ color: "#888", fontSize: 14 }} numberOfLines={1}>
                {item.artist}
            </Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color="gray" />
    </View>
);

export default function AlbumDetailScreen() {
    const params = useLocalSearchParams();
    const { albumTitle, subtitle, image } = params;

    const insets = useSafeAreaInsets();

    const albumSongs = MOCK_SONGS; // dữ liệu bài hát

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "black" }}
            edges={["bottom"]}
        >
            {/* Header + Nút Play */}
            <View>
                {/* Ảnh bìa */}
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

                    {/* Overlay tối trong suốt */}
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

                    {/* Icon quay lại sát cạnh trên */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: 8, // đảm bảo không bị notch che
                            left: 16,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: 999,
                            padding: 8,
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Title + Subtitle */}
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

                {/* Nút Play + Lưu + 3 chấm */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end", // căn phải
                        alignItems: "center",
                        marginTop: 14,
                        gap: 6, // khoảng cách giữa các icon
                        paddingHorizontal: 16, // cách mép phải
                    }}
                >
                    {/* Icon lưu playlist */}
                    <TouchableOpacity>
                        <Ionicons
                            name="heart-outline"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>

                    {/* Icon 3 chấm */}
                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>

                    {/* Icon Play */}
                    <TouchableOpacity>
                        <Ionicons
                            name="play-circle-sharp"
                            size={48}
                            color="#1DB954"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ScrollView chiếm phần còn lại */}
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

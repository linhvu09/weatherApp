import { RecentlyPlayedItem } from "@/components/library/recently-played-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePlayer } from "@/contexts/PlayerContext";
import type { Song } from "@/types/library";
import { Stack, useRouter } from "expo-router";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LIKED_SONGS: Song[] = [
    {
        id: "1",
        title: "Inside Out",
        artist: "The Chainsmokers, Charlee",
        coverUrl: "https://picsum.photos/200/200?random=1",
        duration: 180000,
    },
    {
        id: "2",
        title: "Young",
        artist: "The Chainsmokers",
        coverUrl: "https://picsum.photos/200/200?random=2",
        duration: 200000,
    },
    {
        id: "3",
        title: "Beach House",
        artist: "The Chainsmokers - Sick",
        coverUrl: "https://picsum.photos/200/200?random=3",
        duration: 190000,
    },
    {
        id: "demo",
        title: "Demo Song",
        artist: "Demo Artist",
        coverUrl: "https://picsum.photos/200/200?random=1",
        duration: 180000,
        preview_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // demo mp3
    },
];

export default function LikedSongsScreen() {
    const router = useRouter();
    const { playTrack, addToQueue } = usePlayer();

    const handleSongPress = (song: Song) => {
        const track = {
            id: song.id,
            name: song.title,
            artists: [{ id: "1", name: song.artist }],
            album: {
                id: "1",
                name: song.title,
                images: [
                    {
                        url: song.coverUrl,
                        height: 640,
                        width: 640,
                    },
                ],
            },
            duration_ms: song.duration,
            preview_url: song.preview_url,
            uri: `spotify:track:${song.id}`,
        };

        const remainingSongs = LIKED_SONGS.slice(
            LIKED_SONGS.findIndex((s) => s.id === song.id) + 1,
        );

        remainingSongs.forEach((s) => {
            addToQueue({
                id: s.id,
                name: s.title,
                artists: [{ id: "1", name: s.artist }],
                album: {
                    id: "1",
                    name: s.title,
                    images: [{ url: s.coverUrl, height: 640, width: 640 }],
                },
                duration_ms: s.duration,
                preview_url: s.preview_url,
                uri: `spotify:track:${s.id}`,
            });
        });

        playTrack(track);

        setTimeout(() => {
            router.push(`/player/${song.id}`);
        }, 0);
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
                        Bài hát yêu thích
                    </Text>
                </View>

                <Text className="text-gray-400 text-sm mb-4">
                    {LIKED_SONGS.length} bài hát
                </Text>

                {/* Search Bar */}
                <View className="flex-row items-center bg-gray-800 rounded-lg px-4 py-3">
                    <IconSymbol
                        name="magnifyingglass"
                        size={20}
                        color="#9ca3af"
                    />
                    <TextInput
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#9ca3af"
                        className="flex-1 ml-3 text-white text-base"
                    />
                    <TouchableOpacity>
                        <IconSymbol
                            name="arrow.up.arrow.down"
                            size={20}
                            color="#9ca3af"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Song List */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {LIKED_SONGS.map((song) => (
                    <RecentlyPlayedItem
                        key={song.id}
                        song={song}
                        onPress={() => handleSongPress(song)}
                        onMorePress={() => console.log("More:", song.title)}
                    />
                ))}

                <View className="h-24" />
            </ScrollView>
        </SafeAreaView>
    );
}

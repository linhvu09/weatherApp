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

const DOWNLOADED_SONGS: Song[] = [
    {
        id: "1",
        title: "Inside Out",
        artist: "The Chainsmokers, Charlee",
        coverUrl: "https://picsum.photos/200/200?random=1",
        duration: 180000, // ms
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
        id: "4",
        title: "Kills You Slowly",
        artist: "The Chainsmokers - World",
        coverUrl: "https://picsum.photos/200/200?random=4",
        duration: 210000,
    },
    {
        id: "5",
        title: "Setting Fires",
        artist: "The Chainsmokers, XYLO",
        coverUrl: "https://picsum.photos/200/200?random=5",
        duration: 195000,
    },
    {
        id: "6",
        title: "Somebody",
        artist: "The Chainsmokers, Drew",
        coverUrl: "https://picsum.photos/200/200?random=6",
        duration: 205000,
    },
    {
        id: "7",
        title: "Thunder",
        artist: "Imagine Dragons - Summer",
        coverUrl: "https://picsum.photos/200/200?random=7",
        duration: 187000,
    },
    {
        id: "8",
        title: "High On Life",
        artist: "Martin Garrix, Bonn - High On",
        coverUrl: "https://picsum.photos/200/200?random=8",
        duration: 223000,
    },
];

export default function DownloadsScreen() {
    const router = useRouter();
    const { playTrack, addToQueue } = usePlayer();

    const handleSongPress = (song: Song) => {
        // Convert Song to Track format
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
            preview_url: `https://example.com/preview/${song.id}`,
            uri: `spotify:track:${song.id}`,
        };

        // Add remaining songs to queue
        const remainingSongs = DOWNLOADED_SONGS.slice(
            DOWNLOADED_SONGS.findIndex((s) => s.id === song.id) + 1,
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
                preview_url: `https://example.com/preview/${s.id}`,
                uri: `spotify:track:${s.id}`,
            });
        });

        // Play track
        playTrack(track);

        // Navigate to player
        router.push(`/player/${song.id}`);
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
                        Tải xuống
                    </Text>
                </View>

                <Text className="text-gray-400 text-sm mb-4">
                    {DOWNLOADED_SONGS.length} bài hát đã tải
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
                {DOWNLOADED_SONGS.map((song) => (
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

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Stack, useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Playlist {
    id: string;
    title: string;
    type: string;
    coverUrl: string;
    author?: string;
}

const PLAYLISTS: Playlist[] = [
    {
        id: "1",
        title: "Maroon 5 Songs",
        type: "Playlist",
        author: "Myself",
        coverUrl: "https://picsum.photos/200/200?random=10",
    },
    {
        id: "2",
        title: "Phonk Madness",
        type: "Playlist",
        coverUrl: "https://picsum.photos/200/200?random=11",
    },
    {
        id: "3",
        title: "Gryffin Collections",
        type: "Playlist",
        author: "Myself",
        coverUrl: "https://picsum.photos/200/200?random=12",
    },
    {
        id: "4",
        title: "John Wick Chapter 4",
        type: "Album",
        coverUrl: "https://picsum.photos/200/200?random=13",
    },
];

function PlaylistCard({ playlist }: { playlist: Playlist }) {
    return (
        <TouchableOpacity className="w-[48%] mb-4" activeOpacity={0.7}>
            <Image
                source={{ uri: playlist.coverUrl }}
                className="w-full aspect-square rounded-lg mb-2"
            />
            <Text
                className="text-white font-semibold text-base"
                numberOfLines={1}
            >
                {playlist.title}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
                {playlist.type} {playlist.author && `• ${playlist.author}`}
            </Text>
        </TouchableOpacity>
    );
}

export default function PlaylistsScreen() {
    const router = useRouter();

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
                        Playlists
                    </Text>
                </View>

                <Text className="text-gray-400 text-sm mb-4">12 playlists</Text>

                {/* Search Bar & Add Button */}
                <View className="flex-row items-center gap-3">
                    <View className="flex-1 flex-row items-center bg-gray-800 rounded-lg px-4 py-3">
                        <IconSymbol
                            name="magnifyingglass"
                            size={20}
                            color="#9ca3af"
                        />
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 ml-3 text-white text-base"
                        />
                    </View>
                    <TouchableOpacity className="bg-gray-800 rounded-lg p-3">
                        <IconSymbol name="plus" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <View className="flex-row items-center mt-4">
                    <TouchableOpacity className="mr-4">
                        <Text className="text-blue-500 text-sm font-semibold border-b-2 border-blue-500 pb-1">
                            Recents
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Playlist Grid */}
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row flex-wrap justify-between">
                    {PLAYLISTS.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </View>

                <View className="h-24" />
            </ScrollView>
        </SafeAreaView>
    );
}

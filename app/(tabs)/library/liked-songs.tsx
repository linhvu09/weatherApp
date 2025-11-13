import { RecentlyPlayedItem } from "@/components/library/recently-played-item";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LIKED_SONGS = [
    {
        id: "1",
        title: "Closer",
        artist: "The Chainsmokers ft. Halsey",
        coverUrl: "https://picsum.photos/200/200?random=5",
        duration: 245,
    },
];

export default function LikedSongsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Liked Songs",
                    headerStyle: { backgroundColor: "#000" },
                    headerTintColor: "#fff",
                }}
            />

            <ScrollView className="flex-1">
                <View className="px-4 py-3">
                    <Text className="text-gray-400 text-sm">120 songs</Text>
                </View>

                {LIKED_SONGS.map((song) => (
                    <RecentlyPlayedItem key={song.id} song={song} />
                ))}

                <View className="h-24" />
            </ScrollView>
        </SafeAreaView>
    );
}

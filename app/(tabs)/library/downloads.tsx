import { RecentlyPlayedItem } from "@/components/library/recently-played-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
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
    duration: 180,
  },
  {
    id: "2",
    title: "Young",
    artist: "The Chainsmokers",
    coverUrl: "https://picsum.photos/200/200?random=2",
    duration: 200,
  },
  {
    id: "3",
    title: "Beach House",
    artist: "The Chainsmokers - Sick",
    coverUrl: "https://picsum.photos/200/200?random=3",
    duration: 190,
  },
  {
    id: "4",
    title: "Kills You Slowly",
    artist: "The Chainsmokers - World",
    coverUrl: "https://picsum.photos/200/200?random=4",
    duration: 210,
  },
  {
    id: "5",
    title: "Setting Fires",
    artist: "The Chainsmokers, XYLO",
    coverUrl: "https://picsum.photos/200/200?random=5",
    duration: 195,
  },
  {
    id: "6",
    title: "Somebody",
    artist: "The Chainsmokers, Drew",
    coverUrl: "https://picsum.photos/200/200?random=6",
    duration: 205,
  },
  {
    id: "7",
    title: "Thunder",
    artist: "Imagine Dragons - Summer",
    coverUrl: "https://picsum.photos/200/200?random=7",
    duration: 187,
  },
  {
    id: "8",
    title: "High On Life",
    artist: "Martin Garrix, Bonn - High On",
    coverUrl: "https://picsum.photos/200/200?random=8",
    duration: 223,
  },
];

export default function DownloadsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="px-5 pt-3 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Downloads</Text>
        </View>

        <Text className="text-gray-400 text-sm mb-4">210 songs downloaded</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-800 rounded-lg px-4 py-3">
          <IconSymbol name="magnifyingglass" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-3 text-white text-base"
          />
          <TouchableOpacity>
            <IconSymbol name="arrow.up.arrow.down" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Song List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {DOWNLOADED_SONGS.map((song) => (
          <RecentlyPlayedItem
            key={song.id}
            song={song}
            onPress={() => console.log("Play:", song.title)}
            onMorePress={() => console.log("More:", song.title)}
          />
        ))}

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}

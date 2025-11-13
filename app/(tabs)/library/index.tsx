// app/(tabs)/library/index.tsx
import { LibraryCard } from "@/components/library/library-card";
import { LibraryHeader } from "@/components/library/library-header";
import { RecentlyPlayedItem } from "@/components/library/recently-played-item";
import type { Song } from "@/types/library";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LIBRARY_CATEGORIES = [
  {
    id: "1",
    title: "Liked Songs",
    count: 120,
    icon: "heart.fill",
    route: "/library/liked-songs",
  },
  {
    id: "2",
    title: "Downloads",
    count: 210,
    icon: "arrow.down.circle.fill",
    route: "/library/downloads",
  },
  {
    id: "3",
    title: "Playlists",
    count: 12,
    icon: "music.note.list",
    route: "/library/playlists",
  },
  {
    id: "4",
    title: "Artists",
    count: 9,
    icon: "person.fill",
    route: "/library/artists",
  },
];

const RECENTLY_PLAYED: Song[] = [
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
];

export default function LibraryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#080808]" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LibraryHeader />

        {/* Library Categories Grid */}
        <View className="px-4 mb-6">
          <View className="flex-row mb-3">
            <LibraryCard {...LIBRARY_CATEGORIES[0]} />
            <LibraryCard {...LIBRARY_CATEGORIES[1]} />
          </View>
          <View className="flex-row">
            <LibraryCard {...LIBRARY_CATEGORIES[2]} />
            <LibraryCard {...LIBRARY_CATEGORIES[3]} />
          </View>
        </View>

        {/* Recently Played Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-5 mb-3">
            <Text className="text-white text-xl font-bold">
              Recently Played
            </Text>
            <TouchableOpacity>
              <Text className="text-gray-400 text-sm font-medium">
                See more
              </Text>
            </TouchableOpacity>
          </View>

          {RECENTLY_PLAYED.map((song) => (
            <RecentlyPlayedItem
              key={song.id}
              song={song}
              onPress={() => console.log("Play:", song.title)}
              onMorePress={() => console.log("More:", song.title)}
            />
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}

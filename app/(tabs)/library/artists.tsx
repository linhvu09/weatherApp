// app/(tabs)/library/artists.tsx
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

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

const FOLLOWING_ARTISTS: Artist[] = [
  {
    id: "1",
    name: "One Republic",
    imageUrl: "https://picsum.photos/200/200?random=20",
  },
  {
    id: "2",
    name: "Coldplay",
    imageUrl: "https://picsum.photos/200/200?random=21",
  },
  {
    id: "3",
    name: "The Chainsmokers",
    imageUrl: "https://picsum.photos/200/200?random=22",
  },
  {
    id: "4",
    name: "Linkin Park",
    imageUrl: "https://picsum.photos/200/200?random=23",
  },
  { id: "5", name: "Sia", imageUrl: "https://picsum.photos/200/200?random=24" },
  {
    id: "6",
    name: "Ellie Goulding",
    imageUrl: "https://picsum.photos/200/200?random=25",
  },
  {
    id: "7",
    name: "Katy Perry",
    imageUrl: "https://picsum.photos/200/200?random=26",
  },
  {
    id: "8",
    name: "Maroon 5",
    imageUrl: "https://picsum.photos/200/200?random=27",
  },
];

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <View className="items-center mb-6 w-[30%]">
      <Image
        source={{ uri: artist.imageUrl }}
        className="w-24 h-24 rounded-full mb-2"
      />
      <Text
        className="text-white font-medium text-sm text-center"
        numberOfLines={1}
      >
        {artist.name}
      </Text>
    </View>
  );
}

export default function ArtistsScreen() {
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
          <Text className="text-white text-2xl font-bold">
            Artists Following
          </Text>
        </View>

        <Text className="text-blue-500 text-sm mb-4">8 artists following</Text>

        {/* Search Bar */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-gray-800 rounded-lg px-4 py-3">
            <IconSymbol name="magnifyingglass" size={20} color="#9ca3af" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-3 text-white text-base"
            />
          </View>
          <TouchableOpacity className="bg-gray-800 rounded-lg p-3">
            <IconSymbol name="arrow.up.arrow.down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Artist Grid */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {FOLLOWING_ARTISTS.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}

          {/* Add More Button */}
          <View className="items-center mb-6 w-[30%]">
            <TouchableOpacity className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-2">
              <IconSymbol name="plus" size={32} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white font-medium text-sm">Add More</Text>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}

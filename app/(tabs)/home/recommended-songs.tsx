import { LinearGradient } from "expo-linear-gradient";
import { Heart, MoreVertical, Play } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Song {
  id: number;
  title: string;
  artist: string;
  imageSource: ImageSourcePropType;
}

interface Playlist {
  title: string;
  songCount: number;
  coverSource: ImageSourcePropType;
}

interface MockDataPlaylistContainer {
  playlist: Playlist;
  songs: Song[];
}

const mockData: MockDataPlaylistContainer[] = [
  {
    playlist: {
      title: "Peace",
      songCount: 22,
      coverSource: { uri: "https://picsum.photos/400/400?random=1&blur=1" },
    },
    songs: [
      {
        id: 1,
        title: "Weightless",
        artist: "Marconi Union",
        imageSource: { uri: "https://picsum.photos/100/100?random=2" },
      },
      {
        id: 2,
        title: "Nothing It Can",
        artist: "Helios",
        imageSource: { uri: "https://picsum.photos/100/100?random=3" },
      },
      {
        id: 3,
        title: "Small Memory",
        artist: "Jon Hopkins - Insides",
        imageSource: { uri: "https://picsum.photos/100/100?random=4" },
      },
      {
        id: 4,
        title: "Close To Home",
        artist: "Lyle Mays",
        imageSource: { uri: "https://picsum.photos/100/100?random=5" },
      },
      {
        id: 5,
        title: "A New Day",
        artist: "Calm Collective",
        imageSource: { uri: "https://picsum.photos/100/100?random=6" },
      },
      {
        id: 6,
        title: "Stillness",
        artist: "Ambient Soundscape",
        imageSource: { uri: "https://picsum.photos/100/100?random=7" },
      },
    ],
  },
  {
    playlist: {
      title: "Chill Vibes",
      songCount: 15,
      coverSource: { uri: "https://picsum.photos/400/400?random=8&blur=1" },
    },
    songs: [
      {
        id: 7,
        title: "Sunset Drive",
        artist: "Lo-Fi Beats",
        imageSource: { uri: "https://picsum.photos/100/100?random=9" },
      },
      {
        id: 8,
        title: "Rainy Day",
        artist: "The Quiet",
        imageSource: { uri: "https://picsum.photos/100/100?random=10" },
      },
      {
        id: 9,
        title: "Midnight City",
        artist: "Neon Dreams",
        imageSource: { uri: "https://picsum.photos/100/100?random=11" },
      },
      {
        id: 10,
        title: "Coffee Jazz",
        artist: "Smooth Tunes",
        imageSource: { uri: "https://picsum.photos/100/100?random=12" },
      },
    ],
  },
  {
    playlist: {
      title: "Focus Mode",
      songCount: 30,
      coverSource: { uri: "https://picsum.photos/400/400?random=13&blur=1" },
    },
    songs: [
      {
        id: 11,
        title: "Deep Work",
        artist: "Mind Flow",
        imageSource: { uri: "https://picsum.photos/100/100?random=14" },
      },
      {
        id: 12,
        title: "Code Ambient",
        artist: "Binary Sounds",
        imageSource: { uri: "https://picsum.photos/100/100?random=15" },
      },
      {
        id: 13,
        title: "Study Loop",
        artist: "Brain Waves",
        imageSource: { uri: "https://picsum.photos/100/100?random=16" },
      },
    ],
  },
];

interface SongItemProps {
  title: string;
  artist: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}

const SongItem: React.FC<SongItemProps> = ({
  title,
  artist,
  imageSource,
  onPress,
}) => (
  <TouchableOpacity
    className="flex-row items-center py-1 h-16"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center flex-1">
      <Image
        source={imageSource}
        className="w-11 h-11 rounded-sm mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-white text-base font-medium" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-gray-400 text-sm" numberOfLines={1}>
          {artist}
        </Text>
      </View>
    </View>
    <TouchableOpacity className="p-2 ml-2">
      <MoreVertical size={20} color="#9ca3af" />
    </TouchableOpacity>
  </TouchableOpacity>
);

interface PlaylistCardProps {
  playlist: Playlist;
  songs: Song[];
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, songs }) => (
  <LinearGradient
    colors={["#1f1f1f", "#1b1b1b", "#000000"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{
      width: SCREEN_WIDTH * 0.75,
      borderRadius: 16,
      padding: 16,
      marginRight: 16,
    }}
  >
    <View className="flex-col justify-between">
      <View className="flex-row items-start justify-between mb-5">
        <Image
          source={playlist.coverSource}
          className="w-32 h-32 rounded-lg mr-4"
          resizeMode="cover"
        />

        <View className="flex-1 h-32 justify-between">
          <Text
            className="text-white text-[20px] font-bold w-full leading-6"
            numberOfLines={2}
          >
            {playlist.title}
          </Text>

          <View className="flex-row items-center justify-between mt-2">
            <View>
              <Text className="text-gray-400 text-sm mb-2">
                {playlist.songCount} songs
              </Text>

              <View className="flex-row items-center">
                <TouchableOpacity className="p-2">
                  <Heart size={20} color="#9ca3af" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 ml-1">
                  <MoreVertical size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="bg-white rounded-full p-3 shadow shadow-black/50">
              <Play size={22} color="black" fill="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mt-1">
        {songs.slice(0, 4).map((song) => (
          <SongItem
            key={song.id}
            title={song.title}
            artist={song.artist}
            imageSource={song.imageSource}
          />
        ))}

        {Array(4 - Math.min(4, songs.length))
          .fill(0)
          .map((_, idx) => (
            <View key={`placeholder-${idx}`} className="h-16" />
          ))}
      </View>

      <TouchableOpacity className="mt-5 self-end bg-white px-5 py-2 rounded-full">
        <Text className="text-black font-semibold">See All</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

interface HorizontalPlaylistListProps {
  data: MockDataPlaylistContainer[];
}

const HorizontalPlaylistList: React.FC<HorizontalPlaylistListProps> = ({
  data,
}) => (
  <View className="mb-6">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4"
    >
      {data.map((item, index) => (
        <PlaylistCard key={index} playlist={item.playlist} songs={item.songs} />
      ))}
    </ScrollView>
  </View>
);

export default function RecommendedSongs() {
  return (
    <ScrollView className="flex-1 bg-transparent pt-12">
      <Text className="text-3xl text-gray-200 mb-6 px-4">
        Recommended songs
      </Text>

      <HorizontalPlaylistList data={mockData} />
    </ScrollView>
  );
}

import { Heart, MoreVertical, Play } from "lucide-react-native";
import React from "react";
import {
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
}

const SongItem: React.FC<SongItemProps> = ({ title, artist, imageSource }) => (
  <View className="flex-row items-center py-1 h-16">
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
  </View>
);

interface PlaylistCardProps {
  playlist: Playlist;
  songs: Song[];
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, songs }) => (
  <View className="bg-neutral-900 rounded-lg p-3 mr-4 w-80 flex-col justify-between">
    <View>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-start flex-1">
          <Image
            source={playlist.coverSource}
            className="w-28 h-28 rounded-md mr-4"
            resizeMode="cover"
          />
          <View className="flex-1 flex-col justify-between h-28">
            <View>
              <Text
                className="text-white text-xl font-bold mb-1"
                numberOfLines={2}
              >
                {playlist.title}
              </Text>
              <Text className="text-gray-400 text-sm">
                {playlist.songCount} songs
              </Text>
            </View>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="p-1">
                <Heart size={20} color="#9ca3af" fill="transparent" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1">
                <MoreVertical size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity className="bg-white rounded-full p-3 ml-4 shadow-lg shadow-black/50 self-end">
          <Play size={24} color="black" fill="black" />
        </TouchableOpacity>
      </View>

      <View>
        {songs.slice(0, 4).map((song) => (
          <SongItem
            key={song.id}
            title={song.title}
            artist={song.artist}
            imageSource={song.imageSource}
          />
        ))}
      </View>
    </View>

    <TouchableOpacity className="mt-4 self-end bg-white px-5 py-2 rounded-full">
      <Text className="text-black font-semibold">See All</Text>
    </TouchableOpacity>
  </View>
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

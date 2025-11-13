import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PlaylistItem {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const data: PlaylistItem[] = [
  {
    id: "1",
    title: "Inside Out",
    image: { uri: "https://picsum.photos/seed/recent_1/160/160" },
  },
  {
    id: "2",
    title: "Young",
    image: { uri: "https://picsum.photos/seed/recent_2/160/160" },
  },
  {
    id: "3",
    title: "Beach House",
    image: { uri: "https://picsum.photos/seed/recent_3/160/160" },
  },
  {
    id: "4",
    title: "Kills You",
    image: { uri: "https://picsum.photos/seed/recent_4/160/160" },
  },
  {
    id: "5",
    title: "Good Days",
    image: { uri: "https://picsum.photos/seed/recent_5/160/160" },
  },
];

function PlaylistCard({ item }: { item: PlaylistItem }): React.JSX.Element {
  const ITEM_SIZE = 112;
  const PLAY_BUTTON_SIZE = 35;

  return (
    <TouchableOpacity className="mr-4 w-[112px]">
      <View
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        className="rounded-lg overflow-hidden relative shadow-lg"
      >
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute bottom-2 left-2">
          <View
            style={{ width: PLAY_BUTTON_SIZE, height: PLAY_BUTTON_SIZE }}
            className="bg-white rounded-full items-center justify-center"
          >
            <Text className="text-black text-2xl font-bold ml-[2px]">▶</Text>
          </View>
        </View>

        <View className="absolute inset-0 border-white/20 border-[0.5px] rounded-lg" />
      </View>

      <Text className="text-white text-base mt-2 text-left" numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const renderPlaylistItem: ListRenderItem<PlaylistItem> = ({ item }) => (
  <PlaylistCard item={item} />
);

export default function RecentlyPlayed() {
  return (
    <View className="bg-transparent py-4 dark:bg-transparent pl-2 pt-0">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-gray-200 text-3xl ">Recently Played</Text>
        <TouchableOpacity>
          <Text className="text-gray-400 text-base font-semibold">
            See more
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
      />
    </View>
  );
}

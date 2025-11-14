import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TopPlaylists() {
  const playlistsData = [
    {
      id: 1,
      title: "Hip Hop Central 2024",
      imageUrl: "https://picsum.photos/seed/hiphop/200/200",
    },
    {
      id: 2,
      title: "Chill Vibes: Lo-Fi Study Beats",
      imageUrl: "https://picsum.photos/seed/lofi/200/200",
    },
    {
      id: 3,
      title: "Pop Hits 2020s",
      imageUrl: "https://picsum.photos/seed/pophits/200/200",
    },
    {
      id: 4,
      title: "Workout: High Energy EDM",
      imageUrl: "https://picsum.photos/seed/edm/200/200",
    },
    {
      id: 5,
      title: "Indie Folk & Acoustic",
      imageUrl: "https://picsum.photos/seed/indiefolk/200/200",
    },
    {
      id: 6,
      title: "Jazz Classics: Smooth & Cool",
      imageUrl: "https://picsum.photos/seed/jazz/200/200",
    },
  ];

  return (
    <View className="bg-transparent py-4 dark:bg-transparent pl-2 pt-0">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-gray-200 text-3xl">Top Playlists</Text>
        <TouchableOpacity>
          <Text className="text-gray-400 text-base font-semibold">
            See more
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
      >
        {playlistsData.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="mr-3 w-40"
            activeOpacity={0.6}
            onPress={() => {}}
          >
            <View className="w-full aspect-square rounded-lg overflow-hidden mb-2">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <Text className="text-white text-sm" numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

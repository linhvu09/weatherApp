import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ArtistsYouFollow() {
  const artistsData = [
    {
      id: 1,
      title: "Maroon 5: Best of the best",
      imageUrl: "https://picsum.photos/seed/maroon5_best/200/200",
    },
    {
      id: 2,
      title: "This is Maroon 5",
      imageUrl: "https://picsum.photos/seed/maroon5_thisis/200/200",
    },
    {
      id: 3,
      title: "Adam Levine - Solo Hits",
      imageUrl: "https://picsum.photos/seed/adamlevine/200/200",
    },
    {
      id: 4,
      title: "Imagine Dragons Collection",
      imageUrl: "https://picsum.photos/seed/imaginedragons/200/200",
    },
    {
      id: 5,
      title: "The Chainsmokers Mix",
      imageUrl: "https://picsum.photos/seed/chainsmokers/200/200",
    },
    {
      id: 6,
      title: "Rock Essentials Playlist",
      imageUrl: "https://picsum.photos/seed/rockessentials/200/200",
    },
  ];

  return (
    <View className="bg-transparent py-4 dark:bg-transparent pl-2 pt-7">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-gray-200 text-3xl">From Artists You Follow</Text>
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
        {artistsData.map((item) => (
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

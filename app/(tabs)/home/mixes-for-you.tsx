import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MixesForYou() {
  const mixesData = [
    {
      id: 1,
      title: "Mix 1",
      artists: "Calvin Harris, Martin Garrix, Dewain Whi...",
      imageUrl: "https://picsum.photos/seed/mix1/200/200",
    },
    {
      id: 2,
      title: "Mix 2",
      artists: "A R Rahman, Harris Jeyaraj, Yuvan Sha...",
      imageUrl: "https://picsum.photos/seed/mix2/200/200",
    },
    {
      id: 3,
      title: "Mix 3",
      artists: "Maroon 5, Imagine Dragons, C...",
      imageUrl: "https://picsum.photos/seed/mix3/200/200",
    },
    {
      id: 4,
      title: "Mix 4",
      artists: "The Weekend, Dua Lipa, Doja Cat...",
      imageUrl: "https://picsum.photos/seed/mix4/200/200",
    },
  ];

  return (
    <View className="flex-1 bg-transparent pl-2">
      <Text className="text-gray-200 text-3xl mb-4 pl-4">Mixes for you</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
      >
        {mixesData.map((mix) => (
          <TouchableOpacity
            key={mix.id}
            className="mr-3 w-40"
            activeOpacity={0.6}
            onPress={() => {}}
          >
            <View className="w-full aspect-square rounded-lg overflow-hidden mb-2">
              <Image
                source={{ uri: mix.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />

              <View className="absolute bottom-2 left-1 bg-black/70 px-2 py-0.5 rounded">
                <Text className="text-white text-xs font-semibold">
                  {mix.title}
                </Text>
              </View>
            </View>

            <Text className="text-gray-300 text-sm" numberOfLines={2}>
              {mix.artists}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

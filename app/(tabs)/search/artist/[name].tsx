import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistDetail() {
    const router = useRouter();
    const { name, img } = useLocalSearchParams<{ name: string; img: string }>();

    // Dữ liệu bài hát mẫu (sau này bạn có thể fetch theo artist.name)
    const songs = [
        {
            title: "Bài hát 1",
            album: `${name} - Album 1`,
            cover: "https://upload.wikimedia.org/wikipedia/en/2/28/Maroon_5_Misery.jpg",
        },
        {
            title: "Bài hát 2",
            album: `${name} - Album 2`,
            cover: "https://upload.wikimedia.org/wikipedia/en/6/67/Maroon_5_-_Overexposed.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
        {
            title: "Bài hát 3",
            album: `${name} - Album 3`,
            cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_V_%28Official_Album_Cover%29.png",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Ảnh nền */}
                <View className="relative">
                    <Image source={{ uri: img }} className="w-full h-72" />
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.9)"]}
                        className="absolute inset-0"
                    />

                    {/* Nút back */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-5 left-5 bg-black/40 rounded-full p-2"
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>

                    {/* Tên nghệ sĩ */}
                    <View className="absolute bottom-6 left-4">
                        <Text className="text-white text-3xl font-bold">
                            {name}
                        </Text>
                        <Text className="text-gray-300 text-sm mt-1">
                            Artist
                        </Text>
                    </View>
                </View>

                {/* Follow / Share / Play */}
                <View className="flex-row justify-between items-center px-4 mt-4">
                    <Text className="text-gray-400 text-sm">
                        2.3M monthly listeners
                    </Text>
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity className="bg-white rounded-full px-5 py-2">
                            <Text className="font-semibold text-black">
                                Follow
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <Ionicons
                                name="share-outline"
                                size={22}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#1DB954] rounded-full p-3">
                            <Ionicons name="play" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Danh sách bài hát */}
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white text-lg font-semibold">
                            Popular releases
                        </Text>
                        <Text className="text-gray-400 text-sm">See more</Text>
                    </View>

                    {songs.map((song, i) => (
                        <TouchableOpacity
                            key={i}
                            className="flex-row items-center mb-4"
                            activeOpacity={0.7}
                        >
                            <Image
                                source={{ uri: song.cover }}
                                className="w-14 h-14 rounded-md mr-3"
                            />
                            <View className="flex-1">
                                <Text className="text-white text-base font-medium">
                                    {song.title}
                                </Text>
                                <Text className="text-gray-400 text-xs mt-1">
                                    {song.album}
                                </Text>
                            </View>
                            <Ionicons
                                name="ellipsis-vertical"
                                size={18}
                                color="gray"
                                className="ml-auto"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

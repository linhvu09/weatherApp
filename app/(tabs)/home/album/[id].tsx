import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Helper để xử lý ImageSourcePropType
function getImageSource(image: ImageSourcePropType): ImageSourcePropType {
    if (typeof image === "number") {
        // local image
        return image;
    } else if (Array.isArray(image)) {
        // nếu là mảng, lấy phần tử đầu tiên
        return image[0];
    } else {
        // chắc chắn là { uri: string }
        return image;
    }
}

export default function AlbumDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const albumId = params.id as string;
    const albumTitle = params.albumTitle as string;
    const subtitle = params.subtitle as string;
    const imageParam = params.image;

    // Xử lý image
    const imageSource = getImageSource(imageParam as ImageSourcePropType);

    // Ví dụ track list tĩnh
    const tracks = [
        { id: "1", title: "Track One", duration: "3:12" },
        { id: "2", title: "Track Two", duration: "4:02" },
        { id: "3", title: "Track Three", duration: "2:45" },
        { id: "4", title: "Track Four", duration: "3:58" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* HEADER IMAGE */}
            <View className="w-full h-[360px] relative">
                <Image
                    source={imageSource}
                    className="w-full h-full absolute"
                    resizeMode="cover"
                />
                {/* Gradient overlay */}
                <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

                {/* Back button */}
                <View className="absolute top-5 left-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-white text-lg">← Back</Text>
                    </TouchableOpacity>
                </View>

                {/* Album title + subtitle */}
                <View className="absolute bottom-6 px-4">
                    <Text className="text-gray-300 text-base font-semibold mb-1">
                        {subtitle}
                    </Text>
                    <Text
                        className="text-white text-4xl font-extrabold"
                        numberOfLines={3}
                    >
                        {albumTitle}
                    </Text>
                </View>
            </View>

            {/* PLAY BUTTON */}
            <View className="px-4 mt-4">
                <TouchableOpacity className="bg-green-500 py-3 rounded-full flex-row items-center justify-center">
                    <Text className="text-black text-lg font-bold">
                        ▶ PLAY
                    </Text>
                </TouchableOpacity>
            </View>

            {/* TRACK LIST */}
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id}
                className="mt-6 px-4"
                renderItem={({ item }) => (
                    <View className="flex-row justify-between py-3 border-b border-gray-800">
                        <Text className="text-white text-base">
                            {item.title}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            {item.duration}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

import { useRouter } from "expo-router";
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

const CARD_WIDTH = 360;
const CARD_HEIGHT = 192;

interface AlbumData {
    id: string;
    title: string;
    subtitle: string;
    image: ImageSourcePropType;
}

const data: AlbumData[] = [
    {
        id: "1",
        title: "ENGLISH SONGS",
        subtitle: "New Release",
        image: { uri: "https://picsum.photos/seed/music_feature/400/200" },
    },
    {
        id: "2",
        title: "GLOBAL HITS",
        subtitle: "Top Playlist",
        image: { uri: "https://picsum.photos/seed/album_happier/400/200" },
    },
    {
        id: "3",
        title: "CHILLHOP PLAYLIST",
        subtitle: "Focus Time",
        image: { uri: "https://picsum.photos/seed/album_x/400/200" },
    },
    {
        id: "4",
        title: "POP ANTHEMS",
        subtitle: "Collection 2024",
        image: { uri: "https://picsum.photos/seed/album_y/400/200" },
    },
];

function AlbumItem({ item }: { item: AlbumData }) {
    const router = useRouter();

    const handlePress = () => {
        let imageUri: string;

        if (typeof item.image === "number") {
            imageUri = item.image.toString();
        } else if (Array.isArray(item.image)) {
            imageUri = item.image[0]?.uri ?? "";
        } else {
            imageUri = item.image.uri ?? "";
        }

        router.push({
            pathname: `/(tabs)/home/album/${item.id}` as any,
            params: {
                albumTitle: item.title,
                subtitle: item.subtitle,
                image: imageUri,
            },
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            className="mr-3 rounded-3xl overflow-hidden relative"
        >
            <Image
                source={item.image}
                className="w-full h-full absolute"
                resizeMode="cover"
            />

            <View className="absolute inset-0 flex-row bg-black/30">
                <View className="flex-1 justify-center p-4">
                    <Text
                        className="text-gray-300 text-lg font-semibold mb-1"
                        numberOfLines={1}
                    >
                        {item.subtitle}
                    </Text>

                    <Text
                        className="text-white text-3xl font-extrabold leading-9 drop-shadow-lg"
                        numberOfLines={3}
                    >
                        {item.title}
                    </Text>
                </View>

                <View className="flex-1" />
            </View>
        </TouchableOpacity>
    );
}

const renderAlbumItem: ListRenderItem<AlbumData> = ({ item }) => (
    <AlbumItem item={item} />
);

export default function FeaturingToday() {
    return (
        <View className="bg-transparent py-4 dark:bg-transparent pl-2 pt-6">
            <Text className="text-gray-200 text-3xl mb-4 px-4 ">
                Featuring Today
            </Text>

            <FlatList
                data={data}
                renderItem={renderAlbumItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 10,
                }}
                snapToInterval={CARD_WIDTH + 12}
                decelerationRate="fast"
            />
        </View>
    );
}

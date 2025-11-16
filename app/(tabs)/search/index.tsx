import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    const router = useRouter();

    const trendingArtists = [
        {
            name: "Sơn Tùng M-TP",
            img: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
        },
        {
            name: "Hà Anh Tuấn",
            img: "https://yt3.googleusercontent.com/enG03m1WKMfZL8ym-8fbtPPDA2uGOX3t1NIWVxltWdJHTmYKsT7LeWYbtrNI7c-PZlB2IqyaqA=s900-c-k-c0x00ffffff-no-rj",
        },
        {
            name: "Mr.Siro",
            img: "https://i.scdn.co/image/ab6761610000e5eb4371fb198b011bb666a3bfde",
        },
        {
            name: "Nguyễn Hùng",
            img: "https://photo-resize-zmp3.zadn.vn/w360_r1x1_jpeg/avatars/6/4/6/8/6468d72b31f09ac99990c94eff16afca.jpg",
        },
        {
            name: "Vũ",
            img: "https://trixie.com.vn/media/images/article/94610382/vu-p-16067234297342144615946.png",
        },
        {
            name: "Erik",
            img: "https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/7/8/erik-4-17204277188992053578208-0-0-900-1440-crop-17204281126641794292020.jpg",
        },
    ];

    const categories = [
        {
            name: "Chill",
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-chill-2-2.jpg",
        },
        {
            name: "Tâm Trạng",
            img: "https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/th%C6%A1%20bu%E1%BB%93n%20ng%E1%BA%AFn%202%20c%C3%A2u/tho-buon-ngan-2-cau-thumb.jpg",
        },
        {
            name: "POP",
            img: "https://cdn2.fptshop.com.vn/unsafe/800x0/nhac_pop_la_gi_1_d4c8bbe2c9.png",
        },
        {
            name: "HIP-HOP",
            img: "https://vanhoaduongpho.com/storage/news/cac-phong-cach-nhac-hip-hop-phan-3_2020.png",
        },
        {
            name: "DANCE",
            img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/nhac_dance_42b5e42487.jpg",
        },
        {
            name: "COUNTRY",
            img: "https://media.vneconomy.vn/images/upload/2021/04/21/img20170525174015531.jpg",
        },
        {
            name: "Cổ Điển",
            img: "https://thienvu.com.vn/image/catalog/image2/tin-tuc/nhac-co-dien/nhac-co-dien.jpg",
        },
        {
            name: "JAZZ",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0BvdDDGez-jMBU71Z3UXAxgi2v5IBqpUYzA&s",
        },
        {
            name: "Blues",
            img: "https://cdn2.fptshop.com.vn/unsafe/nhac_blues_6_293cd83ac7.png",
        },
        {
            name: "Ballad",
            img: "https://file.hstatic.net/200000433953/file/nhac_ballad_la_gi_9968e4c40f92449bb35e980e58f06fb6.jpg",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#080808]">
            <ScrollView className="flex-1 px-4">
                {/* Ô tìm kiếm */}
                <Pressable onPress={() => router.push("./search/history")}>
                    <View className="flex-row items-center bg-neutral-900 rounded-full px-4 py-2 mt-6">
                        <Ionicons name="search" size={30} color="gray" />
                        <Text className="ml-2 text-gray-400 flex-1">
                            Search songs, artist, album or playlist
                        </Text>
                    </View>
                </Pressable>

                {/* Trending Artists */}
                <View className="mt-5">
                    <Text className="text-white text-lg font-semibold mb-3">
                        🔥 Trending artists
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                    >
                        {trendingArtists.map((artist, index) => (
                            <TouchableOpacity
                                key={index}
                                className="items-center mr-7"
                                onPress={() =>
                                    router.push({
                                        pathname:
                                            "/(tabs)/search/artist/[name]" as any,
                                        params: {
                                            name: artist.name,
                                            img: artist.img,
                                        },
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: artist.img }}
                                    className="w-20 h-20 rounded-full"
                                />
                                <Text
                                    className="text-white text-xs mt-1 text-center w-20"
                                    numberOfLines={2}
                                >
                                    {artist.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Browse */}
                <View className="mt-6 mb-4">
                    <Text className="text-white text-lg font-semibold mb-3">
                        Browse
                    </Text>
                    <View className="flex-row flex-wrap justify-between">
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                className="w-[48%] h-28 mb-7 rounded-xl overflow-hidden"
                            >
                                <Image
                                    source={{ uri: cat.img }}
                                    className="w-full h-full absolute opacity-80"
                                />
                                <View className="absolute inset-0 bg-black/30" />
                                <Text className="text-white text-lg font-bold absolute bottom-2 left-2">
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

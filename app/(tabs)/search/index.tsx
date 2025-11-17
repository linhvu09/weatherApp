import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearch } from "@/hooks/useSearch";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { artistService } from "@/services/artist/artist.service";

export default function SearchScreen() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [trendingArtists, setTrendingArtists] = useState<any[]>([]);
    const [loadingTrending, setLoadingTrending] = useState(true);

    const { history, addHistory, removeHistoryItem, clearHistory } =
        useSearchHistory();
    const { result, loading, onSearch } = useSearch();

    // Load trending artists khi component mount
    useEffect(() => {
        loadTrendingArtists();
    }, []);

    const loadTrendingArtists = async () => {
        try {
            setLoadingTrending(true);
            const artists = await artistService.getTrendingArtists(10);

            setTrendingArtists(artists);
        } catch (error) {
            console.error("Error loading trending artists:", error);
        } finally {
            setLoadingTrending(false);
        }
    };

    // SEARCH REALTIME – LƯU LỊCH SỬ CHỈ KHI CÓ TEXT
    useEffect(() => {
        if (query.trim().length === 0) return;

        const timeout = setTimeout(() => {
            onSearch(query);
            addHistory(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // SWIPE BACK – CHỈ NHẬN VUỐT NGANG, HẠN CHẾ VUỐT CHÉO
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => {
            return Math.abs(g.dx) > 20 && Math.abs(g.dx) > Math.abs(g.dy);
        },
        onPanResponderRelease: (_, g) => {
            if (g.dx > 80 && Math.abs(g.dy) < 30) {
                router.back();
            }
        },
    });

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
        <SafeAreaView
            className="flex-1 bg-[#080808]"
            {...panResponder.panHandlers}
        >
            <ScrollView className="flex-1 px-4">
                {/* SEARCH BAR */}
                <View className="flex-row items-center bg-neutral-900 rounded-full px-4 py-2 mt-6">
                    <Ionicons name="search" size={28} color="gray" />

                    <TextInput
                        placeholder="Search songs, artist, album or playlist..."
                        placeholderTextColor="gray"
                        value={query}
                        onChangeText={setQuery}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="ml-2 flex-1 text-white"
                    />

                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons
                                name="close-circle"
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* LỊCH SỬ TÌM KIẾM */}
                {query.trim().length === 0 &&
                    !focused &&
                    history.length > 0 && (
                        <View className="mt-8">
                            <View className="flex-row justify-between mb-3">
                                <Text className="text-white text-lg font-semibold">
                                    Lịch sử tìm kiếm
                                </Text>

                                <TouchableOpacity onPress={clearHistory}>
                                    <Text className="text-red-400 text-sm">
                                        Xoá hết
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {history.map((item, index) => (
                                <View
                                    key={index}
                                    className="flex-row items-center justify-between mb-3"
                                >
                                    <TouchableOpacity
                                        className="flex-row items-center flex-1"
                                        onPress={() => {
                                            setQuery(item);
                                            onSearch(item);
                                        }}
                                    >
                                        <Ionicons
                                            name="time"
                                            size={18}
                                            color="gray"
                                        />
                                        <Text className="text-white ml-2">
                                            {item}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => removeHistoryItem(item)}
                                    >
                                        <Ionicons
                                            name="close"
                                            size={18}
                                            color="gray"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}

                {/* LOADING */}
                {loading && (
                    <View className="mt-4">
                        <ActivityIndicator color="white" />
                    </View>
                )}

                {/* SEARCH RESULT */}
                {result && query.trim().length > 0 && (
                    <View className="mt-6">
                        {/* Artists */}
                        {result.artists?.items?.length > 0 && (
                            <>
                                <Text className="text-white text-lg font-semibold mb-3">
                                    Artists
                                </Text>

                                {result.artists.items.map((artist: any) => (
                                    <TouchableOpacity
                                        key={artist.id}
                                        className="flex-row items-center mb-4"
                                        onPress={() =>
                                            router.push({
                                                pathname:
                                                    "/(tabs)/search/artist/[name]" as any,
                                                params: {
                                                    id: artist.id,
                                                    name: artist.name,
                                                    img: artist.images?.[0]
                                                        ?.url,
                                                },
                                            })
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri: artist.images?.[0]?.url,
                                            }}
                                            className="w-16 h-16 rounded-full mr-4"
                                        />
                                        <Text className="text-white text-base">
                                            {artist.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}

                        {/* Tracks */}
                        {result.tracks?.items?.length > 0 && (
                            <>
                                <Text className="text-white text-lg font-semibold mt-5 mb-3">
                                    Tracks
                                </Text>

                                {result.tracks.items.map((track: any) => (
                                    <View
                                        key={track.id}
                                        className="flex-row items-center mb-4"
                                    >
                                        <Image
                                            source={{
                                                uri: track.album.images?.[0]
                                                    ?.url,
                                            }}
                                            className="w-14 h-14 rounded-lg mr-4"
                                        />
                                        <View>
                                            <Text className="text-white text-base">
                                                {track.name}
                                            </Text>
                                            <Text className="text-gray-400 text-sm">
                                                {track.artists[0].name}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                )}

                {/* TRENDING */}
                {query.trim().length === 0 && (
                    <View className="mt-10">
                        <Text className="text-white text-lg font-semibold mb-3">
                            🔥 Đề xuất
                        </Text>

                        {loadingTrending ? (
                            <ActivityIndicator color="#1DB954" size="small" />
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {trendingArtists.map((artist, index) => (
                                    <TouchableOpacity
                                        key={artist.id || index}
                                        className="items-center mr-7"
                                        onPress={() =>
                                            router.push({
                                                pathname:
                                                    "/(tabs)/search/artist/[name]" as any,
                                                params: {
                                                    id: artist.id,
                                                    name: artist.name,
                                                    img:
                                                        artist.images?.[0]
                                                            ?.url || "",
                                                },
                                            })
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    artist.images?.[0]?.url ||
                                                    "https://via.placeholder.com/100",
                                            }}
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
                        )}
                    </View>
                )}

                {/* BROWSE */}
                {query.trim().length === 0 && (
                    <View className="mt-8 mb-10">
                        <Text className="text-white text-lg font-semibold mb-3">
                            Browse
                        </Text>

                        <View className="flex-row flex-wrap justify-between">
                            {categories.map((cat, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="w-[48%] h-28 mb-6 rounded-xl overflow-hidden"
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
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

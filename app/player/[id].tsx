import { usePlayer } from "@/contexts/PlayerContext";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlayerScreen() {
    const router = useRouter();
    const {
        currentTrack,
        isPlaying,
        position,
        duration,
        queue,
        shuffle,
        repeat,
        togglePlayPause,
        playNext,
        playPrevious,
        seekTo,
        toggleShuffle,
        toggleRepeat,
        removeFromQueue,
    } = usePlayer();

    const [showQueue, setShowQueue] = useState(false);

    if (!currentTrack) {
        router.back();
        return null;
    }

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (showQueue) {
        return (
            <SafeAreaView className="flex-1 bg-black">
                {/* Queue Header */}
                <View className="px-4 py-3 border-b border-neutral-800">
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity onPress={() => setShowQueue(false)}>
                            <Ionicons
                                name="chevron-down"
                                size={28}
                                color="white"
                            />
                        </TouchableOpacity>
                        <Text className="text-white/60 text-xs uppercase">
                            Đang phát từ playlist
                        </Text>
                        <TouchableOpacity>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Now Playing */}
                    <Text className="text-white/60 text-sm mb-1">
                        Đang phát:
                    </Text>
                    <Text className="text-white text-base font-semibold">
                        <Text className="text-white text-base font-semibold">
                            &quot;{currentTrack.name}&quot; -{" "}
                            {currentTrack.artists.map((a) => a.name).join(", ")}
                        </Text>
                    </Text>
                </View>

                {/* Queue List */}
                <View className="flex-1">
                    <Text className="text-white text-xl font-bold px-4 py-4">
                        Trong hàng đợi
                    </Text>

                    <FlatList
                        data={queue}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View className="flex-row items-center px-4 py-3">
                                {/* Drag Handle */}
                                <Ionicons
                                    name="reorder-two"
                                    size={20}
                                    color="#666"
                                    className="mr-3"
                                />

                                {/* Album Art */}
                                <Image
                                    source={{
                                        uri: item.album.images[0]?.url,
                                    }}
                                    className="w-12 h-12 rounded mr-3"
                                />

                                {/* Track Info */}
                                <View className="flex-1">
                                    <Text
                                        className="text-white font-semibold"
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        className="text-gray-400 text-sm"
                                        numberOfLines={1}
                                    >
                                        {item.artists
                                            .map((a) => a.name)
                                            .join(", ")}
                                    </Text>
                                </View>

                                {/* Actions */}
                                <View className="flex-row items-center space-x-3">
                                    {/* Playing Indicator */}
                                    <Ionicons
                                        name="bar-chart"
                                        size={20}
                                        color="#1DB954"
                                    />

                                    {/* Download */}
                                    <TouchableOpacity>
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>

                                    {/* Menu */}
                                    <TouchableOpacity
                                        onPress={() => removeFromQueue(item.id)}
                                    >
                                        <Ionicons
                                            name="ellipsis-vertical"
                                            size={20}
                                            color="#999"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View className="items-center py-12">
                                <Text className="text-gray-500">
                                    Hàng đợi trống
                                </Text>
                            </View>
                        }
                    />

                    {/* Auto-recommendations */}
                    <View className="px-4 py-4 border-t border-neutral-800">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-white text-lg font-bold">
                                Đề xuất tự động
                            </Text>
                            <View className="flex-row items-center">
                                <Text className="text-white/60 text-sm mr-2">
                                    Bật
                                </Text>
                                <View className="w-12 h-6 bg-[#1DB954] rounded-full p-1">
                                    <View className="w-4 h-4 bg-white rounded-full ml-auto" />
                                </View>
                            </View>
                        </View>

                        {/* Recommended Tracks */}
                        {[1, 2, 3].map((i) => (
                            <View
                                key={i}
                                className="flex-row items-center py-2"
                            >
                                <Image
                                    source={{
                                        uri: "https://via.placeholder.com/48",
                                    }}
                                    className="w-12 h-12 rounded mr-3"
                                />
                                <View className="flex-1">
                                    <Text
                                        className="text-white"
                                        numberOfLines={1}
                                    >
                                        Track {i}
                                    </Text>
                                    <Text
                                        className="text-gray-400 text-sm"
                                        numberOfLines={1}
                                    >
                                        Artist {i}
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons
                                        name="ellipsis-vertical"
                                        size={20}
                                        color="#999"
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-down" size={28} color="white" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-white/60 text-xs uppercase">
                            Đang phát từ playlist
                        </Text>
                        <Text className="text-white text-sm font-semibold">
                            Yêu thích
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                {/* Album Art */}
                <View className="items-center px-6 mt-8">
                    <View className="w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            source={{
                                uri: currentTrack.album.images[0]?.url,
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        {/* Lyrics Overlay */}
                        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <Text className="text-white text-center text-sm font-medium leading-5">
                                Let me see the dark sides as well as the bright
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Connect to Device */}
                <TouchableOpacity className="flex-row items-center justify-center py-4 mx-6 mt-6 mb-2">
                    <Ionicons
                        name="wifi-outline"
                        size={16}
                        color="white"
                        className="mr-2"
                    />
                    <Text className="text-white text-xs font-semibold">
                        Kết nối với thiết bị
                    </Text>
                </TouchableOpacity>

                {/* Track Info & Actions */}
                <View className="px-6 mb-4">
                    <View className="flex-row items-start justify-between mb-4">
                        <View className="flex-1 mr-4">
                            <Text className="text-white text-2xl font-bold mb-1">
                                {currentTrack.name}
                            </Text>
                            <Text className="text-white/70 text-base">
                                {currentTrack.artists
                                    .map((a) => a.name)
                                    .join(", ")}
                            </Text>
                        </View>

                        <View className="flex-row space-x-4">
                            <TouchableOpacity>
                                <Ionicons
                                    name="heart-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="download-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="share-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="px-6 mb-2">
                    <Slider
                        value={position}
                        minimumValue={0}
                        maximumValue={duration}
                        onSlidingComplete={seekTo}
                        minimumTrackTintColor="white"
                        maximumTrackTintColor="#404040"
                        thumbTintColor="white"
                    />
                    <View className="flex-row justify-between">
                        <Text className="text-white/60 text-xs">
                            {formatTime(position)}
                        </Text>
                        <Text className="text-white/60 text-xs">
                            {formatTime(duration)}
                        </Text>
                    </View>
                </View>

                {/* Controls */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity onPress={toggleShuffle}>
                            <Ionicons
                                name="shuffle"
                                size={22}
                                color={shuffle ? "#1DB954" : "#B3B3B3"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playPrevious}>
                            <Ionicons
                                name="play-skip-back"
                                size={32}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={togglePlayPause}
                            className="w-16 h-16 rounded-full bg-white items-center justify-center"
                        >
                            <Ionicons
                                name={isPlaying ? "pause" : "play"}
                                size={36}
                                color="black"
                                style={{ marginLeft: isPlaying ? 0 : 3 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playNext}>
                            <Ionicons
                                name="play-skip-forward"
                                size={32}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleRepeat}>
                            <Ionicons
                                name={
                                    repeat === "track"
                                        ? "repeat-outline"
                                        : "repeat"
                                }
                                size={22}
                                color={repeat !== "off" ? "#1DB954" : "#B3B3B3"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Up Next */}
                <View className="px-6 mb-8">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-white text-base font-semibold">
                            Tiếp theo
                        </Text>
                        <TouchableOpacity onPress={() => setShowQueue(true)}>
                            <View className="flex-row items-center">
                                <Text className="text-white/70 text-sm mr-1">
                                    Hàng đợi
                                </Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color="#B3B3B3"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {queue.length > 0 ? (
                        <View className="flex-row items-center bg-neutral-900 rounded-lg p-2">
                            <Image
                                source={{
                                    uri: queue[0].album.images[0]?.url,
                                }}
                                className="w-12 h-12 rounded mr-3"
                            />
                            <View className="flex-1">
                                <Text
                                    className="text-white font-semibold"
                                    numberOfLines={1}
                                >
                                    {queue[0].name}
                                </Text>
                                <Text
                                    className="text-gray-400 text-sm"
                                    numberOfLines={1}
                                >
                                    {queue[0].artists
                                        .map((a) => a.name)
                                        .join(", ")}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <Text className="text-gray-500 text-sm">
                            Không có bài hát trong hàng đợi
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

import { usePlayer } from "@/contexts/PlayerContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function PlayerBar() {
    const router = useRouter();
    const { currentTrack, isPlaying, togglePlayPause, playTrack } = usePlayer();

    if (!currentTrack) return null;

    const handleClose = () => {
        // Dừng nhạc và xóa track
        playTrack(null as any);
    };

    return (
        <View
            className="absolute left-0 right-0 px-2 pb-2"
            style={{
                bottom: 80, // Ngay phía trên TabBar
                zIndex: 100,
            }}
        >
            <TouchableOpacity
                onPress={() => router.push(`/player/${currentTrack.id}`)}
                className="bg-neutral-900 rounded-lg shadow-xl"
                activeOpacity={0.9}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 10,
                }}
            >
                <View className="flex-row items-center px-3 py-2.5">
                    {/* Album Art */}
                    <Image
                        source={{ uri: currentTrack.album.images[0]?.url }}
                        className="w-12 h-12 rounded mr-3"
                    />

                    {/* Track Info */}
                    <View className="flex-1">
                        <Text
                            className="text-white font-semibold text-sm"
                            numberOfLines={1}
                        >
                            {currentTrack.name}
                        </Text>
                        <Text
                            className="text-gray-400 text-xs mt-0.5"
                            numberOfLines={1}
                        >
                            {currentTrack.artists.map((a) => a.name).join(", ")}
                        </Text>
                    </View>

                    {/* Controls */}
                    <View className="flex-row items-center space-x-2">
                        {/* Play/Pause Button */}
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                togglePlayPause();
                            }}
                            className="w-9 h-9 items-center justify-center"
                        >
                            <Ionicons
                                name={isPlaying ? "pause" : "play"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                            className="w-9 h-9 items-center justify-center"
                        >
                            <Ionicons name="close" size={22} color="#999" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

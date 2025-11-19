import { usePlayer } from "@/contexts/PlayerContext";
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useCallback } from "react";
import { View, Text } from "react-native";

export function YouTubePlayerComponent() {
    const { youtubeId, togglePlayPause, isPlaying } = usePlayer();
    const [playerReady, setPlayerReady] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            // Có thể trigger playNext ở đây
            console.log("Video ended");
        }
    }, []);

    if (!youtubeId) {
        return (
            <View className="w-full aspect-square items-center justify-center bg-neutral-800 rounded-lg">
                <Text className="text-white/60">
                    Không tìm thấy video YouTube
                </Text>
            </View>
        );
    }

    return (
        <View className="w-full aspect-square rounded-lg overflow-hidden">
            <YoutubePlayer
                height={400}
                play={isPlaying}
                videoId={youtubeId}
                onChangeState={onStateChange}
                onReady={() => setPlayerReady(true)}
            />
        </View>
    );
}

import { IconSymbol } from "@/components/ui/icon-symbol";
import type { Song } from "@/types/library";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RecentlyPlayedItemProps {
  song: Song;
  onPress?: () => void;
  onMorePress?: () => void;
}

export function RecentlyPlayedItem({
  song,
  onPress,
  onMorePress,
}: RecentlyPlayedItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-3 px-4"
      activeOpacity={0.7}
    >
      <Image source={{ uri: song.coverUrl }} className="w-12 h-12 rounded-md" />

      <View className="flex-1 ml-3">
        <Text className="text-white font-medium text-base" numberOfLines={1}>
          {song.title}
        </Text>
        <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>
          {song.artist}
        </Text>
      </View>

      <TouchableOpacity onPress={onMorePress} className="p-2">
        <IconSymbol name="ellipsis" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

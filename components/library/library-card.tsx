import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface LibraryCardProps {
  title: string;
  count: number;
  icon: string;
  route: string;
}

export function LibraryCard({ title, count, icon, route }: LibraryCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(route as any)}
      className="bg-gray-800 rounded-xl p-4 flex-1 mx-1"
      activeOpacity={0.7}
    >
      <View className="mb-3">
        <IconSymbol name={icon as any} size={32} color="#fff" />
      </View>
      <Text className="text-white font-semibold text-base mb-1">{title}</Text>
      <Text className="text-gray-400 text-sm">{count} songs</Text>
    </TouchableOpacity>
  );
}

import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SearchHistoryScreen() {
    const router = useRouter();

    const [query, setQuery] = useState(""); // Nội dung ô search
    const [history, setHistory] = useState([
        {
            type: "Song",
            title: "You (feat. Travis Scott)",
            artist: "Don Toliver",
        },
        { type: "Album", title: "John Wick: Chapter 4", artist: "Tyler Bates" },
        { type: "Artist", title: "Maroon 5" },
        { type: "Playlist", title: "Phonk Madness" },
    ]);

    const removeItem = (index: number) =>
        setHistory(history.filter((_, i) => i !== index));

    const clearHistory = () => setHistory([]);

    const handleSearch = () => {
        if (query.trim() === "") return;
        setHistory([{ type: "Song", title: query }, ...history]);
        setQuery("");
    };

    const filteredHistory =
        query.trim() === ""
            ? history
            : history.filter((item) =>
                  item.title.toLowerCase().includes(query.toLowerCase()),
              );

    return (
        <SafeAreaView className="flex-1 bg-[#080808] px-4">
            {/* Thanh trên */}
            <View className="flex-row items-center mt-6 mb-4 border-b border-gray-700 pb-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>

                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search songs, artist, album or playlist"
                    placeholderTextColor="gray"
                    className="text-white ml-4 flex-1"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />

                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery("")}>
                        <Ionicons name="close" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Recent Searches */}
            <ScrollView>
                {filteredHistory.length > 0 && (
                    <>
                        <Text className="text-white text-lg font-semibold mb-3">
                            Recent searches
                        </Text>

                        {filteredHistory.map((item, index) => (
                            <View
                                key={index}
                                className="flex-row items-center justify-between mb-4"
                            >
                                <View>
                                    <Text className="text-white font-medium">
                                        {item.title}
                                    </Text>
                                    <Text className="text-gray-400 text-sm">
                                        {item.type} • {item.artist || ""}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => removeItem(index)}
                                >
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity onPress={clearHistory}>
                            <Text className="text-gray-400 mt-4">
                                Clear history
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

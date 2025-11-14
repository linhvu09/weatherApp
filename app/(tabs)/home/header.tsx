import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function GreetingHeader() {
    return (
        <View className="rounded-3xl mt-3 px-5 py-4 bg-transparent">
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-lg text-gray-400">👋 Hi Guest,</Text>
                    <Text className="text-3xl text-gray-200 mt-1">
                        Good Evening
                    </Text>
                </View>

                <View className="flex-row items-center space-x-6 pr-2">
                    <View className="relative">
                        <TouchableOpacity className="pr-5">
                            <Ionicons
                                name="notifications-sharp"
                                size={28}
                                color="#6b7280"
                            />
                        </TouchableOpacity>

                        <View className="absolute top-[4px] right-6 w-2.5 h-2.5 bg-white rounded-full border-2 border-transparent" />
                    </View>

                    <TouchableOpacity activeOpacity={0.8}>
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
                            }}
                            className="w-14 h-14 rounded-full"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

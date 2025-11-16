import { Slot } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
    return (
        <SafeAreaView className="flex-1 bg-[#080808]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Slot />
                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}

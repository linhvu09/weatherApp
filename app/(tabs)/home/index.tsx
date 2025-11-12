import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySelector from "../../../features/home/categorySelector";
import GreetingHeader from "../../../features/home/header";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        <GreetingHeader />
        <CategorySelector />
      </ScrollView>
    </SafeAreaView>
  );
}

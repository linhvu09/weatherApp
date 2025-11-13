import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const categories = [
  "Dành cho bạn",
  "Thư giãn",
  "Tập luyện",
  "Du lịch",
  "Tập trung",
  "Ngủ",
  "Di chuyển",
];

export default function CategorySelector() {
  const [activeCategory, setActiveCategory] = useState("Dành cho bạn");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row pt-3"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((item) => {
        const isActive = item === activeCategory;

        const buttonClass = isActive
          ? "bg-gray-700/70 px-4 py-2 rounded-full mr-3"
          : "bg-transparent px-4 py-2 rounded-full mr-3";

        const textClass = isActive
          ? "text-white font-bold text-lg"
          : "text-gray-400 font-semibold text-lg";

        return (
          <TouchableOpacity
            key={item}
            onPress={() => setActiveCategory(item)}
            className={buttonClass}
          >
            <Text className={textClass}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

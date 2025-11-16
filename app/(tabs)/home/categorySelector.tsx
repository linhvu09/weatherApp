import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, TouchableOpacity } from "react-native";

interface CategorySelectorProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    "Dành cho bạn",
    "Thư giãn",
    "Tập luyện",
    "Du lịch",
    "Tập trung",
    "Ngủ",
    "Di chuyển",
];

export default function CategorySelector({
    activeCategory,
    onCategoryChange,
}: CategorySelectorProps) {
    const animatedValues = useRef(
        categories.reduce(
            (acc, item) => {
                acc[item] = new Animated.Value(item === activeCategory ? 1 : 0);
                return acc;
            },
            {} as Record<string, Animated.Value>,
        ),
    ).current;

    useEffect(() => {
        categories.forEach((item) => {
            Animated.timing(animatedValues[item], {
                toValue: item === activeCategory ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        });
    }, [activeCategory, animatedValues]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row pt-3"
            contentContainerStyle={{ paddingHorizontal: 16 }}
        >
            {categories.map((item) => {
                const animatedValue = animatedValues[item];

                const backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["transparent", "rgba(55,65,81,0.7)"],
                });

                const textColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#9CA3AF", "#FFFFFF"],
                });

                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => onCategoryChange(item)}
                        style={{ marginRight: 12 }}
                    >
                        <Animated.View
                            style={{
                                backgroundColor,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 999,
                            }}
                        >
                            <Animated.Text
                                style={{
                                    color: textColor,
                                    fontWeight:
                                        item === activeCategory
                                            ? "bold"
                                            : "600",
                                    fontSize: 18,
                                }}
                            >
                                {item}
                            </Animated.Text>
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

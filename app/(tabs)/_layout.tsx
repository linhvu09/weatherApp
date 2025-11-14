import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#999",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                },
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Trang chủ",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Tìm kiếm",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="magnifyingglass"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Thư viện",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="music.note.list"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Hồ sơ",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="person.fill"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { PlayerProvider } from "@/contexts/PlayerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PlayerProvider>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="auth" />
                        <Stack.Screen
                            name="player"
                            options={{
                                presentation: "modal",
                                animation: "slide_from_bottom",
                            }}
                        />
                        <Stack.Screen
                            name="modal"
                            options={{
                                presentation: "modal",
                                headerShown: true,
                                title: "Modal",
                            }}
                        />
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </PlayerProvider>
        </GestureHandlerRootView>
    );
}

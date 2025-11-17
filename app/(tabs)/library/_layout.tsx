import { PlayerBar } from "@/components/player/PlayerBar";
import { Stack } from "expo-router";

export default function LibraryLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="playlists" />
                <Stack.Screen name="artists" />
                <Stack.Screen name="liked-songs" />
                <Stack.Screen name="downloads" />
            </Stack>
            <PlayerBar />
        </>
    );
}

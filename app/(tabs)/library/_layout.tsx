import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="liked-songs" />
      <Stack.Screen name="downloads" />
      <Stack.Screen name="playlists" />
      <Stack.Screen name="artists" />
    </Stack>
  );
}

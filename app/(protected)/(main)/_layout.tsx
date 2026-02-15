import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="camera" />
      <Stack.Screen name="map" />
      <Stack.Screen name="list" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="report-item" />
    </Stack>
  );
}
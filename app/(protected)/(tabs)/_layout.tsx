import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tabs.Screen name="map" />
      <Tabs.Screen name="camera" />
      <Tabs.Screen name="list" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="report-item" />
    </Tabs>
  );
}

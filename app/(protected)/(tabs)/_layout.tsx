import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs, useSegments } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const segments = useSegments();
  const currentTab = segments[segments.length - 1];
  const returnTo =
    typeof currentTab === "string" && currentTab !== "camera"
      ? `/${currentTab}`
      : "/map";
  const reportFrom =
    currentTab === "list" || currentTab === "map" ? currentTab : undefined;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: "",
          tabBarShowLabel: false,
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              className="items-center justify-center -mt-8"
              onPress={() =>
                router.push({
                  pathname: "/camera",
                  params: reportFrom
                    ? { from: reportFrom, returnTo }
                    : { returnTo },
                })
              }
            >
              <View className="h-16 w-16 rounded-full bg-blue-500 items-center justify-center">
                <Ionicons name="camera" size={28} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

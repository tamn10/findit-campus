// components/BottomNavigation.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabKey = "Map" | "List" | "Activity" | "Profile";

type Props = {
  // Optional: if you want to visually highlight a tab (no function needed)
  activeTab?: TabKey;
};

const tabs: Array<{
  key: TabKey;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}> = [
  { key: "Map", label: "Map", icon: "map-outline" },
  { key: "List", label: "List", icon: "list-outline" },
  { key: "Activity", label: "Activity", icon: "time-outline" },
  { key: "Profile", label: "Profile", icon: "person-outline" },
];

export default function BottomNavigation({ activeTab = "Map" }: Props) {
  return (
    <View className="absolute bottom-0 left-0 right-0 h-20 flex-row items-center justify-around border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      {tabs.map((t) => {
        const isActive = t.key === activeTab;

        return (
          <TouchableOpacity
            key={t.key}
            activeOpacity={0.8}
            className="flex-1 items-center justify-center"
          >
            <Ionicons
              name={t.icon}
              size={22}
              color={isActive ? "#2563eb" : "#6b7280"} // blue-600 / gray-500
            />
            <Text className={isActive ? "mt-1 text-xs text-blue-600" : "mt-1 text-xs text-gray-500"}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

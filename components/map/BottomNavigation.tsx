// components/BottomNavigation.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useThemeColor } from "@/hooks/use-theme-color";
import { useColorScheme } from "@/hooks/use-color-scheme";

type TabKey = "Map" | "List" | "Activity" | "Profile";

type Props = {
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
  // ✅ Hooks INSIDE component
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 h-20 flex-row items-center justify-around border-t"
      style={{ 
        backgroundColor,
        borderTopColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb'
      }}
    >
      {tabs.map((t) => {
        const isActive = t.key === activeTab;

        return (
          <TouchableOpacity
            key={t.key}
            activeOpacity={0.8}
            className="flex-1 items-center justify-center"
            onPress={() => {
              if (t.key === 'Map') router.push('/map');
              if (t.key === 'List') router.push('/list');
              //if (t.key === 'Activity') router.push('/activity');
              if (t.key === 'Profile') router.push('/profile');
            }}    
          >
            <Ionicons
              name={t.icon}
              size={22}
              color={isActive ? tintColor : iconColor}
            />
            <Text 
              className="mt-1 text-xs"
              style={{ color: isActive ? tintColor : iconColor }}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

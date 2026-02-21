import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View className="pt-12 pb-4 px-4 mt-2 border-b">
      {/* Logo and Notification Icon */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: tintColor + "20" }}
          >
            <Ionicons name="map" size={24} color={tintColor} />
          </View>
          <Text className="text-2xl font-bold" style={{ color: textColor }}>
            Campus Map
          </Text>
        </View>
        <TouchableOpacity className="relative">
          <Ionicons name="notifications-outline" size={24} color={textColor} />
          <View
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: "red" }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        className="flex-row items-center rounded-lg px-3 py-3"
        style={{
          backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f3f4f6",
        }}
      >
        <Ionicons name="search" size={20} color={iconColor} />
        <TextInput
          placeholder="Search buildings or items"
          value={searchQuery}
          onChangeText={onSearchChange}
          className="flex-1 ml-2 text-base"
          style={{ color: textColor }}
          placeholderTextColor={iconColor}
        />
      </View>
    </View>
  );
}

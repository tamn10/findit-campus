import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <View className="px-4 pt-12 pb-4 border-b bg-dark">
      {/* Top Row */}
      <View className="flex-row items-center justify-between mb-3">
        {/* Logo + Title */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-2 bg-white">
            <Ionicons name="map" size={20} color="dark" />
          </View>

          <Text className="text-xl font-bold text-white">Campus Map</Text>
        </View>
        {/* Notification */}
        <TouchableOpacity className="relative">
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center rounded-lg px-3 py-2 bg-gray-100">
        <Ionicons name="search" size={20} color="#6b7280" />

        <TextInput
          placeholder="Search buildings or items"
          value={searchQuery}
          onChangeText={onSearchChange}
          className="flex-1 ml-2 text-black"
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );
}

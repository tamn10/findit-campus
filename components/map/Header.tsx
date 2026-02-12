import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View 
      className="pt-12 pb-4 px-4 border-b"
      style={{ 
        backgroundColor,
        borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' 
      }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: tintColor + '20' }}
          >
            <Ionicons name="map" size={18} color={tintColor} />
          </View>
          <Text className="text-xl font-bold" style={{ color: textColor }}>
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
        className="flex-row items-center rounded-lg px-3 py-2"
        style={{ backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6' }}
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

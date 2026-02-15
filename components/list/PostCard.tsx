import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PostCardProps {
  id: string;
  name: string;
  status: string;
  location: string;
  time: string;
  isActive: boolean;
}

export default function PostCard({ name, status, location, time, isActive }: PostCardProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 mb-3 rounded-2xl"
      style={{
        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Placeholder Image */}
      <View 
        className="w-20 h-20 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}
      >
        <Ionicons name="image-outline" size={32} color={iconColor} />
      </View>

      {/* Item Info */}
      <View className="flex-1">
        <Text className="font-bold text-base mb-1" style={{ color: textColor }}>
          {name}
        </Text>
        <Text className="text-xs mb-1" style={{ color: iconColor }}>
          {status}
        </Text>
        <Text className="text-sm" style={{ color: iconColor }}>
          {location} • {time}
        </Text>
      </View>

      {/* Active Indicator & Menu */}
      <View className="items-center gap-2">
        {isActive && (
          <View className="w-3 h-3 rounded-full bg-green-500" />
        )}
        <TouchableOpacity className="p-2">
          <Ionicons name="ellipsis-vertical" size={18} color={iconColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

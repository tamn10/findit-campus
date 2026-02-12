import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PhotoUpload() {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme() ?? 'light';

  const placeholderBgColor = colorScheme === 'dark' ? '#1a1a1a' : '#f9fafb';
  const borderColor = colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb';

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: textColor }}>
        Item Photo
      </Text>

      <View className="flex-row gap-3">
        {/* Add Photo Placeholder */}
        <TouchableOpacity
          className="w-28 h-28 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: placeholderBgColor,
            borderWidth: 2,
            borderColor: borderColor,
            borderStyle: 'dashed',
          }}
        >
          <Ionicons name="camera-outline" size={32} color={iconColor} />
          <Text className="text-xs mt-2" style={{ color: iconColor }}>
            Add Photo
          </Text>
        </TouchableOpacity>

        {/* Additional photo slots can be added here */}
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LocationSection() {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View className="px-6 mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: textColor }}>
        Item Location
      </Text>

      <View 
        className="flex-row items-center justify-between p-4 rounded-2xl"
        style={{ backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f3f4f6' }}
      >
        {/* Location Icon */}
        <View className="flex-row items-center flex-1">
          <View 
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: tintColor + '20' }}
          >
            <Ionicons name="location" size={24} color={tintColor} />
          </View>

          {/* Location Text */}
          <View className="flex-1">
            <Text className="text-base font-medium mb-1" style={{ color: textColor }}>
              {/* Leave blank - will be filled with actual location later */}
            </Text>
            <Text className="text-sm" style={{ color: iconColor }}>
              Auto-detected location
            </Text>
          </View>
        </View>

        {/* Checkmark */}
        <View 
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: '#10b981' }}
        >
          <Ionicons name="checkmark" size={18} color="#fff" />
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Header */}
      <View 
        className="pt-12 pb-4 px-4 flex-row items-center"
        style={{ backgroundColor }}
      >
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center mr-4"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color={textColor} />
        </TouchableOpacity>
        
        <Text className="text-xl font-bold" style={{ color: textColor }}>
          Profile
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4">
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text className="text-xl font-bold mb-2" style={{ color: textColor }}>
          Your Profile
        </Text>
        <Text className="text-center" style={{ color: iconColor }}>
          Profile settings and information will appear here
        </Text>
      </View>
    </View>
  );
}

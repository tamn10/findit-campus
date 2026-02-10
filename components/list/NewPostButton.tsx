import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function NewPostButton() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 flex-row items-center px-6 py-4 rounded-full"
      style={{
        backgroundColor: tintColor,
        shadowColor: tintColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
      onPress={() => router.push('/report-item')}
    >
      <Ionicons name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
      <Text className="text-white font-semibold text-base">
        New Post
      </Text>
    </TouchableOpacity>
  );
}

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SubmitButton() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      className="mx-4 mb-8 flex-row items-center justify-center py-4 rounded-2xl"
      style={{
        backgroundColor: tintColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text className="text-white font-bold text-lg mr-2">
        Post Item
      </Text>
      <Ionicons name="arrow-forward" size={20} color="#fff" />
    </TouchableOpacity>
  );
}

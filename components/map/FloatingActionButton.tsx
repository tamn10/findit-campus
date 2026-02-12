import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function FloatingActionButton() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      className="absolute top-3 right-3 w-14 h-14 rounded-full items-center justify-center"
      style={{
        backgroundColor: tintColor,
        shadowColor: tintColor,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          },
          android: {
            elevation: 8,
          },
        }),
      }}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={28} color="white" />
    </TouchableOpacity>
  );
}

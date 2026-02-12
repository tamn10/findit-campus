import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FloatingActionButton from './FloatingActionButton';

export default function MapView() {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  const mapBackgroundColor = colorScheme === 'dark' ? '#1a1a1a' : '#e5e7eb';
  const controlBackgroundColor = backgroundColor;

  return (
    <View className="mx-4 mb-4 rounded-2xl overflow-hidden h-80 relative">
      {/* Empty Map Background */}
      <View 
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: mapBackgroundColor }}
      >
        <Ionicons name="map-outline" size={48} color={iconColor} />
      </View>

      {/* Floating Action Button - Top Right Corner */}
      <FloatingActionButton />

      {/* Zoom Controls */}
      <View className="absolute right-3" style={{ top: '50%', marginTop: -48 }}>
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-lg mb-2"
          style={{ 
            backgroundColor: controlBackgroundColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-xl font-light">+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-lg"
          style={{ 
            backgroundColor: controlBackgroundColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-xl font-light">−</Text>
        </TouchableOpacity>
      </View>

      {/* Location Button */}
      <View className="absolute bottom-3 right-3">
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{ 
            backgroundColor: controlBackgroundColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name="locate" size={20} color={tintColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

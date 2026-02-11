import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MapView() {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  const mapBackgroundColor = colorScheme === 'dark' ? '#1a1a1a' : '#e5e7eb';
  const controlBackgroundColor = backgroundColor;

  return (
    <View className="mx-4 mb-4 rounded-2xl overflow-hidden h-[110%] relative">
      {/* Empty Map Background */}
      <View 
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: mapBackgroundColor }}
      >
        <Ionicons name="map-outline" size={48} color={iconColor} />
      </View>

      {/* Action Button - Top Right Corner */}
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
        onPress={() => router.push({
          pathname: '/report-item',
          params: { from: 'map' }
        })}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

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

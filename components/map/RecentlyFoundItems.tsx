import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Mock data - displays AT MOST 10 items
// Currently showing 5 items as example (will be replaced with real data from Firebase later)
const recentlyFoundItems = [
  {
    id: '1',
    name: 'AirPods Pro',
    location: 'Science Lab',
    status: 'New',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    location: 'Library',
    status: 'Found',
  },
  {
    id: '3',
    name: 'Water Bottle',
    location: 'Gym',
    status: 'New',
  },
  {
    id: '4',
    name: 'Textbook',
    location: 'Library',
    status: 'Found',
  },
  {
    id: '5',
    name: 'Backpack',
    location: 'Student Union',
    status: 'Found',
  },
];

export default function RecentlyFoundItems() {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  const cardBackgroundColor = backgroundColor;
  const placeholderColor = colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb';

  // Limit to maximum 10 items
  const displayItems = recentlyFoundItems.slice(0, 10);

  return (
    <View className="px-4 pb-4">
      <Text 
        className="text-xs font-semibold mb-3 tracking-widest"
        style={{ color: iconColor }}
      >
        RECENTLY FOUND NEARBY
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {displayItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            className={`rounded-2xl overflow-hidden ${
              index < displayItems.length - 1 ? 'mr-3' : ''
            }`}
            style={{ 
              width: 160,
              backgroundColor: cardBackgroundColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            {/* Placeholder image - will be replaced with actual image from user later */}
            <View className="relative">
              <View 
                className="w-full h-32 items-center justify-center"
                style={{ backgroundColor: placeholderColor }}
              >
                <Ionicons name="image-outline" size={32} color={iconColor} />
              </View>
              {item.status === 'New' && (
                <View 
                  className="absolute top-2 right-2 px-2 py-1 rounded-full"
                  style={{ backgroundColor: "red" }}
                >
                  <Text className="text-white text-xs font-semibold">
                    {item.status}
                  </Text>
                </View>
              )}
            </View>
            <View className="p-3">
              <Text 
                className="font-semibold text-sm mb-1"
                style={{ color: textColor }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text 
                className="text-xs"
                style={{ color: iconColor }}
                numberOfLines={1}
              >
                {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

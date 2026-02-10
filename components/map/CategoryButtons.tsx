import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CategoryButtonsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { name: 'Electronics', icon: 'phone-portrait-outline' },
  { name: 'Clothing', icon: 'shirt-outline' },
  { name: 'Keys', icon: 'key-outline' },
] as const;

export default function CategoryButtons({
  selectedCategory,
  onSelectCategory,
}: CategoryButtonsProps) {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View className="flex-row px-4 py-3 gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.name;
        return (
          <TouchableOpacity
            key={category.name}
            onPress={() => onSelectCategory(category.name)}
            className="px-4 py-2 rounded-full flex-row items-center"
            style={{
              backgroundColor: isSelected 
                ? tintColor 
                : (colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6'),
            }}
          >
            <Ionicons
              name={category.icon}
              size={16}
              color={isSelected ? '#fff' : textColor}
              style={{ marginRight: 6 }}
            />
            <Text
              className="font-medium"
              style={{ color: isSelected ? '#fff' : textColor }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

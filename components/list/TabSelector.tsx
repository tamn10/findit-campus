import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabSelectorProps {
  selectedTab: 'Active' | 'Returned';
  onSelectTab: (tab: 'Active' | 'Returned') => void;
}

export default function TabSelector({ selectedTab, onSelectTab }: TabSelectorProps) {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View className="px-4 py-3 flex-row gap-3">
      <TouchableOpacity
        className="flex-1 py-3 rounded-xl items-center"
        style={{
          backgroundColor: selectedTab === 'Active' ? '#fff' : (colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6'),
        }}
        onPress={() => onSelectTab('Active')}
      >
        <Text 
          className="font-semibold"
          style={{ 
            color: selectedTab === 'Active' ? tintColor : iconColor 
          }}
        >
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 py-3 rounded-xl items-center"
        style={{
          backgroundColor: selectedTab === 'Returned' ? '#fff' : (colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6'),
        }}
        onPress={() => onSelectTab('Returned')}
      >
        <Text 
          className="font-semibold"
          style={{ 
            color: selectedTab === 'Returned' ? tintColor : iconColor 
          }}
        >
          Returned
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Header from '@/components/map/Header';
import CategoryButtons from '@/components/map/CategoryButtons';
import MapView from '@/components/map/MapView';
import RecentlyFoundItems from '@/components/map/RecentlyFoundItems';
import BottomNavigation from '@/components/map/BottomNavigation';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Reserve space for bottom navigation
const BOTTOM_NAV_HEIGHT = 65;

export default function CampusMapScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [searchQuery, setSearchQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: BOTTOM_NAV_HEIGHT }}
      >
        <CategoryButtons
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <MapView />

        <RecentlyFoundItems />
      </ScrollView>

      <BottomNavigation activeTab="Map" />
    </View>
  );
}

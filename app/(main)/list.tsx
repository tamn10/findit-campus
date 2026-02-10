import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Header from '@/components/list/Header';
import TabSelector from '@/components/list/TabSelector';
import PostCard from '@/components/list/PostCard';
import NewPostButton from '@/components/list/NewPostButton';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Mock data - will be replaced with Firebase data later
const activePosts = [
  {
    id: '1',
    name: 'Blue Hydro Flask',
    status: 'LOST ITEM',
    location: 'Main Library',
    time: '2h ago',
    isActive: true,
  },
  {
    id: '2',
    name: 'AirPods Pro Case',
    status: 'FOUND ITEM',
    location: 'Student Union',
    time: 'Yesterday',
    isActive: true,
  },
];

//const returnedPosts = [];

export default function MyPostsScreen() {
  const [selectedTab, setSelectedTab] = useState<'Active' | 'Returned'>('Active');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme();

  // Filter posts based on selected tab
  const filteredPosts = selectedTab === 'Active' ? activePosts : []; // returnedPosts will be used once we have data];

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Header />

      <TabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      <ScrollView className="flex-1 px-4">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            name={post.name}
            status={post.status}
            location={post.location}
            time={post.time}
            isActive={post.isActive}
          />
        ))}

        {filteredPosts.length === 0 && (
          <View className="items-center justify-center py-20">
            <Text className="text-base" style={{ color: iconColor }}>
              No {selectedTab.toLowerCase()} posts
            </Text>
          </View>
        )}
      </ScrollView>

      <NewPostButton />
    </View>
  );
}

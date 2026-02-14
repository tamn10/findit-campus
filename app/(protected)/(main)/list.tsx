import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import TabSelector from '@/components/list/TabSelector';
import PostCard from '@/components/list/PostCard';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PageHeader from '@/components/shared/PageHeader';

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
  const tintColor = useThemeColor({}, 'tint');

  // Filter posts based on selected tab
  const filteredPosts = selectedTab === 'Active' ? activePosts : []; // returnedPosts will be used once we have data];

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <PageHeader 
        title="My Posts"
        backTo='/map'
      />

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

      {/* New Post Button - INLINED */}
      <TouchableOpacity
        className="absolute bottom-12 right-8 flex-row items-center px-6 py-4 rounded-full"
        style={{
          backgroundColor: tintColor,
          shadowColor: tintColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={() => router.push({
          pathname: '/report-item',
          params: { from: 'list' }
        })}
      >
        <Ionicons name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text className="text-white font-semibold text-base">
          New Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

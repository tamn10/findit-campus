import React from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import PageHeader from '@/components/shared/PageHeader';
import ProfileCard from '@/components/profile/ProfileCard';
import ActivitySection from '@/components/profile/ActivitySection';
import SettingsSection from '@/components/profile/SettingsSection';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <PageHeader title="Profile" showBackButton={false} />

      <ScrollView className="flex-1">
        <ProfileCard />

        <ActivitySection />

        <SettingsSection />
      </ScrollView>
    </View>
  );
}

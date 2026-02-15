import React from 'react';
import { View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PageHeader from '@/components/shared/PageHeader';

export default function ProfileScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Header */}
      <PageHeader 
        title="Profile"
      />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4">
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text className="text-xl font-bold mb-2" style={{ color: textColor }}>
          Your Profile
        </Text>
        <Text className="text-center" style={{ color: iconColor }}>
          Profile settings and information will appear here
        </Text>
      </View>
    </View>
  );
}

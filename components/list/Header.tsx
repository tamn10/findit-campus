import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function Header() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View 
      className="pt-12 pb-4 px-4 flex-row items-center justify-between"
      style={{ backgroundColor }}
    >
      <TouchableOpacity 
        className="w-10 h-10 items-center justify-center"
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color={textColor} />
      </TouchableOpacity>
      
      <Text className="text-xl font-bold" style={{ color: textColor }}>
        My Posts
      </Text>

      {/*<TouchableOpacity className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
        <Ionicons name="person" size={20} color="#fff" />
      </TouchableOpacity> --- IGNORE ---*/}
      <View className="w-10 h-10" />
    </View>
  );
}

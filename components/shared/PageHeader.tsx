import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: IconName;
  onRightPress?: () => void;
}

export default function PageHeader({ 
  title, 
  onBackPress,
  rightIcon,
  onRightPress,
}: PageHeaderProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View 
      className="pt-12 pb-4 px-4 flex-row items-center justify-between"
      style={{ backgroundColor }}
    >
      {/* Left: Back Button - ALWAYS SHOWN */}
      <TouchableOpacity 
        className="w-10 h-10 items-center justify-center"
        onPress={handleBackPress}
      >
        <Ionicons name="chevron-back" size={28} color={textColor} />
      </TouchableOpacity>
      
      {/* Middle: Page Title - ALWAYS SHOWN */}
      <Text 
        className="text-xl font-bold flex-1 text-center" 
        style={{ color: textColor }}
      >
        {title}
      </Text>

      {/* Right: Optional Icon Button */}
      {rightIcon && onRightPress ? (
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center"
          onPress={onRightPress}
        >
          <Ionicons name={rightIcon} size={28} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View className="w-10 h-10" />
      )}
    </View>
  );
}

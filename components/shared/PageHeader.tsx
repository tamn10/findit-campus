import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface PageHeaderProps {
  title: string;
  backTo?: Href;              //e.g. '/map' - if provided, back button will navigate to this route instead of going back in history
  onBackPress?: () => void;
  rightIcon?: IconName;
  onRightPress?: () => void;
}

export default function PageHeader({ 
  title, 
  backTo,
  onBackPress,
  rightIcon,
  onRightPress,
}: PageHeaderProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleBackPress = () => {
    // Priority 1: Custom function (for alerts, logic, etc.)
    if (onBackPress) {
      onBackPress();
    } 
    // Priority 2: Navigate to specific route
    else if (backTo) {
      // Back navigation should not create another stack entry.
      router.push(backTo);
    } 
    // Priority 3: Default - go back one step
    else {
      router.back();
    }
  };

  return (
    <View style={{ backgroundColor }}>
      <View 
        className="pt-10 pb-4 px-4 mt-2 flex-row items-center justify-between"
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
          className="text-2xl font-bold flex-1 text-center" 
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
      
      {/* Faded Divider Line */}
      <View 
        className="h-px w-full" 
        style={{ 
          backgroundColor: textColor,
          opacity: 0.1
        }} 
      />
    </View>
  );
}

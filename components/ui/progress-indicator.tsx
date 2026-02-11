import React from 'react';
import { View, Text } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View className="items-center py-4">
      {/* Progress Dots */}
      <View className="flex-row gap-2 mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: index === currentStep - 1 ? tintColor : iconColor + '40',
            }}
          />
        ))}
      </View>

      {/* Step Counter - Modify this text to change step numbers 
      <Text className="text-sm" style={{ color: tintColor }}>
        Step {currentStep} of {totalSteps}
      </Text>*/}
    </View>
  );
}

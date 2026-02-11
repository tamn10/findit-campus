import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CameraControlsProps {
  isMaxPhotos: boolean;
  onGalleryPress: () => void;
  onCapturePress: () => void;
  onFlipPress: () => void;
}

export default function CameraControls({
  isMaxPhotos,
  onGalleryPress,
  onCapturePress,
  onFlipPress,
}: CameraControlsProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white pb-8 pt-6">
      {/* Control Buttons */}
      <View className="flex-row items-center justify-center gap-16 mb-4">
        {/* Gallery Button */}
        <TouchableOpacity
          className="items-center"
          onPress={onGalleryPress}
          disabled={isMaxPhotos}
        >
          <View 
            className="w-14 h-14 rounded-2xl items-center justify-center mb-1"
            style={{ 
              backgroundColor: isMaxPhotos ? '#e5e7eb' : '#f3f4f6' 
            }}
          >
            <Ionicons 
              name="images" 
              size={28} 
              color={isMaxPhotos ? '#9ca3af' : '#3b82f6'} 
            />
          </View>
          <Text className="text-xs text-gray-600 font-medium">GALLERY</Text>
        </TouchableOpacity>

        {/* Capture Button */}
        <TouchableOpacity
          className="items-center"
          onPress={onCapturePress}
          disabled={isMaxPhotos}
        >
          <View 
            className="w-20 h-20 rounded-full items-center justify-center mb-1"
            style={{
              backgroundColor: isMaxPhotos ? '#9ca3af' : '#3b82f6',
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isMaxPhotos ? 0 : 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Ionicons name="camera" size={36} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Flip Camera Button */}
        <TouchableOpacity
          className="items-center"
          onPress={onFlipPress}
        >
          <View className="w-14 h-14 rounded-2xl bg-gray-100 items-center justify-center mb-1">
            <Ionicons name="camera-reverse" size={28} color="#6b7280" />
          </View>
          <Text className="text-xs text-gray-600 font-medium">FLIP</Text>
        </TouchableOpacity>
      </View>

      {/* Help Text */}
      <Text className="text-center text-xs text-gray-500 px-8">
        {isMaxPhotos 
          ? 'Maximum 4 photos reached. Go back to continue.'
          : 'Clear photos help owners identify their lost belongings faster.'
        }
      </Text>
    </View>
  );
}

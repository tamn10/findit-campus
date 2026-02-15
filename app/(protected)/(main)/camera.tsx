import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { useCameraLogic } from '@/hooks/use-camera-logic';
import CameraControls from '@/components/report-items/CameraControls';

export default function CameraScreen() {
  const {
    facing,
    permission,
    cameraRef,
    photoCount,
    isMaxPhotos,
    toggleCameraFacing,
    takePicture,
    pickFromGallery,
    goBack,
    requestPermission,
  } = useCameraLogic();

  // Loading state
  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-center mb-4 px-8">
          We need camera permission to take photos
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-full"
          onPress={requestPermission}
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main camera view
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <CameraView 
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
      >
        {/* Top Header */}
        <View className="absolute top-0 left-0 right-0 bg-white pt-12 pb-4">
          <View className="flex-row items-center justify-between px-4">
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center"
              onPress={goBack}
            >
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>

            <Text className="text-lg font-bold">Report Found Item</Text>
            
            {photoCount > 0 ? (
              <View className="bg-blue-500 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">
                  {photoCount}/4
                </Text>
              </View>
            ) : (
              <View className="w-10 h-10" />
            )}
          </View>
        </View>

        {/* Centered Guide Box */}
        <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
          <View 
            className="w-80 h-96 rounded-3xl"
            style={{
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderStyle: 'dashed',
            }}
          />
          <View className="absolute bottom-0 left-0 right-0 bg-black/60 py-3 px-6 rounded-b-3xl">
            <Text className="text-white text-center text-sm">
              Center the item and take a clear photo
            </Text>
          </View>
        </View>

        {/* Bottom Controls - Separated Component */}
        <CameraControls
          isMaxPhotos={isMaxPhotos}
          onGalleryPress={pickFromGallery}
          onCapturePress={takePicture}
          onFlipPress={toggleCameraFacing}
        />
      </CameraView>
    </View>
  );
}

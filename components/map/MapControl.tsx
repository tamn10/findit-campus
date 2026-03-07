import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type MapControlProps = {
  onUserLocation: () => void;
  onInititalLocation: () => void;
};

export default function MapControl({
  onUserLocation,
  onInititalLocation,
}: MapControlProps) {
  return (
    <View className="absolute top-5 right-3 gap-2">
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-white p-3 shadow-lg rounded-lg"
        onPress={onInititalLocation}
      >
        <Ionicons name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-white p-3 shadow-lg rounded-lg"
        onPress={onUserLocation}
      >
        <Ionicons name="navigate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

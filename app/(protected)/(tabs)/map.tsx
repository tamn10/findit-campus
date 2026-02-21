import BottomNavigation from "@/components/map/BottomNavigation";
import Header from "@/components/map/Header";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

// Reserve space for bottom navigation
const BOTTOM_NAV_HEIGHT = 65;

export default function CampusMapScreen() {
  const [uselocation, setUselocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [searchQuery, setSearchQuery] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState({
    initialPosition: {
      latitude: 33.8823,
      longitude: -117.8851,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  });

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={location.initialPosition}
        showsMyLocationButton={true}
        showsUserLocation={true}
        provider={undefined}
      />
      <BottomNavigation activeTab="Map" />
    </View>
  );
}

import Header from "@/components/map/Header";
import RecentlyFoundItems from "@/components/map/RecentlyFoundItems";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

const recentlyFoundItems = [
  {
    id: "1",
    name: "AirPods Pro",
    location: "Science Lab",
    status: "New",
  },
  {
    id: "2",
    name: "Denim Jacket",
    location: "Library",
    status: "Found",
  },
  {
    id: "3",
    name: "Water Bottle",
    location: "Gym",
    status: "New",
  },
  {
    id: "4",
    name: "Textbook",
    location: "Library",
    status: "Found",
  },
  {
    id: "5",
    name: "Backpack",
    location: "Student Union",
    status: "Found",
  },
];

export default function CampusMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [searchQuery, setSearchQuery] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [initialPosition, setInitialPosition] = useState({
    latitude: 33.8808,
    longitude: -117.885,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
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

  const handleUserLocation = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // move map to user location
      if (mapRef.current && location) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000,
        );
      }
    } catch (error) {
      setErrorMsg("Error fetching location");
    }
  };

  const handleInitialLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(initialPosition, 1000);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <View className="flex-1">
        {/* Map View */}
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={initialPosition}
          showsMyLocationButton={false}
          showsUserLocation={true}
          showsCompass={false}
          provider={undefined}
        />

        {/* User Location & Initial Location Buttons */}

        <View className="absolute top-5 right-3 gap-2">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white p-3 shadow-lg rounded-lg"
            onPress={handleInitialLocation}
          >
            <Ionicons name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white p-3 shadow-lg rounded-lg"
            onPress={handleUserLocation}
          >
            <Ionicons name="navigate" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Placeholder for recently found items*/}
        <RecentlyFoundItems />
      </View>
    </View>
  );
}

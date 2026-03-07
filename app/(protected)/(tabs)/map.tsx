import Header from "@/components/map/Header";
import MapControls from "@/components/map/MapControl";
import RecentlyFoundItems from "@/components/map/RecentlyFoundItems";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useMapLocation } from "@/hooks/useMapLocation";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const lostItemsMarkers = [
  {
    id: "1",
    name: "AirPods Pro",
    image: "https://m.media-amazon.com/images/I/71-AOet91UL.jpg",
    description: "White AirPods Pro with charging case",
    posterName: "Alice",
    latitude: 33.8815,
    longitude: -117.8855,
  },
  {
    id: "2",
    name: "Denim Jacket",
    image: "https://m.media-amazon.com/images/I/71-AOet91UL.jpg",
    description: "Blue denim jacket with a hood",
    posterName: "Bob",
    latitude: 33.8805,
    longitude: -117.8845,
  },
  {
    id: "3",
    name: "Water Bottle",
    image: "https://m.media-amazon.com/images/I/71-AOet91UL.jpg",
    description: "Clear water bottle with a straw",
    posterName: "Charlie",
    latitude: 33.88,
    longitude: -117.886,
  },
];

type LostItem = {
  id: string;
  name: string;
  description: string;
  posterName: string;
  latitude: number;
  longitude: number;
};

export default function CampusMapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { mapRef, handleUserLocation, handleInitialLocation } =
    useMapLocation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [searchQuery, setSearchQuery] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
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

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

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
        >
          {lostItemsMarkers.map((item) => (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={() => {
                setSelectedItem(item);
                bottomSheetRef.current?.expand();
              }}
            />
          ))}
        </MapView>
        {/* Placeholder for recently found items*/}
        <RecentlyFoundItems />
        {/* User Location & Initial Location Buttons */}
        <MapControls
          onUserLocation={handleUserLocation}
          onInititalLocation={handleInitialLocation}
        />
        {selectedItem && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["50%"]}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView className="flex-1 mx-4 gap-7">
              <View className="flex-row items-center gap-4">
                <Image
                  source="https://picsum.photos/seed/696/3000/2000"
                  contentFit="cover"
                  transition={1000}
                  style={{ width: 64, height: 64, borderRadius: 8 }}
                />
                <View className="flex-1">
                  <Text className="text-blue-600 font-semibold">
                    FOUND 2H AGO
                  </Text>
                  <Text className="font-bold text-3xl">
                    {selectedItem.name}
                  </Text>
                  <Text className="text-gray-600">
                    {selectedItem.description}
                  </Text>
                </View>
                <Ionicons name="bookmark-outline" size={22} color="#6b7280" />
              </View>
              <View className="flex-row bg-gray-100 rounded-lg p-5 items-center gap-4">
                <Ionicons
                  name="person-circle-outline"
                  size={32}
                  color="#6b7280"
                />
                <View>
                  <Text className="text-gray-600">Posted by</Text>
                  <Text className="font-semibold">
                    {selectedItem.posterName}
                  </Text>
                </View>
              </View>
              <View className="flex-row bg-blue-500 rounded-2xl p-5 items-center gap-2 justify-center">
                <Ionicons name="chatbox" size={24} color="#ffff" />
                <Text className="text-white font-bold text-lg">
                  Message Finder
                </Text>
              </View>
            </BottomSheetView>
          </BottomSheet>
        )}
      </View>
    </View>
  );
}

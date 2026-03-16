import Header from "@/components/map/Header";
import ItemBottomSheet from "@/components/map/ItemBottomSheet";
import MapControls from "@/components/map/MapControl";
import RecentlyFoundItems from "@/components/map/RecentlyFoundItems";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useItemsActions } from "@/hooks/useItemsActions";
import { useMapLocation } from "@/hooks/useMapLocations";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type LostItem = {
  id: string;
  name: string;
  description: string;
  posterId: string;
  posterName: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
};

export default function CampusMapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { mapRef, handleUserLocation, handleInitialLocation } =
    useMapLocation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 33.8808,
    longitude: -117.885,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const { user } = useAuth();

  const { fetchItems, getPosterName } = useItemsActions();

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    fetchItems().then((items) => {
      const formattedItems = items.map((item: any) => ({
        id: item.id,
        name: item.description,
        description: item.description,
        posterId: item.posterId,
        posterName: item.posterName,
        latitude: item.location[0],
        longitude: item.location[1],
        createdAt: item.createdAt,
      }));

      setLostItems(formattedItems);
    });
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
          {lostItems.map((item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={async () => {
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
          <ItemBottomSheet
            bottomSheetRef={bottomSheetRef}
            renderBackdrop={renderBackdrop}
            selectedItem={selectedItem}
            currentUser={user}
            router={router}
          />
        )}
      </View>
    </View>
  );
}

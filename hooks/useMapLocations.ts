import * as Location from "expo-location";
import { useRef, useState } from "react";
import MapView from "react-native-maps";

export function useMapLocation() {
  const mapRef = useRef<MapView>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const initialPosition = {
    latitude: 33.8808,
    longitude: -117.885,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

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

      // move the map to user location
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

  // Move map to initial location on mount
  const handleInitialLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(initialPosition, 1000);
    }
  };

  return {
    mapRef,
    errorMsg,
    location,
    handleUserLocation,
    handleInitialLocation,
  };
}

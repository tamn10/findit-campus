import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const recentlyFoundItems = [
  {
    id: "1",
    name: "AirPods Pro",
    location: "Science Lab",
    status: "New",
    foundAt: "2h ago",
  },
  {
    id: "2",
    name: "Denim Jacket",
    location: "Library",
    status: "Found",
    foundAt: "2h ago",
  },
  {
    id: "3",
    name: "Water Bottle",
    location: "Gym",
    status: "New",
    foundAt: "2h ago",
  },
  {
    id: "4",
    name: "Textbook",
    location: "Library",
    status: "Found",
    foundAt: "2h ago",
  },
  {
    id: "5",
    name: "Backpack",
    location: "Student Union",
    status: "Found",
    foundAt: "2h ago",
  },
];

export default function RecentlyFoundItems() {
  return (
    <View className="absolute bottom-8 left-3">
      <Text className="text-left text-[15px] text-[#a0a0a0] font-bold">
        RECENTLY FOUND NEARBY
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      >
        {recentlyFoundItems.slice(0, 5).map((item) => (
          <TouchableOpacity
            key={item.id}
            className="w-52 bg-white rounded-xl mr-3 overflow-hidden p-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            {/* Image placeholder */}
            <View className="w-full h-24 bg-gray-200 items-center justify-center rounded-lg">
              <Text className="absolute top-2 right-2 text-xs text-red-500 font-bold">
                {item.status === "New" ? "NEW" : ""}
              </Text>
              <Ionicons name="image" size={24} color="#6b7280" />
            </View>

            {/* Info */}
            <View className="mt-3">
              <Text
                className="text-md font-semibold text-gray-900"
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
                {item.location} {" • "} {item.foundAt}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

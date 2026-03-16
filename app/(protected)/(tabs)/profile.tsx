import PageHeader from "@/components/shared/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <PageHeader title="Profile" />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4">
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text className="text-xl font-bold mb-2" style={{ color: textColor }}>
          {user?.displayName || "User Name"}
        </Text>
        <Text className="text-center" style={{ color: iconColor }}>
          Profile settings and information will appear here
        </Text>
        <Pressable
          className="mt-6 bg-red-600 py-3 px-6 rounded-md"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold">Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl">Home</Text>
      <Text>
        Welcome Back{" "}
        <Text className="font-bold text-blue-600">
          {useAuth().user?.displayName}
        </Text>
      </Text>

      <Text className="text-center text-gray-400 mt-4 text-sm">
        This is the protected home screen. Only visible when logged in.
      </Text>
      <Pressable
        onPress={useAuth().logOut}
        className="mt-6 bg-red-500 px-6 py-3 rounded-2xl"
      >
        <Text className="text-white text-lg font-semibold">← Logout</Text>
      </Pressable>

      <Pressable
        onPress={() => {router.push('/map')}}
        className="mt-6 bg-red-500 px-6 py-3 rounded-2xl"
      >
        <Text className="text-white text-lg font-semibold">Map Test</Text>
      </Pressable>
    </View>
  );
}

import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-lime-300">
      <Pressable onPress={() => router.back()} className="p-4">
        <Text className="text-xl">← Go Back</Text>
      </Pressable>
      <View className="flex-1 items-center justify-center">
        <Text>Register Screen</Text>
      </View>
    </SafeAreaView>
  );
}

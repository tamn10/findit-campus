import { Text, View } from "react-native";

export default function MessagesScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Messages Screen</Text>
      <Text className="text-gray-500 mt-2">
        This is where your messages will appear.
      </Text>
    </View>
  );
}

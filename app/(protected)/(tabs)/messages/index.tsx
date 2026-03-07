import { useThemeColor } from "@/hooks/use-theme-color";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockMessages = [
  {
    id: "1",
    name: "John Doe",
    description: "Hey, is this item still available?",
    timestamp: "2m",
    source: "https://picsum.photos/seed/696/3000/2000",
  },
];

export default function MessagesScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <Text className="text-2xl font-bold left-2" style={{ color: textColor }}>
        Messages Screen
      </Text>
      <ScrollView className="flex-1 flex-col gap-4">
        {mockMessages.map((messages) => (
          <TouchableOpacity
            key={messages.id}
            onPress={() => router.push("/chat/[id]")}
            className="flex-row w-full p-4 rounded-xl text-center justify-between"
          >
            <View className="flex-row items-center gap-4">
              <Image
                source={messages.source}
                contentFit="cover"
                transition={1000}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View className="flex-col">
                <Text className="text-white text-lg">{messages.name}</Text>
                <Text className="text-white text-xs">
                  {messages.description}
                </Text>
              </View>
            </View>
            <View className="text-center justify-center">
              <Text className="text-white">{messages.timestamp}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

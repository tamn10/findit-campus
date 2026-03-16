import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function ProtectedLayout() {
  const { posterName, posterAvatar } = useGlobalSearchParams<{
    posterName: string;
    posterAvatar: string;
  }>();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat/[id]"
        options={{
          title: "",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Image
                source={
                  posterAvatar
                    ? { uri: posterAvatar }
                    : require("@/assets/images/default-pfp.png")
                }
                contentFit="cover"
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text className="text-white text-lg font-bold">{posterName}</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

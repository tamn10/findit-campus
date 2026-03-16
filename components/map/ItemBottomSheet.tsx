import { timeAgo } from "@/hooks/useTime";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

export default function ItemBottomSheet({
  bottomSheetRef,
  renderBackdrop,
  selectedItem,
  currentUser,
  router,
  createdAt,
}: any) {
  return (
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
              FOUND{" "}
              {timeAgo(selectedItem.createdAt.toDate(), {
                upperCase: true,
                recentLabel: "recently",
              })}
            </Text>
            <Text className="font-bold text-3xl">{selectedItem.name}</Text>
            <Text className="text-gray-600">{selectedItem.description}</Text>
          </View>
          <Ionicons name="bookmark-outline" size={22} color="#6b7280" />
        </View>
        <View className="flex-row bg-gray-100 rounded-lg p-5 items-center gap-4">
          <Ionicons name="person-circle-outline" size={32} color="#6b7280" />
          <View>
            <Text className="text-gray-600">Posted by</Text>
            <Text className="font-semibold">
              {selectedItem.posterId === currentUser.uid
                ? "You"
                : selectedItem.posterName}
            </Text>
          </View>
        </View>

        {selectedItem.posterId !== currentUser?.uid &&
          !selectedItem.posterId && (
            <TouchableOpacity
              className="flex-row bg-blue-500 rounded-2xl p-5 items-center gap-2 justify-center"
              onPress={() => {
                const chatId = [currentUser.uid, selectedItem.posterId]
                  .sort()
                  .join("_");

                router.push({
                  pathname: "/chat/[id]",
                  params: {
                    id: chatId,
                    otherUserId: selectedItem.posterId,
                  },
                });
              }}
            >
              <Ionicons name="chatbox" size={24} color="#fff" />
              <Text className="text-white font-bold text-lg">
                Message Finder
              </Text>
            </TouchableOpacity>
          )}
      </BottomSheetView>
    </BottomSheet>
  );
}

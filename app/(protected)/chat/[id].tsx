import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockMessages = [
  {
    id: "1",
    name: "John Doe",
    messages: [
      { id: "1", text: "Hey, is this item still available?", sender: "other" },
      { id: "2", text: "Yes, it is! Are you interested?", sender: "me" },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    messages: [
      { id: "1", text: "Hi there!", sender: "other" },
      { id: "2", text: "Hello! How can I help you?", sender: "me" },
    ],
  },
];

export default function MessagesDetail() {
  const backgroundColor = useThemeColor({}, "background");
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        className="w-full"
      >
        <ScrollView style={{ flex: 1 }}>
          {/* chat messages will go here */}
          {mockMessages.map((messages) => (
            <View key={messages.id} className="p-4">
              <Text className="text-lg font-bold text-white">
                {messages.name}
              </Text>
              {messages.messages.map((message) => (
                <View
                  key={message.id}
                  className={`my-2 p-3 rounded-lg ${message.sender === "me" ? "bg-blue-500 self-end" : "bg-gray-300 self-start"}`}
                >
                  <Text
                    className={`${message.sender === "me" ? "text-white" : "text-black"}`}
                  >
                    {message.text}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Input bar */}
        <View className="flex-row items-center gap-4 p-3">
          <TextInput
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            className="flex-1 bg-neutral-800 text-white rounded-2xl px-4 py-3"
          />

          {message.trim().length > 0 && (
            <TouchableOpacity>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

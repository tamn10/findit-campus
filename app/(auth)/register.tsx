import { Link, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Fill all fields");
      return;
    }

    if (!email.endsWith("@csu.fullerton.edu")) {
      setError("Use your CSUF email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be 6+ chars");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(auth)/login");
    } catch (error) {
      alert("Failed to register. Please try again.");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Register screen rendered");
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-5xl mb-10">Sign Up</Text>
        <View className="gap-4 border border-gray-300 rounded-md p-4 mt-4 w-3/4">
          <Text>School Email</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={email}
            onChangeText={setEmail}
            placeholder="example@csu.fullerton.edu"
            placeholderTextColor={"#6c7781"}
            keyboardType="email-address"
          />
          <Text>Password</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Enter your password"
            placeholderTextColor={"#6c7781"}
            keyboardType="default"
          />
          <Text>Repeat password</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Repeat your password"
            placeholderTextColor={"#6c7781"}
            keyboardType="default"
          />
          <Pressable
            className="bg-gray-800 py-3 rounded-md mt-6"
            onPress={handleSignup}
            disabled={loading}
          >
            <Text className="text-center text-white text-lg font-semibold">
              {loading ? "Creating account..." : "Sign Up"}
            </Text>
          </Pressable>
          <View className="items-start">
            <Link href="/login" className="text-sm underline mt-4">
              Already have an account? Sign In
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

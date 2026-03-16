import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export function useAuthActions() {
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { user: userCredential.user, success: true };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        avatarUrl: "",
        createdAt: new Date(),
      });
      // await sendEmailVerification(user);
      return { user, success: true };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const resendVerification = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        Alert.alert(
          "Email Sent",
          "A new verification link has been sent to your email.",
        );
      }
    } catch (error) {
      console.error("Error resending verification:", error);
      Alert.alert(
        "Error",
        "Failed to resend verification email. Please try again later.",
      );
    }
  };

  return { login, register, resendVerification };
}

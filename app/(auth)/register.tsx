import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-5xl mb-10'>Sign Up</Text>
        <View className='gap-4 border border-gray-300 rounded-md p-4 mt-4 w-3/4'>
          <Text>School Email</Text>
          <TextInput
            keyboardType='email-address'
            className='border border-gray-300 rounded-md p-2 mt-1'
            placeholder='example@csu.fullerton.edu'
          />
          <Text>Password</Text>
          <TextInput
            keyboardType='default'
            secureTextEntry={true}
            className='border border-gray-300 rounded-md p-2 mt-1'
            placeholder='Enter your password'
          />
          <Text>Repeat password</Text>
          <TextInput
            keyboardType='default'
            secureTextEntry={true}
            className='border border-gray-300 rounded-md p-2 mt-1'
            placeholder='Repeat your password'
          />
          <Pressable className='bg-gray-800 py-3 rounded-md mt-6'>
            <Text className='text-center text-white text-lg font-semibold'>
              Sign Up
            </Text>
          </Pressable>
          <View className='items-start'>
            <Link
              href='/login'
              className='text-sm underline mt-4'
            >
              Already have an account? Sign In
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

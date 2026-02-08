import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountRecoveryScreen() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-white'>
      <Pressable
        onPress={() => router.back()}
        className='p-4'
      >
        <Text className='text-xl'>← Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

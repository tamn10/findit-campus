import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


export default function TabTwoScreen() {
  return (
      <ThemedView className="flex-1 items-center justify-center bg-white">
          <ThemedText className="text-xl font-bold text-blue-500">
              Hello
          </ThemedText>
      </ThemedView>
  );
}

import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: "#16423C" },
          headerTintColor: "#ffffff",
          statusBarColor: "#16423C",
          statusBarStyle: "light",
        }}
      />
      <ThemedView className="flex h-screen justify-center items-center p-10">
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" className="py-10 mt-10">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

import { Stack } from 'expo-router';

export default function RidesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="request" />
      <Stack.Screen name="navigate-pickup" />
      <Stack.Screen name="waiting" />
      <Stack.Screen name="in-progress" />
      <Stack.Screen name="completed" />
      <Stack.Screen name="rating" />
    </Stack>
  );
}
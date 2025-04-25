import React from 'react';
import { Stack } from 'expo-router';

export default function DriverAuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="check-license" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="license-validation-result" />
    </Stack>
  );
}
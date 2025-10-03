import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/utils/auth/useAuth';

export default function AuthLayout() {
  const router = useRouter();
  const { isAuthenticated, auth } = useAuth();

  useEffect(() => {
    if (isAuthenticated && auth?.verified) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, auth?.verified, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify-profile" />
    </Stack>
  );
}

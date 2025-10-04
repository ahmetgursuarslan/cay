
import { useAuth } from '@/utils/auth/useAuth';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { initiate, isReady, isAuthenticated, auth } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let t = setTimeout(() => setFontsReady(true), 1500);
    if (fontsLoaded) {
      setFontsReady(true);
      clearTimeout(t);
    }
    return () => clearTimeout(t);
  }, [fontsLoaded]);

  useEffect(() => {
    initiate();
  }, [initiate]);

  // Hide splash only when root providers are truly ready
  useEffect(() => {
    if (fontsReady && isReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsReady, isReady]);

  // Centralized auth-aware routing
  useEffect(() => {
    if (!isReady) return;
    const inAuthGroup = segments?.[0] === '(auth)';

    if (!isAuthenticated) {
      if (!inAuthGroup) router.replace('/(auth)/login');
      return;
    }
    // authenticated
    const verified = !!auth?.verified;
    if (!verified) {
      if (!(inAuthGroup && segments?.[1] === 'verify-profile')) {
        router.replace('/(auth)/verify-profile');
      }
      return;
    }
    // verified users shouldn't stay in auth group
    if (inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [isReady, isAuthenticated, auth?.verified, segments, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {fontsReady && isReady ? (
        <Stack screenOptions={{ headerShown: false }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" color="#16A34A" />
        </View>
      )}
    </QueryClientProvider>
  );
}


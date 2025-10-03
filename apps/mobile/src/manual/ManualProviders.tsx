import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@/utils/auth/useAuth';
import BootScreen from '@/components/BootScreen';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false } },
});

export const ManualProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initiate, isReady } = useAuth();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
  const ready = useMemo(() => isReady && fontsLoaded, [isReady, fontsLoaded]);

  useEffect(() => { initiate(); }, [initiate]);

  useEffect(() => {
    let forced = false;
    SplashScreen.preventAutoHideAsync().catch(()=>{});
    const t = setTimeout(()=>{ forced = true; SplashScreen.hideAsync().catch(()=>{}); }, 3000);
    return () => { clearTimeout(t); if (!forced) SplashScreen.hideAsync().catch(()=>{}); };
  }, []);

  useEffect(() => { if (ready) SplashScreen.hideAsync().catch(()=>{}); }, [ready]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex:1 }}>
          <ErrorBoundary>
            {ready ? children : <BootScreen />}
          </ErrorBoundary>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

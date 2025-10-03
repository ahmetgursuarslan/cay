import React, { useEffect } from 'react';
import { View, ActivityIndicator, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/utils/auth/useAuth';

export default function Logout() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const isDark = useColorScheme() === 'dark';
  useEffect(() => {
    setAuth(null); // clear any stored state (harmless in mock mode)
    router.replace('/(tabs)/home');
  }, [router, setAuth]);
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: isDark ? '#1F1F1F' : '#F9FAFB' }}>
      <ActivityIndicator />
    </View>
  );
}

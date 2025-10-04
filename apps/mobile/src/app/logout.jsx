import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/utils/auth/useAuth';

export default function LogoutScreen() {
  const router = useRouter();
  const { setAuth } = useAuth();
  useEffect(() => {
    setAuth(null);
    router.replace('/(auth)/login');
  }, [router, setAuth]);
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <ActivityIndicator />
    </View>
  );
}

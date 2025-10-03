import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/utils/auth/useAuth';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const { setAuth, isAuthenticated, auth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Auto-navigate if already authenticated
  useEffect(() => {
    if (isAuthenticated && auth?.verified) {
      router.replace('/(tabs)/home');
    } else if (isAuthenticated && !auth?.verified) {
      router.replace('/(auth)/verify-profile');
    }
  }, [isAuthenticated, auth?.verified, router]);

  const colors = {
    primary: isDark ? '#FFFFFF' : '#000000',
    secondary: isDark ? '#CCCCCC' : '#6B7280',
    accent: '#16A34A',
    background: isDark ? '#1F1F1F' : '#F9FAFB',
    card: isDark ? '#2A2A2A' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  const onLogin = () => {
    // Demo: Direkt verified=true ile home'a git (daha basit flow)
    setAuth({ jwt: 'demo-token', email, verified: true });
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top + 24, paddingHorizontal: 24 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Text style={{ fontSize: 24, color: colors.primary, marginBottom: 16 }}>Giriş Yap</Text>
      <TextInput placeholder="E-posta" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ backgroundColor: colors.card, color: colors.primary, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={{ backgroundColor: colors.card, color: colors.primary, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }} />
      <TouchableOpacity onPress={onLogin} style={{ backgroundColor: colors.accent, padding: 14, borderRadius: 12, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Giriş</Text>
      </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={{ padding: 14, alignItems: 'center', marginTop: 8 }}>
        <Text style={{ color: colors.secondary, fontSize: 14 }}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

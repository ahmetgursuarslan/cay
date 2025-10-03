import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/utils/auth/useAuth';
import { StatusBar } from 'expo-status-bar';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const colors = {
    primary: isDark ? '#FFFFFF' : '#000000',
    secondary: isDark ? '#CCCCCC' : '#6B7280',
    accent: '#16A34A',
    background: isDark ? '#1F1F1F' : '#F9FAFB',
    card: isDark ? '#2A2A2A' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  const onSignup = () => {
    // Demo: kayıt anında verified true
    setAuth({ jwt: 'demo', email, verified: true });
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top + 24, paddingHorizontal: 24 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Text style={{ fontSize: 24, color: colors.primary, marginBottom: 16 }}>Kayıt Ol</Text>
      <TextInput placeholder="E-posta" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ backgroundColor: colors.card, color: colors.primary, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={{ backgroundColor: colors.card, color: colors.primary, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }} />
      <TouchableOpacity onPress={onSignup} style={{ backgroundColor: colors.accent, padding: 14, borderRadius: 12, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Kayıt Ol</Text>
      </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={{ padding: 14, alignItems: 'center', marginTop: 8 }}>
        <Text style={{ color: colors.secondary, fontSize: 14 }}>Zaten hesabın var mı? Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

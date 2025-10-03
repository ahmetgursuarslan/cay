import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function VerifyProfile() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 24 }}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Profil Doğrulama</Text>
      <Text style={{ color: '#6B7280' }}>
        Doğrulama akışı geçici olarak devre dışı. Uygulamanın diğer bölümlerini test etmek için serbestçe dolaşabilirsiniz.
      </Text>
    </View>
  );
}

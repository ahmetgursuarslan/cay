import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function PhotoCheck() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 24 }}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Fotoğraf Kontrolü</Text>
      <Text style={{ color: '#6B7280' }}>
        Bu sayfa daha sonra detaylandırılacaktır. Şimdilik uygulama akışını engellememesi için basit bir yer tutucu olarak eklendi.
      </Text>
    </View>
  );
}

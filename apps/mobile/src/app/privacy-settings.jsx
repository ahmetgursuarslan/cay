import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Lock } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeBack } from '@/utils/navigation';

export default function PrivacySettings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const isDark = useColorScheme() === 'dark';

  const colors = {
    primary: isDark ? '#FFFFFF' : '#000000',
    secondary: isDark ? '#CCCCCC' : '#6B7280',
    accent: '#16A34A',
    background: isDark ? '#1F1F1F' : '#F9FAFB',
    card: isDark ? '#2A2A2A' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.card,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={safeBack}
            style={{
              width: 40,
              height: 40,
              backgroundColor: colors.background,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: colors.primary }}>Gizlilik Ayarları</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>
      {/* Content */}
      <View style={{ padding: 24 }}>
        <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Lock size={18} color={colors.primary} />
            <Text style={{ fontSize: 16, color: colors.primary, marginLeft: 12 }}>Veri Paylaşımı</Text>
          </View>
          <Text style={{ fontSize: 13, color: colors.secondary, lineHeight: 18 }}>
            Bu sayfa örnek olarak eklenmiştir. Gerekli ayarları burada toplayabiliriz.
          </Text>
        </View>
      </View>
    </View>
  );
}

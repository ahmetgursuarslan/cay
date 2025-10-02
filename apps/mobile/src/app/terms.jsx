import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, FileText } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  const colors = {
    primary: isDark ? '#FFFFFF' : '#000000',
    secondary: isDark ? '#CCCCCC' : '#6B7280',
    background: isDark ? '#1F1F1F' : '#F9FAFB',
    card: isDark ? '#2A2A2A' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ backgroundColor: colors.card, paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, backgroundColor: colors.background, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: colors.primary }}>Kullanım Koşulları</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <FileText size={18} color={colors.primary} />
            <Text style={{ fontSize: 16, color: colors.primary, marginLeft: 12 }}>Özet</Text>
          </View>
          <Text style={{ fontSize: 13, color: colors.secondary, lineHeight: 20 }}>
            Bu sayfa, uygulamanın kullanım koşullarını temsil eden örnek bir içeriktir. Gerçek koşullarınızla değiştirin.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

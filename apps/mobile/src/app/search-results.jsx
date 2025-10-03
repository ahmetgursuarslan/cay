import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function SearchResults() {
  const { q = '', type = 'name' } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const colors = { primary: isDark ? '#fff' : '#000', secondary: isDark ? '#ccc' : '#6B7280', background: isDark ? '#1F1F1F' : '#F9FAFB', card: isDark ? '#2A2A2A' : '#fff', border: isDark ? '#374151' : '#E5E7EB', accent: '#16A34A' };

  // Test data only – no real users, purely for visuals
  const items = useMemo(() => {
    const base = String(q || '').trim() || (type === 'phone' ? '+90 555 000 00 00' : type === 'email' ? 'ornek@example.com' : type === 'social' ? '@ornek_kullanici' : 'Ahmet Yılmaz');
    return [
      { id: '1', title: type === 'name' ? base : 'Ahmet Yılmaz', subtitle: type === 'phone' ? base : type === 'email' ? 'ahmet@example.com' : type === 'social' ? '@ahmet_istanbul' : '+90 555 123 45 67' },
      { id: '2', title: type === 'name' ? 'Ayşe Demir' : base, subtitle: type === 'phone' ? '+90 532 987 65 43' : type === 'email' ? base : type === 'social' ? base : 'ayse@example.com' },
      { id: '3', title: type === 'name' ? 'Mehmet Kaya' : 'Mehmet Kaya', subtitle: type === 'phone' ? '+90 530 765 43 21' : type === 'email' ? 'mehmet@example.com' : type === 'social' ? '@mehmetk' : base },
    ];
  }, [q, type]);

  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ backgroundColor: colors.card, paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>Arama Sonuçları</Text>
          <View style={{ width:40 }} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={{ color: colors.secondary, marginBottom: 6 }}>Sorgu</Text>
        <Text style={{ color: colors.primary, fontWeight:'600', marginBottom: 12 }}>{String(q)}</Text>
        <Text style={{ color: colors.secondary, marginBottom: 10 }}>Tür</Text>
        <Text style={{ color: colors.primary, fontWeight:'600', marginBottom: 16 }}>{String(type)}</Text>

        <Text style={{ color: colors.secondary, marginBottom: 12 }}>Sonuçlar ({items.length})</Text>
        {items.map((it) => (
          <View key={it.id} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.primary, fontWeight:'600', marginBottom: 4 }}>{it.title}</Text>
            <Text style={{ color: colors.secondary }}>{it.subtitle}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

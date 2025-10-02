import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PhotoCheck() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const colors = { background: isDark ? '#1F1F1F' : '#F9FAFB', surface: isDark ? '#2A2A2A' : '#FFFFFF', border: isDark ? '#374151' : '#E5E7EB', primary: isDark ? '#fff' : '#000', secondary: isDark ? '#CCCCCC' : '#6B7280', accent:'#16A34A', accentLight:'#DCFCE7' };
  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>Fotoğraf Doğrulama</Text>
          <View style={{ width:40 }} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 20, borderWidth:1, borderColor: colors.border }}>
          <View style={{ alignItems:'center', marginBottom: 12 }}>
            <Camera size={40} color={colors.accent} />
          </View>
          <Text style={{ color: colors.primary, fontSize: 16, textAlign:'center', marginBottom: 8 }}>Ters Görsel Arama Yakında</Text>
          <Text style={{ color: colors.secondary, textAlign:'center', marginBottom: 16 }}>
            Fotoğrafla eşleşen çevrimiçi görüntüleri bulmaya yardımcı olacak özellik üzerinde çalışıyoruz.
          </Text>
          <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: colors.accent, paddingVertical: 12, borderRadius: 10 }}>
            <Text style={{ color:'#fff', textAlign:'center', fontWeight:'600' }}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

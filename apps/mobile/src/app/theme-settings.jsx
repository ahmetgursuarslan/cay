import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@/utils/settings/store';

export default function ThemeSettings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const systemDark = useColorScheme() === 'dark';
  const colors = { background: systemDark ? '#1F1F1F' : '#F9FAFB', surface: systemDark ? '#2A2A2A' : '#FFFFFF', border: systemDark ? '#374151' : '#E5E7EB', primary: systemDark ? '#fff' : '#000', secondary: systemDark ? '#CCCCCC' : '#6B7280', accent:'#16A34A', accentLight:'#DCFCE7' };
  const { init, isReady, appearance, save } = useSettingsStore();
  const [theme, setTheme] = useState('system');
  useEffect(() => { init(); }, [init]);
  useEffect(() => { if (isReady) setTheme(appearance?.theme || 'system'); }, [isReady, appearance]);
  const options = [
    { key:'system', label:'Sistem Varsayılanı' },
    { key:'light', label:'Açık' },
    { key:'dark', label:'Koyu' },
  ];
  const onSelect = async (key) => {
    setTheme(key);
    await save({ appearance: { theme: key } });
    router.back();
  };
  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={systemDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>Tema Ayarları</Text>
          <View style={{ width:40 }} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        {options.map(opt => (
          <TouchableOpacity key={opt.key} onPress={() => onSelect(opt.key)} style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 16, borderWidth:1, borderColor: colors.border, marginBottom: 12, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>{opt.label}</Text>
            {theme === opt.key && <Check size={20} color={colors.accent} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

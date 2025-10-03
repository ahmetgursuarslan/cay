import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeBack } from '@/utils/navigation';
import { useSettingsStore } from '@/utils/settings/store';

export default function NotificationSettings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const isDark = useColorScheme() === 'dark';
  const colors = { background: isDark ? '#1F1F1F' : '#F9FAFB', surface: isDark ? '#2A2A2A' : '#FFFFFF', border: isDark ? '#374151' : '#E5E7EB', primary: isDark ? '#fff' : '#000', secondary: isDark ? '#CCCCCC' : '#6B7280', accent:'#16A34A', accentLight:'#DCFCE7' };
  const { init, isReady, notifications, save } = useSettingsStore();
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  useEffect(() => { init(); }, [init]);
  useEffect(() => { if (isReady) { setPush(!!notifications?.push); setEmail(!!notifications?.email); setSound(!!notifications?.sound); setVibrate(!!notifications?.vibrate); } }, [isReady, notifications]);
  useEffect(() => { if (isReady) save({ notifications: { push, email, sound, vibrate } }); }, [push, email, sound, vibrate]);
  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={safeBack} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>Bildirim Ayarları</Text>
          <View style={{ width:40 }} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        {[{label:'Push Bildirimleri', value:push, setter:setPush},{label:'E-posta Bildirimleri', value:email, setter:setEmail},{label:'Ses', value:sound, setter:setSound},{label:'Titreşim', value:vibrate, setter:setVibrate}].map((item, idx) => (
          <View key={idx} style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 16, borderWidth:1, borderColor: colors.border, marginBottom: 12, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>{item.label}</Text>
            <Switch value={item.value} onValueChange={item.setter} trackColor={{ false: colors.border, true: colors.accentLight }} thumbColor={item.value ? colors.accent : colors.background} />
          </View>
        ))}
      </View>
    </View>
  );
}

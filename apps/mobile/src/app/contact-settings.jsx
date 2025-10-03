import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Save } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeBack } from '@/utils/navigation';
import { useSettingsStore } from '@/utils/settings/store';
import { getIsDark, makeColors } from '@/utils/theme';

export default function ContactSettings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const systemDark = useColorScheme() === 'dark';
  const { init, isReady, contact, save, appearance } = useSettingsStore();
  const isDark = getIsDark(systemDark, appearance?.theme);
  const colors = makeColors(isDark);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => { init(); }, [init]);
  useEffect(() => { if (isReady) { setEmail(contact?.email || ''); setPhone(contact?.phone || ''); } }, [isReady, contact]);
  const onSave = async () => { await save({ contact: { email, phone } }); safeBack(); };
  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={safeBack} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>İletişim Ayarları</Text>
          <TouchableOpacity onPress={onSave} style={{ flexDirection:'row', alignItems:'center', backgroundColor: colors.accent, paddingHorizontal: 14, paddingVertical:10, borderRadius: 10 }}>
            <Save size={18} color="#fff" />
            <Text style={{ color:'#fff', marginLeft:8, fontWeight:'600' }}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding:16 }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 16, borderWidth:1, borderColor: colors.border }}>
          <Text style={{ color: colors.secondary, marginBottom: 8 }}>E-posta</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="ornek@mail.com" placeholderTextColor={colors.secondary} keyboardType="email-address" autoCapitalize="none" style={{ color: colors.primary, borderWidth:1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: isDark ? '#262626' : '#FFFFFF' }} />
          <Text style={{ color: colors.secondary, marginBottom: 8 }}>Telefon</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="05xx xxx xx xx" placeholderTextColor={colors.secondary} keyboardType="phone-pad" style={{ color: colors.primary, borderWidth:1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: isDark ? '#262626' : '#FFFFFF' }} />
        </View>
      </View>
    </View>
  );
}

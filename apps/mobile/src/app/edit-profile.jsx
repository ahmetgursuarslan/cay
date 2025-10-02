import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Save } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@/utils/settings/store';
import { getIsDark, makeColors } from '@/utils/theme';

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const systemDark = useColorScheme() === 'dark';
  const { init, isReady, profile, save, appearance } = useSettingsStore();
  const isDark = getIsDark(systemDark, appearance?.theme);
  const colors = makeColors(isDark);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => { init(); }, [init]);
  useEffect(() => {
    if (isReady) {
      setFirstName(profile?.firstName || '');
      setLastName(profile?.lastName || '');
      setBio(profile?.bio || '');
    }
  }, [isReady, profile]);

  const onSave = async () => {
    await save({ profile: { firstName, lastName, bio } });
    router.back();
  };

  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight: '600' }}>Profili Düzenle</Text>
          <TouchableOpacity onPress={onSave} style={{ flexDirection:'row', alignItems:'center', backgroundColor: colors.accent, paddingHorizontal: 14, paddingVertical:10, borderRadius: 10 }}>
            <Save size={18} color="#fff" />
            <Text style={{ color:'#fff', marginLeft:8, fontWeight:'600' }}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ color: colors.secondary, marginBottom: 8 }}>Ad</Text>
          <TextInput value={firstName} onChangeText={setFirstName} placeholder="Ad" placeholderTextColor={colors.secondary} style={{ color: colors.primary, borderWidth:1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: isDark ? '#262626' : '#FFFFFF' }} />
          <Text style={{ color: colors.secondary, marginBottom: 8 }}>Soyad</Text>
          <TextInput value={lastName} onChangeText={setLastName} placeholder="Soyad" placeholderTextColor={colors.secondary} style={{ color: colors.primary, borderWidth:1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: isDark ? '#262626' : '#FFFFFF' }} />
          <Text style={{ color: colors.secondary, marginBottom: 8 }}>Biyografi</Text>
          <TextInput value={bio} onChangeText={setBio} placeholder="Kendiniz hakkında kısa bir açıklama" placeholderTextColor={colors.secondary} multiline numberOfLines={4} style={{ color: colors.primary, borderWidth:1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, minHeight: 100, textAlignVertical: 'top', backgroundColor: isDark ? '#262626' : '#FFFFFF' }} />
        </View>
      </ScrollView>
    </View>
  );
}

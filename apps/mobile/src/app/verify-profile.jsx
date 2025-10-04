import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, Camera } from 'lucide-react-native';
import { useAuth } from '@/utils/auth/useAuth';
import { useRouter } from 'expo-router';

export default function VerifyProfile() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const colors = { background: isDark ? '#1F1F1F' : '#F9FAFB', surface: isDark ? '#2A2A2A' : '#FFFFFF', border: isDark ? '#374151' : '#E5E7EB', primary: isDark ? '#fff' : '#000', secondary: isDark ? '#CCCCCC' : '#6B7280', accent: '#16A34A', accentLight:'#DCFCE7' };
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  const onVerify = () => { setAuth({ ...(auth || {}), verified: true }); router.replace('/(tabs)/home'); };
  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: colors.surface, borderBottomWidth:1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor: colors.background }}>
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight:'600' }}>Profil DoÄŸrulama</Text>
          <View style={{ width:40 }} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 20, borderWidth:1, borderColor: colors.border }}>
          <View style={{ alignItems:'center', marginBottom: 12 }}>
            <CheckCircle size={40} color={colors.accent} />
          </View>
          <Text style={{ color: colors.primary, fontSize: 16, textAlign:'center', marginBottom: 8 }}>GÃ¼venli deneyim iÃ§in hesabÄ±nÄ±zÄ± doÄŸrulayÄ±n</Text>
          <Text style={{ color: colors.secondary, textAlign:'center', marginBottom: 16 }}>
            FotoÄŸraf doÄŸrulama ve temel bilgiler ile topluluk gÃ¼venliÄŸini artÄ±rÄ±yoruz.
          </Text>
          <TouchableOpacity onPress={() => router.push('/photo-check')} style={{ backgroundColor: colors.accentLight, paddingVertical: 12, borderRadius: 10, marginBottom: 10, alignItems:'center' }}>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
              <Camera size={18} color={colors.accent} />
              <Text style={{ color: colors.accent, fontWeight:'600', marginLeft: 8 }}>FotoÄŸraf DoÄŸrulama</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onVerify} style={{ backgroundColor: colors.accent, paddingVertical: 12, borderRadius: 10 }}>
            <Text style={{ color:'#fff', textAlign:'center', fontWeight:'600' }}>Åimdilik DoÄŸrula</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

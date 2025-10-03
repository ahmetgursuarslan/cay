import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, useColorScheme, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search as SearchIcon, User, Shield, Star, AlertTriangle } from 'lucide-react-native';
import { makeColors, getIsDark } from '@/utils/theme';
import { useSettingsStore } from '@/utils/settings/store';

const DUMMY_DATA = [
  { id: '1', type: 'profile', name: 'Mehmet K.', safety: 'warning', desc: 'İstanbul • 3 yorum', rating: 2 },
  { id: '2', type: 'profile', name: 'Ali Y.', safety: 'safe', desc: 'Ankara • 5 yorum', rating: 5 },
  { id: '3', type: 'profile', name: 'Emre S.', safety: 'danger', desc: 'İzmir • 4 yorum', rating: 1 },
  { id: '4', type: 'topic', name: 'İlk Buluşma Güvenliği', safety: 'info', desc: 'Rehber • Güvenlik', rating: null },
  { id: '5', type: 'topic', name: 'Kırmızı Bayrak Örnekleri', safety: 'info', desc: 'Makale • 8 ipucu', rating: null },
  { id: '6', type: 'profile', name: 'Ahmet D.', safety: 'safe', desc: 'Bursa • 1 yorum', rating: 4 },
];

const SAFETY_COLORS = (c) => ({
  safe: { bg: c.accentLight, fg: c.accent, label: 'Güvenli' },
  warning: { bg: '#FEF3C7', fg: '#F59E0B', label: 'Dikkat' },
  danger: { bg: '#FEE2E2', fg: '#EF4444', label: 'Riskli' },
  info: { bg: c.card, fg: c.secondary, label: 'Bilgi' },
});

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const systemDark = useColorScheme() === 'dark';
  const { appearance } = useSettingsStore();
  const isDark = getIsDark(systemDark, appearance?.theme);
  const colors = makeColors(isDark);

  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => { setDebounced(query.trim()); setLoading(false); }, 450);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    if (!debounced) return [];
    const q = debounced.toLowerCase();
    return DUMMY_DATA.filter(item => item.name.toLowerCase().includes(q));
  }, [debounced]);

  const safetyTokens = SAFETY_COLORS(colors);

  const renderBadge = (item) => {
    if (item.type === 'topic') return null;
    const tok = safetyTokens[item.safety] || safetyTokens.info;
    return (
      <View style={{ backgroundColor: tok.bg, paddingHorizontal:10, paddingVertical:4, borderRadius: 14, marginRight:8 }}>
        <Text style={{ color: tok.fg, fontSize:11, fontWeight:'600' }}>{tok.label}</Text>
      </View>
    );
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <View style={{ flexDirection:'row', marginLeft: 'auto' }}>
        {Array.from({ length:5 }).map((_,i)=>(
          <Star key={i} size={14} color={i < rating ? '#F59E0B' : colors.border} fill={i < rating ? '#F59E0B' : 'transparent'} style={{ marginLeft:2 }} />
        ))}
      </View>
    );
  };

  const ContentState = () => {
    if (!query) return (
      <View style={styles.stateWrap}> 
        <SearchIcon size={42} color={colors.secondary} />
        <Text style={[styles.stateTitle, { color: colors.primary }]}>Arama Yap</Text>
        <Text style={[styles.stateDesc, { color: colors.secondary }]}>Profil veya konu ismi yazmaya başla.</Text>
      </View>
    );
    if (loading) return (
      <View style={styles.stateWrap}> 
        <ActivityIndicator color={colors.accent} />
        <Text style={[styles.stateDesc, { color: colors.secondary, marginTop:12 }]}>Aranıyor…</Text>
      </View>
    );
    if (debounced && results.length === 0) return (
      <View style={styles.stateWrap}> 
        <AlertTriangle size={40} color={colors.warning} />
        <Text style={[styles.stateTitle, { color: colors.primary }]}>Sonuç Yok</Text>
        <Text style={[styles.stateDesc, { color: colors.secondary }]}>Farklı bir kelime dene.</Text>
      </View>
    );
    return (
      <View style={{ paddingHorizontal:24, paddingTop:8 }}>
        <Text style={{ fontSize:14, fontWeight:'600', color: colors.secondary, marginBottom:12 }}>{results.length} sonuç</Text>
        {results.map(item => (
          <Pressable
            key={item.id}
            onPress={() => console.log('[SEARCH] item press', item.id)}
            android_ripple={{ color: colors.accent + '22' }}
            style={({ pressed }) => [{ backgroundColor: colors.card, borderWidth:1, borderColor: colors.border, padding:16, borderRadius:18, marginBottom:14, shadowColor:'#000', shadowOpacity:isDark?0.4:0.08, shadowRadius:6, shadowOffset:{ width:0, height:2 }, transform:[{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <View style={{ flexDirection:'row', alignItems:'center', marginBottom:10 }}>
              <View style={{ width:46, height:46, borderRadius:16, backgroundColor: colors.accentLight, alignItems:'center', justifyContent:'center', marginRight:12 }}>
                {item.type === 'profile' ? <User size={24} color={colors.accent} /> : <SearchIcon size={24} color={colors.accent} />}
              </View>
              <View style={{ flex:1 }}>
                <Text style={{ fontSize:16, fontWeight:'600', color: colors.primary, marginBottom:2 }}>{item.name}</Text>
                <Text style={{ fontSize:12, fontWeight:'500', color: colors.secondary }}>{item.desc}</Text>
              </View>
              {renderStars(item.rating)}
            </View>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
              {renderBadge(item)}
              {item.type === 'topic' && (
                <View style={{ backgroundColor: colors.accentLight, paddingHorizontal:10, paddingVertical:4, borderRadius:14 }}>
                  <Text style={{ color: colors.accent, fontSize:11, fontWeight:'600' }}>Rehber</Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex:1 }} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}>
        <View style={{ paddingTop: insets.top + 32, paddingHorizontal:24, paddingBottom:12 }}>
          <Text style={{ fontSize:26, fontWeight:'700', color: colors.primary, marginBottom:4 }}>Arama</Text>
          <Text style={{ fontSize:13, fontWeight:'500', color: colors.secondary, marginBottom:16 }}>Kullanıcıları veya güvenlik konularını keşfet</Text>
          <View style={{ flexDirection:'row', alignItems:'center', backgroundColor: colors.card, borderWidth:1, borderColor: colors.border, borderRadius:16, paddingHorizontal:14 }}> 
            <SearchIcon size={18} color={colors.secondary} />
            <TextInput
              style={{ flex:1, paddingVertical:10, paddingHorizontal:8, fontSize:15, color: colors.primary }}
              placeholder='İsim veya konu ara...'
              placeholderTextColor={colors.secondary}
              value={query}
              onChangeText={setQuery}
              returnKeyType='search'
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} hitSlop={10} style={{ padding:4 }}>
                <Text style={{ color: colors.secondary, fontWeight:'600' }}>×</Text>
              </Pressable>
            )}
          </View>
        </View>
        <ContentState />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stateWrap: { alignItems:'center', justifyContent:'center', paddingTop:60 },
  stateTitle: { fontSize:18, fontWeight:'700', marginTop:16, marginBottom:6 },
  stateDesc: { fontSize:13, fontWeight:'500' },
});
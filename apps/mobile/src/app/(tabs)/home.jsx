import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Search, Shield, MessageSquare, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { makeColors, getIsDark } from '@/utils/theme';
import { useSettingsStore } from '@/utils/settings/store';

export default function HomeScreen() {
	const insets = useSafeAreaInsets();
	const systemDark = useColorScheme() === 'dark';
	const { appearance } = useSettingsStore();
	const isDark = getIsDark(systemDark, appearance?.theme);
	const colors = makeColors(isDark);
	const router = useRouter();

	const cards = [
		{ icon: Search, title: 'Ara', desc: 'Kişi / konu arayın', color: colors.accent, onPress: () => { console.log('[CARD] navigate search'); router.push('/(tabs)/search'); } },
		{ icon: MessageSquare, title: 'Yorumlar', desc: 'Topluluk deneyimleri', color: colors.warning, onPress: () => { console.log('[CARD] navigate reviews'); router.push('/(tabs)/reviews'); } },
		{ icon: Shield, title: 'Güvenlik', desc: 'İpuçları ve rehber', color: colors.blue, onPress: () => { console.log('[CARD] navigate safety'); router.push('/(tabs)/safety'); } },
		{ icon: User, title: 'Profil', desc: 'Hesap ve ayarlar', color: colors.purple, onPress: () => { console.log('[CARD] navigate profile'); router.push('/(tabs)/profile'); } },
	];

	return (
		<View style={[styles.root, { backgroundColor: colors.background }]}> 
			<ScrollView style={{ flex:1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
				<View style={{ paddingTop: insets.top + 32, paddingHorizontal: 24 }}>
					<Text style={[styles.heading, { color: colors.primary }]}>Hoş Geldin</Text>
					<Text style={[styles.subHeading, { color: colors.secondary }]}>Güvenli flört topluluğuna göz at.</Text>
				</View>
				<View style={{ paddingHorizontal:24, paddingTop: 12 }}>
					{cards.reduce((rows, card, idx) => {
						if (idx % 2 === 0) rows.push([card]); else rows[rows.length -1].push(card); return rows;
					}, []).map((row, i) => (
						<View key={i} style={{ flexDirection:'row', marginBottom:16 }}>
							{row.map((c, j) => (
								<Pressable
									key={c.title}
									onPress={c.onPress}
									onPressIn={() => console.log('[PRESS IN]', c.title)}
									onPressOut={() => console.log('[PRESS OUT]', c.title)}
									onLongPress={() => console.log('[LONG PRESS]', c.title)}
									android_ripple={{ color: c.color + '33' }}
									style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, flex:1, marginRight: j === 0 && row.length === 2 ? 12 : 0, transform:[{ scale: pressed ? 0.97 : 1 }] }]}
								>
									<View style={[styles.iconWrap, { backgroundColor: c.color + '22' }]}> 
										<c.icon size={22} color={c.color} />
									</View>
									<Text style={[styles.cardTitle, { color: colors.primary }]}>{c.title}</Text>
									<Text style={[styles.cardDesc, { color: colors.secondary }]}>{c.desc}</Text>
								</Pressable>
							))}
							{row.length === 1 && <View style={{ flex:1 }} />}
						</View>
					))}
				</View>

				<View style={{ paddingHorizontal:24, paddingTop: 8 }}>
					<View style={[styles.infoBlock, { backgroundColor: colors.accent, }]}> 
						<Home size={28} color="white" style={{ marginBottom: 12 }} />
						<Text style={[styles.infoTitle, { color: 'white' }]}>Topluluk Güveni</Text>
						<Text style={[styles.infoText, { color: 'rgba(255,255,255,0.85)' }]}>Deneyim paylaş, başkalarına yardımcı ol ve güvenli buluşmalar oluştur.</Text>
						<Pressable onPress={() => router.push('/(tabs)/reviews')} style={({ pressed }) => [styles.ctaBtn, { backgroundColor: 'white', opacity: pressed ? 0.85 : 1 }]}>
							<Text style={[styles.ctaText, { color: colors.accent }]}>Yorumları Gör</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex:1 },
	heading: { fontSize:28, fontWeight:'700', marginBottom:4 },
	subHeading: { fontSize:14, fontWeight:'500', marginBottom:24 },
	card: { borderWidth:1, borderRadius:18, padding:18, justifyContent:'flex-start' },
	iconWrap: { width:48, height:48, borderRadius:16, alignItems:'center', justifyContent:'center', marginBottom:12 },
	cardTitle: { fontSize:16, fontWeight:'600', marginBottom:4 },
	cardDesc: { fontSize:12, fontWeight:'500' },
	infoBlock: { borderRadius:24, padding:24, alignItems:'center', marginBottom: 32, shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10, shadowOffset:{ width:0, height:4 } },
	infoTitle: { fontSize:18, fontWeight:'700', marginBottom:8 },
	infoText: { fontSize:14, textAlign:'center', lineHeight:20, marginBottom:16 },
	ctaBtn: { paddingHorizontal:24, paddingVertical:12, borderRadius:30 },
	ctaText: { fontSize:15, fontWeight:'600' }
});
import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Search, User, Shield, MessageSquare } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const baseTabBar = {
    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
    height: 54 + insets.bottom,
    paddingBottom: insets.bottom + 4,
    paddingTop: 4,
  };
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: baseTabBar,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500', marginTop: 2 },
      }}
    >
  <Tabs.Screen name="home" options={{ title: 'Ana', tabBarIcon: ({color}) => <Home size={22} color={color} /> }} />
  <Tabs.Screen name="search" options={{ title: 'Ara', tabBarIcon: ({color}) => <Search size={22} color={color} /> }} />
  <Tabs.Screen name="reviews" options={{ title: 'Yorumlar', tabBarIcon: ({color}) => <MessageSquare size={22} color={color} /> }} />
  <Tabs.Screen name="safety" options={{ title: 'Güvenlik', tabBarIcon: ({color}) => <Shield size={22} color={color} /> }} />
  <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: ({color}) => <User size={22} color={color} /> }} />
    </Tabs>
  );
}
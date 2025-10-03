import { Tabs } from "expo-router";
import { Home, Search, MessageSquare, Shield, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import React from "react";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  // Public tabs; auth guard intentionally disabled

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1E1E1E" : "#fff",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#2C2C2C" : "#E5E7EB",
          paddingBottom: insets.bottom + 5,
          paddingTop: 10,
          height: 49 + insets.bottom + 10,
        },
        tabBarActiveTintColor: "#16A34A", // Green color similar to tea app
        tabBarInactiveTintColor: isDark ? "#8A8A8A" : "#8E8E93",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Araştır",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: "Yorumlar",
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="safety"
        options={{
          title: "Güvenlik",
          tabBarIcon: ({ color }) => <Shield size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
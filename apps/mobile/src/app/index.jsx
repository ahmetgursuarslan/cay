import { Redirect } from "expo-router";
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from "@/utils/auth/useAuth";

export default function Index() {
  const { isReady, isAuthenticated, auth } = useAuth();
  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#16A34A" />
      </View>
    );
  }
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  if (!auth?.verified) {
    return <Redirect href="/(auth)/verify-profile" />;
  }
  return <Redirect href="/(tabs)/home" />;
}


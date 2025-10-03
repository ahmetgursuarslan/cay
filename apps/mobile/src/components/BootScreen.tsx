// GPT5-AUTO-FIX: Simple boot screen to avoid white flashes during initialization
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function BootScreen() {
  return (
    <View pointerEvents="none" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}

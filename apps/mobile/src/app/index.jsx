import React from 'react';
import { Redirect } from 'expo-router';

// Auth bypass: always go to home
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
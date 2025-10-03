import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import { ManualProviders } from './ManualProviders';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#E6FFF4' }}>
      <Text style={{ fontSize:22, fontWeight:'700', color:'#064E3B', marginBottom:16 }}>Manual Home</Text>
      <TouchableOpacity onPress={() => console.log('[MANUAL] home press')} style={{ backgroundColor:'#16A34A', paddingHorizontal:24, paddingVertical:14, borderRadius:12 }}>
        <Text style={{ color:'#fff', fontWeight:'600' }}>Press</Text>
      </TouchableOpacity>
    </View>
  );
}

function Search() {
  return <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#FFF9E6' }}><Text style={{ fontSize:20 }}>Manual Search</Text></View>;
}

function ManualTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown:false }}>
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="search" component={Search} />
    </Tabs.Navigator>
  );
}

export default function AppManual() {
  return (
    <ManualProviders>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown:false }}>
          <Stack.Screen name="tabs" component={ManualTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ManualProviders>
  );
}

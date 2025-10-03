import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeTest() {
  console.log('[HOME-TEST] mount');
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#F2FDF6' }}>
      <Text style={{ fontSize:22, fontWeight:'700', color:'#15803D', marginBottom:16 }}>HOME TEST</Text>
      <TouchableOpacity onPress={() => console.log('[HOME-TEST] press')} style={{ backgroundColor:'#16A34A', paddingHorizontal:24, paddingVertical:14, borderRadius:12 }}>
        <Text style={{ color:'white', fontWeight:'600' }}>Test Press</Text>
      </TouchableOpacity>
    </View>
  );
}

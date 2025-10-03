// GPT5-AUTO-FIX: Global error boundary to prevent silent white screens
import React from 'react';
import { View, Text, Button } from 'react-native';

export class ErrorBoundary extends React.Component<any, { error?: Error }> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Boundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Bir şeyler ters gitti.</Text>
          <Text style={{ marginBottom: 16 }}>{String(this.state.error.message || this.state.error)}</Text>
          <Button title="Uygulamayı Yeniden Başlat" onPress={() => this.setState({ error: undefined })} />
        </View>
      );
    }
    return this.props.children as React.ReactNode;
  }
}

export default ErrorBoundary;

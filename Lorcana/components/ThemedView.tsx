import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface ThemedViewProps {
  style?: any;
  children: React.ReactNode;
}

export default function ThemedView({ style, children }: ThemedViewProps) {
  const backgroundColor = useThemeColor({}, 'background');
  return <View style={[styles.container, { backgroundColor }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

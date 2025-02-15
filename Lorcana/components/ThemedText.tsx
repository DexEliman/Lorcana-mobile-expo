import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface ThemedTextProps {
  style?: any;
  children: React.ReactNode;
  type?: 'title' | 'link' | 'default';
}

export default function ThemedText({ style, children, type = 'default' }: ThemedTextProps) {
  const color = useThemeColor({}, 'text');
  
  const textStyles = {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      fontSize: 16,
      color: '#007AFF',
      textDecorationLine: 'underline',
    },
    default: {
      fontSize: 16,
    },
  };

  return <Text style={[textStyles[type], { color }, style]}>{children}</Text>;
}

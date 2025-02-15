import React from 'react';
import { Text } from 'react-native';

interface IconSymbolProps {
  size: number;
  name: string;
  color: string;
}

const IconSymbol = ({ size, name, color }: IconSymbolProps) => {
  return (
    <Text style={{ fontSize: size, color }}>
      {name}
    </Text>
  );
};

export default IconSymbol;

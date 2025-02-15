import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface HapticTabProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const HapticTab = ({ children, onPress }: HapticTabProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

export default HapticTab;

import { BlurView } from 'expo-blur';
import { useBottomTabBarHeight } from 'expo-router/build/react-navigation/bottom-tabs/utils/useBottomTabBarHeight';
import { StyleSheet } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

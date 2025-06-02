import { Tabs, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/app-example/components/HapticTab';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol';
import TabBarBackground from '@/app-example/components/ui/TabBarBackground';
import { Colors } from '@/app-example/constants/Colors';
import { useColorScheme } from '@/app-example/hooks/useColorScheme';
import { IconButton } from 'react-native-paper';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,    // important to display nav bar
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Directory',
          tabBarIcon: ({ color, focused }) => <IconButton size={28} icon={focused ? "folder-open" : "folder-open-outline"} />,
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          title: 'Note',
          tabBarIcon: ({ color, focused }) => <IconButton size={28} icon={focused ? "note" : "note-outline"} />,
        }}
      />
    </Tabs>
  );
}

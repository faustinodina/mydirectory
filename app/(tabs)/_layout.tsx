import { Tabs, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/ui/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { IconButton, useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
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

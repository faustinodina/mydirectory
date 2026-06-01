import { Tabs, useNavigation } from 'expo-router';
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
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        headerShown: true,    // important to display nav bar
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.onPrimary,
        headerStatusBarHeight: 0,
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
          tabBarIcon: ({ color, focused }) => <IconButton size={28} iconColor={color as string} icon={focused ? "folder-open" : "folder-open-outline"} />,
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          title: 'Note',
          tabBarIcon: ({ color, focused }) => <IconButton size={28} iconColor={color as string} icon={focused ? "note" : "note-outline"} />,
        }}
      />
    </Tabs>
  );
}

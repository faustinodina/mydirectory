import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/ui/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAppSelector } from '@/store/hooks';
import { selectSelectedNodeId } from '@/store/slices/tree-list/tree-list-selectors';
import { NO_NodeId } from '@/store/slices/tree-list/tree-list-types';
import { IconButton, useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();
  const selectedNodeId = useAppSelector(selectSelectedNodeId('main'));
  const noteDisabled = !selectedNodeId || selectedNodeId === NO_NodeId;

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
            backgroundColor: theme.colors.surfaceVariant,
          },
          default: {
            backgroundColor: theme.colors.surfaceVariant,
          },
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
          tabBarButton: (props) => noteDisabled
            ? <View style={[props.style as any, { opacity: 0.35 }]}>{props.children}</View>
            : <HapticTab {...props} />,
        }}
        listeners={{
          tabPress: (e) => { if (noteDisabled) e.preventDefault(); },
        }}
      />
    </Tabs>
  );
}

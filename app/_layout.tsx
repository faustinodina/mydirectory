import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';

import { useColorScheme } from '@/app-example/hooks/useColorScheme';
import { loadStateFromFile } from '@/store/persistence';
import { useEffect, useLayoutEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function LoadReduxState() {
  useEffect(() => {
    store.dispatch(loadStateFromFile(true));
  }, []);
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PaperProvider>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
              <LoadReduxState />
              <Stack>
                {/* headerShown: false is important to display nav bar */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />   
                <Stack.Screen name="camera" options={{ headerShown: false }} />   
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </SafeAreaView>
          </PaperProvider>
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

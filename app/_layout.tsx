import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';

import { useColorScheme } from '@/hooks/useColorScheme';
import { loadStateFromFile } from '@/store/persistence';
import { useEffect, useLayoutEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://68e640bf86919f97fec8d543c07a64bd@o4511485737566208.ingest.us.sentry.io/4511485746020352',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function LoadReduxState() {
  useEffect(() => {
    store.dispatch(loadStateFromFile(false));
  }, []);
  return null;
}

export default Sentry.wrap(function RootLayout() {
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
                <Stack.Screen name="modal" options={{ headerShown: false }} />   
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </SafeAreaView>
          </PaperProvider>
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
});

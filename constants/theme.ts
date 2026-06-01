import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

// Brand color: #154157 (dark steel blue)
// Full MD3 tonal palette derived from the brand color for light and dark modes.

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#154157',
    onPrimary: '#ffffff',
    primaryContainer: '#c3e8ff',
    onPrimaryContainer: '#001e2d',
    secondary: '#4e616d',
    onSecondary: '#ffffff',
    secondaryContainer: '#d1e5f4',
    onSecondaryContainer: '#0a1e28',
    tertiary: '#5e5b7e',
    onTertiary: '#ffffff',
    tertiaryContainer: '#e4dfff',
    onTertiaryContainer: '#1a1836',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#f6fafe',
    onBackground: '#191c1e',
    surface: '#f6fafe',
    onSurface: '#191c1e',
    surfaceVariant: '#dce4ea',
    onSurfaceVariant: '#40484d',
    outline: '#70787d',
    outlineVariant: '#c0c8cd',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2e3133',
    inverseOnSurface: '#eff1f3',
    inversePrimary: '#7ecff0',
    surfaceDisabled: 'rgba(25, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 30, 0.38)',
    backdrop: 'rgba(64, 72, 77, 0.4)',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#7ecff0',
    onPrimary: '#00344a',
    primaryContainer: '#004c6a',
    onPrimaryContainer: '#c3e8ff',
    secondary: '#b5c9d8',
    onSecondary: '#20333e',
    secondaryContainer: '#374955',
    onSecondaryContainer: '#d1e5f4',
    tertiary: '#c8c3eb',
    onTertiary: '#302d4c',
    tertiaryContainer: '#474364',
    onTertiaryContainer: '#e4dfff',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    background: '#191c1e',
    onBackground: '#e1e3e5',
    surface: '#191c1e',
    onSurface: '#e1e3e5',
    surfaceVariant: '#40484d',
    onSurfaceVariant: '#c0c8cd',
    outline: '#8a9297',
    outlineVariant: '#40484d',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#e1e3e5',
    inverseOnSurface: '#2e3133',
    inversePrimary: '#154157',
    surfaceDisabled: 'rgba(225, 227, 229, 0.12)',
    onSurfaceDisabled: 'rgba(225, 227, 229, 0.38)',
    backdrop: 'rgba(64, 72, 77, 0.4)',
  },
};

// Syncs the Paper theme with expo-router's navigation theme so that
// headers, tab bars and modals also use the brand colors.
export const { LightTheme: navLightTheme, DarkTheme: navDarkTheme } =
  adaptNavigationTheme({ reactNavigationLight: lightTheme, reactNavigationDark: darkTheme });

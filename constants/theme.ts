import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Brand color: 
// Full MD3 tonal palette derived from the brand color for light and dark modes.

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    "primary": "rgb(121, 89, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 223, 160)",
    "onPrimaryContainer": "rgb(38, 26, 0)",
    "secondary": "rgb(107, 92, 63)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(245, 224, 187)",
    "onSecondaryContainer": "rgb(36, 26, 4)",
    "tertiary": "rgb(74, 101, 70)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(204, 235, 196)",
    "onTertiaryContainer": "rgb(8, 32, 8)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(248, 242, 233)",
    "onBackground": "rgb(28, 28, 28)",
    "surface": "rgb(248, 242, 233)",
    "onSurface": "rgb(28, 28, 28)",
    "surfaceVariant": "rgb(237, 225, 207)",
    "onSurfaceVariant": "rgb(77, 70, 57)",
    "outline": "rgb(127, 118, 103)",
    "outlineVariant": "rgb(208, 197, 180)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(52, 48, 42)",
    "inverseOnSurface": "rgb(248, 239, 231)",
    "inversePrimary": "rgb(248, 189, 42)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(245, 238, 227)",
      "level2": "rgb(242, 234, 221)",
      "level3": "rgb(239, 230, 215)",
      "level4": "rgb(237, 228, 211)",
      "level5": "rgb(235, 225, 206)"
    },
    "surfaceDisabled": "rgba(30, 27, 22, 0.12)",
    "onSurfaceDisabled": "rgba(30, 27, 22, 0.38)",
    "backdrop": "rgba(54, 48, 36, 0.4)"
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    "primary": "rgb(248, 189, 42)",
    "onPrimary": "rgb(64, 45, 0)",
    "primaryContainer": "rgb(92, 67, 0)",
    "onPrimaryContainer": "rgb(255, 223, 160)",
    "secondary": "rgb(216, 196, 160)",
    "onSecondary": "rgb(59, 47, 21)",
    "secondaryContainer": "rgb(83, 69, 42)",
    "onSecondaryContainer": "rgb(245, 224, 187)",
    "tertiary": "rgb(177, 207, 169)",
    "onTertiary": "rgb(29, 54, 27)",
    "tertiaryContainer": "rgb(51, 77, 48)",
    "onTertiaryContainer": "rgb(204, 235, 196)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(30, 27, 22)",
    "onBackground": "rgb(233, 225, 216)",
    "surface": "rgb(30, 27, 22)",
    "onSurface": "rgb(233, 225, 216)",
    "surfaceVariant": "rgb(77, 70, 57)",
    "onSurfaceVariant": "rgb(208, 197, 180)",
    "outline": "rgb(153, 143, 128)",
    "outlineVariant": "rgb(77, 70, 57)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(233, 225, 216)",
    "inverseOnSurface": "rgb(52, 48, 42)",
    "inversePrimary": "rgb(121, 89, 0)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(40, 36, 29)",
      "level2": "rgb(46, 41, 32)",
      "level3": "rgb(52, 46, 36)",
      "level4": "rgb(56, 49, 38)",
      "level5": "rgb(60, 53, 41)"
    },
    "surfaceDisabled": "rgba(233, 225, 216, 0.12)",
    "onSurfaceDisabled": "rgba(233, 225, 216, 0.38)",
    "backdrop": "rgba(54, 48, 36, 0.4)"
 },
};


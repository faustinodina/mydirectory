import { Stack } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";

export default function ModalLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        header: ({ options, navigation, back }) => (
          <Appbar.Header
            statusBarHeight={0}
            style={{ backgroundColor: theme.colors.primary }}
          >
            {back && (
              <Appbar.BackAction
                color={theme.colors.onPrimary}
                onPress={() => navigation.goBack()}
              />
            )}
            <Appbar.Content
              title={options.title ?? ''}
              color={theme.colors.onPrimary}
            />
          </Appbar.Header>
        ),
      }}
    />
  );
}

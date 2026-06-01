import { useAppDispatch } from '@/store/hooks';
import { treeListSlice } from '@/store/slices/tree-list';
import { resetTreeView } from '@/store/slices/tree-list/tree-list-thunks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { Appbar, Menu, useTheme } from 'react-native-paper';
import * as Sentry from '@sentry/react-native';

const NavBarRight = () => {
  
  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const onToggleColorScheme = () => {
    closeMenu();
    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const onPressResetDirectoryView = () => {
    closeMenu();
    dispatch(treeListSlice.actions.resetVisibility());
  };

  const onEditState = () => {
    closeMenu();
    router.push("/modal/state");
  }

  const onTestSentry = () => {
    closeMenu();
    Sentry.captureException(new Error('Test error'));
  }

  return (
    <Menu
        key={visibleMenu ? "open" : "closed"}
        visible={visibleMenu}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
          />
        }>
        <Menu.Item onPress={onPressResetDirectoryView} title="Reset Directory View" />
        <Menu.Item onPress={onEditState} title="Edit State" />
        <Menu.Item onPress={onToggleColorScheme} title={colorScheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} />
        <Menu.Item onPress={onTestSentry} title="Test Sentry" />
    </Menu>
  );
};

export default NavBarRight;

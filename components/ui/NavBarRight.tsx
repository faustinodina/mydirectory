import { useAppDispatch } from '@/store/hooks';
import { treeListSlice } from '@/store/slices/tree-list';
import { resetTreeView } from '@/store/slices/tree-list/tree-list-thunks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Appbar, Menu, useTheme } from 'react-native-paper';

const NavBarRight = () => {
  
  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const onPressResetDirectoryView = () => {
    closeMenu();
    dispatch(treeListSlice.actions.resetVisibility());
  };

  const onPressCamera = () => {
    closeMenu();
    router.push("/camera");
    //router.push(createRoutePath("/camera");
  };

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
        <Menu.Item onPress={onPressCamera} title="Camera" />
    </Menu>
  );
};

export default NavBarRight;

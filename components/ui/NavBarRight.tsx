import { useAppDispatch } from '@/store/hooks';
import { treeListSlice } from '@/store/slices/tree-list';
import { resetTreeView } from '@/store/slices/tree-list/tree-list-thunks';
import React, { useState } from 'react';
import { Appbar, Menu, useTheme } from 'react-native-paper';

const NavBarRight = () => {
  
  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  const onPressResetAccountView = () => {
    closeMenu();
    dispatch(treeListSlice.actions.resetVisibility());
  };

  return (
    <Menu
        visible={visibleMenu}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
          />
        }>
        <Menu.Item onPress={onPressResetAccountView} title="Reset Directory View" />
    </Menu>
  );
};

export default NavBarRight;
// defines the menu options for the node items
import { TreeListMenuProps } from "@/components/tree-list";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState, forwardRef, useImperativeHandle } from "react";
import { GestureResponderEvent } from "react-native";
import { Menu, Portal } from "react-native-paper";


// https://chatgpt.com/share/69487884-b924-8013-bc04-126f21f09aea convert into a forwardRef component

// Simpler, doesn't use forwardRef component https://chatgpt.com/share/694c045d-fe70-8013-b850-2778084a40e6

/*
  REMEMBER:
    The menu component must be:
      -Stateless
      -Controlled via props
      -Agnostic of where it is used
*/
const DirectoryNodeMenu = ({
  visible,
  anchor,
  node,
  onDismiss,
}: TreeListMenuProps) => {

  if (!node) return null;

  return (
      <Portal>
        <Menu
          visible={visible}
          anchor={anchor}
          onDismiss={onDismiss}
        >
          <Menu.Item 
            title="Edit" 
            onPress={() => {
              console.log("Edit", node);
              onDismiss();
            }} />
          <Menu.Item 
            title="Delete" 
            onPress={() => {
              console.log("Delete", node);
              onDismiss();
            }} />
        </Menu>
      </Portal>
  );
};

export default DirectoryNodeMenu;

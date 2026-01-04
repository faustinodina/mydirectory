// defines the menu options for the node items
import { TreeListMenuProps } from "@/components/tree-list";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState, forwardRef, useImperativeHandle } from "react";
import { GestureResponderEvent } from "react-native";
import { Menu, Portal } from "react-native-paper";
import { router } from "expo-router";

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
  nodeId,
  onDismiss,
}: TreeListMenuProps) => {

  if (!nodeId) return null;

  console.log("DirectoryNodeMenu for node:", nodeId);

  return (
      <Portal>
        <Menu
          visible={visible}
          anchor={anchor}
          onDismiss={onDismiss}
        >
          <Menu.Item 
            title="Add child note" 
            onPress={() => {
              console.log("Add child note", nodeId);
              router.push(`/modal/note/add?parentId=${nodeId}`);
              onDismiss();
            }} />
          <Menu.Item 
            title="Add sibling note" 
            onPress={() => {
              console.log("Add sibling note", nodeId);
              router.push(`/modal/note/add?siblingId=${nodeId}`);
              onDismiss();
            }} />
          <Menu.Item 
            title="Edit note" 
            onPress={() => {
              console.log("Edit note", nodeId);
              router.push(`/modal/note/edit?id=${nodeId}`);
              onDismiss();
            }} />
        </Menu>
      </Portal>
  );
};

export default DirectoryNodeMenu;

// defines the menu options for the node items
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Menu, Portal } from "react-native-paper";

export type DirectoryNodeMenuProps = {
};

// TODO: https://chatgpt.com/share/69487884-b924-8013-bc04-126f21f09aea convert into a forwardRef component
const DirectoryNodeMenu = (props: DirectoryNodeMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<NodeId | null>(null);
  
  const openMenu = (nodeId: NodeId, e: GestureResponderEvent) => {
    setActiveNodeId(nodeId);
    setMenuAnchor({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setActiveNodeId(null);
  };  

  const handleEdit = () => {
    if (!activeNodeId) return;
    console.log("Edit", activeNodeId);
    closeMenu();
  };

  const handleDelete = () => {
    if (!activeNodeId) return;
    console.log("Delete", activeNodeId);
    closeMenu();
  };

  return (
      <Portal>
        <Menu
          key={menuVisible ? "open" : "closed"} // force remount for v5
          visible={menuVisible}
          anchor={menuAnchor}
          onDismiss={closeMenu}
        >
          <Menu.Item title="Edit" onPress={handleEdit} />
          <Menu.Item title="Delete" onPress={handleDelete} />
        </Menu>
      </Portal>
  );
};

export default DirectoryNodeMenu;

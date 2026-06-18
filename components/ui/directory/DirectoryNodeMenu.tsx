// defines the menu options for the node items
import { TreeListMenuProps } from "@/components/tree-list";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState, forwardRef, useImperativeHandle } from "react";
import { GestureResponderEvent } from "react-native";
import { Menu, Portal } from "react-native-paper";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addNoteDialogSubmitted, removeNoteSubmitted } from "@/store/actions/dialogActions";
import { isNodeRemovable, selectNextNodeId } from "@/store/slices/tree-list/tree-list-selectors";
import { setSelectedNode } from "@/store/slices/tree-list/tree-list-slice";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";

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

  const dispatch = useDispatch();
  const nextNodeId = useAppSelector(selectNextNodeId);
  const isRemovable = useAppSelector(isNodeRemovable(nodeId ?? 0));

  if (!nodeId) return null;

  // console.log("DirectoryNodeMenu for node:", nodeId);

  // open the note tab for a node (used after create and for edit)
  const openNoteTab = (id: NodeId) => {
    dispatch(setSelectedNode({ nodeId: id, treeViewType: "main" }));
    router.push({ pathname: "/note", params: { nodeId: String(id) } });
    onDismiss();
  };

  // create a new node immediately, then open the note tab to fill it in
  const addNote = (position: { parentId?: NodeId; siblingId?: NodeId }) => {
    const newNodeId = nextNodeId;
    dispatch(addNoteDialogSubmitted({
      newNodeId,
      treeViewType: "main",
      position: { parentId: position.parentId as NodeId, siblingId: position.siblingId },
      title: "New Note",
      alias: "",
      description: "",
    }));
    openNoteTab(newNodeId);
  };

  return (
      <Portal>
        <Menu
          visible={visible}
          anchor={anchor}
          onDismiss={onDismiss}
        >
          <Menu.Item
            title="Add child note"
            onPress={() => addNote({ parentId: nodeId })} />
          <Menu.Item
            title="Add sibling note"
            onPress={() => addNote({ siblingId: nodeId })} />
          <Menu.Item
            title="Edit note"
            onPress={() => openNoteTab(nodeId)} />
          {isRemovable && (
            <Menu.Item 
              title="Remove note" 
              onPress={() => {
                dispatch(removeNoteSubmitted({nodeId, treeViewType: "main"})); // Replace "main" with actual tree view type if needed
                onDismiss();
              }} />
          )}
        </Menu>
      </Portal>
  );
};

export default DirectoryNodeMenu;

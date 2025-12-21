import { useAppSelector } from "@/store/hooks";
import { selectNodesDict, selectSelectedNodeId, selectVisibleNodesDict, selectVisibleNodesList } from "@/store/slices/tree-list/tree-list-selectors";
import { setSelectedNode } from "@/store/slices/tree-list/tree-list-slice";
import { EvArgsOnSelectionChange, IDataViewProps, IToggleButtonProps, NO_NodeId, NodeId, TreeViewType } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState } from "react";
import { GestureResponderEvent, ScrollView, ViewStyle } from "react-native";
import { Menu, Portal, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import TreeListItem from "./TreeListItem";

export type TreeListProps = {
  treeViewType: TreeViewType,
  toggleButton: FunctionComponent<IToggleButtonProps>;
  dataView: FunctionComponent<IDataViewProps>;
  styles?: {
    surface?: ViewStyle,
    leftView?: ViewStyle,
    rightView?: ViewStyle
  },
  onSelectionChange?: (e: EvArgsOnSelectionChange) => void;
};

const TreeList = (props: TreeListProps) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<NodeId | null>(null);
  
  //console.log("ATT!: props.treeViewId:", props.treeViewType);

  //console.log("TreeList starting; props: ", props);
  const visibleNodesList = useAppSelector(selectVisibleNodesList(props.treeViewType));
  const visibleNodesDict = useAppSelector(selectVisibleNodesDict(props.treeViewType));
  const nodesDict = useAppSelector(selectNodesDict);
  const selectedNodeId = useAppSelector(selectSelectedNodeId(props.treeViewType));
  
  // console.log("props.treeViewId:", props.treeViewType);
  // console.log("visibleNodesList:", visibleNodesList);

  const onSelectionChange = (e: EvArgsOnSelectionChange) => {
    dispatch(setSelectedNode({nodeId: e.isSelected ? e.nodeId : NO_NodeId, treeViewType: props.treeViewType}));

    // propagate event to parents
    props.onSelectionChange && props.onSelectionChange(e);
  };

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

  // for visibleAccounts note the root account is not displayed so if you have only the root account (initial state) then visibleAccounts dict and list will be empty 
  return (
    <>
      <ScrollView>
        { visibleNodesList.map(id => {
          //console.log("id: ", id);
          const node = nodesDict[id];
          const nodeVisibility = visibleNodesDict[id];
          //console.log("node: ", node, "nodeVisibility: ", nodeVisibility);
          return (
            <TreeListItem
              treeViewType={props.treeViewType}
              key={id} 
              nodeId={id}
              dataView={props.dataView}
              toggleButton={props.toggleButton}
              isSelected={selectedNodeId === id}
              styles={props.styles}
              selectedColor={theme.colors.surfaceVariant}
              onSelectionChange={onSelectionChange}
              onOpenMenu={openMenu}
              />
            );
        })}
      </ScrollView>

      {/* Single Menu instance */}
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
    </>
  );
};

export default TreeList;

import { useAppSelector } from "@/store/hooks";
import { selectNodesDict, selectSelectedNodeId, selectVisibleNodesDict, selectVisibleNodesList } from "@/store/slices/tree-list/tree-list-selectors";
import { setSelectedNode } from "@/store/slices/tree-list/tree-list-slice";
import { EvArgsOnSelectionChange, IDataViewProps, IMenuItemHandlerProps, IToggleButtonProps, NO_NodeId, NodeId, TreeViewType } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent, useState } from "react";
import { GestureResponderEvent, ScrollView, ViewStyle } from "react-native";
import { Menu, Portal, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import TreeListItem from "./TreeListItem";

/*
1. Define a Menu Component Contract
    The menu component must be:
      -Stateless
      -Controlled via props
      -Agnostic of where it is used
*/
export type TreeListMenuProps = {
  visible: boolean;
  anchor: { x: number; y: number };
  nodeId: NodeId | null;
  onDismiss: () => void;
};

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
  MenuComponent: FunctionComponent<TreeListMenuProps>;
};

const TreeList = (props: TreeListProps) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  
  // menu related code begin
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);  

  //onOpenMenu: (nodeId: NodeId, e: GestureResponderEvent) => void;
  const openMenu = (node: NodeId, e: any) => {
    const { pageX, pageY } = e.nativeEvent;

    setActiveNode(node);
    setAnchor({ x: pageX, y: pageY });
    setVisible(true);
  };

  const dismissMenu = () => {
    setVisible(false);
    setActiveNode(null);
  };  
  // menu related code end

  const visibleNodesList = useAppSelector(selectVisibleNodesList(props.treeViewType));
  const visibleNodesDict = useAppSelector(selectVisibleNodesDict(props.treeViewType));
  const nodesDict = useAppSelector(selectNodesDict);
  const selectedNodeId = useAppSelector(selectSelectedNodeId(props.treeViewType));
  
  // console.log("props.treeViewId:", props.treeViewType);
  //console.log("visibleNodesList:", visibleNodesList);

  const onSelectionChange = (e: EvArgsOnSelectionChange) => {
    dispatch(setSelectedNode({nodeId: e.isSelected ? e.nodeId : NO_NodeId, treeViewType: props.treeViewType}));

    // propagate event to parents
    props.onSelectionChange && props.onSelectionChange(e);
  };

  const MenuComponent = props.MenuComponent;

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
              //menuItemHandler={props.menuItemHandler}
              />
            );
        })}

        <MenuComponent 
          visible={visible}
          anchor={anchor}
          nodeId={activeNode}
          onDismiss={dismissMenu}
          />

      </ScrollView>

    </>
  );
};

export default TreeList;

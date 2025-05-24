import React from "react";
import { IToggleButtonProps } from "@/store/slices/tree-list/tree-list-types";

import { StyleSheet } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { isNodeExpanded, selectTreeNode, selectVisibleNodesDict } from "@/store/slices/tree-list/tree-list-selectors";
import log from "@/config/log-conf";

const logger = log.extend("AccountNodeToggleButton");

type AccountNodeToggleButtonProps = IToggleButtonProps & {
}

const AccountNodeToggleButton = (props: AccountNodeToggleButtonProps) => {
  
  const node = useAppSelector(selectTreeNode(props.nodeId));
  const visibleNodesDict = useAppSelector(selectVisibleNodesDict(props.treeViewType));
  const isExpanded = useAppSelector(isNodeExpanded(props.nodeId, props.treeViewType));
  const dispatch = useAppDispatch();
  const theme = useTheme();

  if (!node) { 
    // this happens after opening a book
    console.log(`1 No node found for props.nodeId = ${props.nodeId}`);
    //logger.debug(`No node found for props.nodeId = ${props.nodeId}`);
    return null; 
  }

  const hasChilds = node.children.length > 0;
  const isExpansible = () => !!node.children?.length;
  const caption = (!isExpansible()) ? "non expansible" : (isExpanded) ? "collapse" : "expand";
  const iconDef = isExpanded ? "chevron-down" : "chevron-right";

  // const onPressHandler = () => {
  //   console.log('Pressed');
     //toggleNodeState && toggleNodeState(toggledKey);
  //   if (isExpanded) {
       //dispatch(accountsSlice.actions.collapseAccount(props.nodeKey));
  //   }
  //   else if (hasChilds) {
       //dispatch(accountsSlice.actions.expandAccount(props.nodeKey));
  //   }
  // };

  return !hasChilds ? (
    <IconButton icon="chevron-up" size={30} disabled={true} style={styles.noIcon} />
  )
  : (
    <IconButton icon={iconDef} size={30} onPress={props.onPress} style={styles.icon} iconColor={theme.colors.primary} />
  );
};

const styles = StyleSheet.create({
  icon: {
    // backgroundColor: 'green',
    // color: "#fff",
  },
  noIcon: {
    // color: "#fff",
    // backgroundColor: '#fff',
    opacity: 0
  },
  pressable: {
    backgroundColor: 'red',
    borderRadius: 5,
  }
});

export default AccountNodeToggleButton;
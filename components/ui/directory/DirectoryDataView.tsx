import React, {useState, useRef, useMemo} from "react";
import { Divider, IconButton, Menu, Portal, Text } from "react-native-paper";
import { IDataViewProps, NodeId } from "@/store/slices/tree-list/tree-list-types";
import NamesView from "./NamesView";
import { isNodeRemovable } from "@/store/slices/tree-list/tree-list-lib";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTreeNode } from "@/store/slices/tree-list/tree-list-selectors";
import { useRouter } from "expo-router";
import { GestureResponderEvent, View, StyleSheet } from "react-native";

type AccountDataViewProps = IDataViewProps & {
}

const DirectoryDataView = (props: AccountDataViewProps) => {

  const node = useAppSelector(selectTreeNode(props.nodeId));
  const noteId: NodeId = props.nodeId;
  const nodeId: NodeId = props.nodeId;
  const isRemovable = isNodeRemovable(node);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // const addSiblingNote = () => {    
  //   closeMenu();
  //   // const addAccountProps: AddAccountProps = {
  //   //   siblingAccountId: topicId,
  //   //   treeViewType: props.treeViewType,
  //   // };
  //   // const route = createRoutePath("/modal/add-account", addAccountProps);
  //   // router.push(route);
  // };

  // const addChildNote = () => {
  //   closeMenu();
  //   // //navigation.navigate("AddAccount", { parentAccountId: accountId, treeViewType: props.treeViewType });
  //   // //dispatch(navigateTo({ routeName: "AddAccount", routeParameters: { parentAccountId: accountId, treeViewType: props.treeViewType }}));
  //   // const addAccountProps: AddAccountProps = {
  //   //   parentAccountId: topicId,
  //   //   treeViewType: props.treeViewType,
  //   // };
  //   // const route = createRoutePath("/modal/add-account", addAccountProps);
  //   // router.push(route);
  // };
  
  // const editNote = () => {
  //   closeMenu();
  //   // //navigation.navigate("EditAccount", { accountId: accountId, treeViewType: props.treeViewType });
  //   // const editAccountProps: EditAccountProps = {
  //   //   accountId: topicId,
  //   //   treeViewType: props.treeViewType,
  //   // };
  //   // const route = createRoutePath("/modal/edit-account", editAccountProps);
  //   // router.push(route);
  // };

  // const removeCurrentNote = async () => {
  //   closeMenu();
  //   // await dispatch(removeAccount({bookId, nodeId: topicId, treeViewType: props.treeViewType }));
  // }; 

  return (
    <View style={styles.container}>
      <NamesView noteId={noteId} />

      <IconButton
        icon="dots-vertical"
        onPress={(e) => props.onOpenMenu(props.nodeId, e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    flexWrap: "nowrap", 
    width: "100%", 
    // borderColor: "blue", 
    // borderWidth: 3, 
  },
});

export default DirectoryDataView;

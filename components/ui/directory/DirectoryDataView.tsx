import React, {useState, useRef, useMemo} from "react";
import { Divider, IconButton, Menu, Portal, Text } from "react-native-paper";
import { IDataViewProps, NodeId } from "@/store/slices/tree-list/tree-list-types";
import NamesView from "./NamesView";
//import BalanceView from "./BalanceView";
import { isNodeRemovable } from "@/store/slices/tree-list/tree-list-lib";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTreeNode } from "@/store/slices/tree-list/tree-list-selectors";
//import { removeAccount } from "../../redux/actions/accounts-actions-2";
//import { selectCurrentBookId } from "../../redux/reducers/db-config-slice";
import { useRouter } from "expo-router";
import { GestureResponderEvent, View } from "react-native";
//import { AddAccountProps } from "./AddAccount";
//import { createRoutePath } from "@/utils/lib";
//import { EditAccountProps } from "./EditAccount";
//import { AddTransactionProps } from "../transactions/AddTransaction";

type AccountDataViewProps = IDataViewProps & {
  //navigation: NativeStackNavigationProp<RootStackParamList>;
}

const DirectoryDataView = (props: AccountDataViewProps) => {

  const node = useAppSelector(selectTreeNode(props.nodeId));
  const noteId: NodeId = props.nodeId;
  const nodeId: NodeId = props.nodeId;
  const isRemovable = isNodeRemovable(node);
  //const bookId = useAppSelector(selectCurrentBookId);

  //const [visibleMenu, setVisibleMenu] = useState(false);
  //const [anchor, setAnchor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // const openMenu = (e: GestureResponderEvent) => {
  //     console.log("NATIVE EVENT", e?.nativeEvent?.pageX, e?.nativeEvent?.pageY);
  //     setAnchor({
  //       x: e.nativeEvent.pageX,
  //       y: e.nativeEvent.pageY,
  //     });
  //     setVisibleMenu(true);
  //   };

  // const closeMenu = () => setVisibleMenu(false);

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
    <>
      <NamesView noteId={noteId} style={{flexGrow: 1, /*borderWidth: 2, borderColor: "blue"*/}} />

      <IconButton
        icon="dots-vertical"
        onPress={(e) => props.onOpenMenu(props.nodeId, e)}
      />
      
      {/* TODO: a better solution would be to have one menu for all the elements in the list. The menu wiill be handled by the items container component 
      see at:  https://chatgpt.com/share/69474e18-e378-8013-9ecd-cb20a846f3fd
      */}
      {/* note we use key change to force Menu to re-mount, this fixes the issue the menu is only displayed on the first click
          this is related to the fact we use a menu for each element of the list
      */}
      {/* <Menu
        key={visibleMenu ? "visible" : "hidden"}
        visible={visibleMenu}
        anchor={anchor}
        anchorPosition="bottom"
        onDismiss={closeMenu}
        >
        <Menu.Item onPress={addSiblingNote} title="Add Sibling Note" />
        <Menu.Item onPress={addChildNote} title="Add Child Note" />
        <Menu.Item onPress={editNote} title="Edit Note" />
        {isRemovable ? <Menu.Item onPress={ removeCurrentNote } title="Remove Note" /> : null }
      </Menu>  */}
    </>
  );
};

export default DirectoryDataView;

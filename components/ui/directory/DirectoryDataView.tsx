import React, {useState} from "react";
import { Divider, IconButton, Menu, Text } from "react-native-paper";
import { IDataViewProps, NodeId } from "@/store/slices/tree-list/tree-list-types";
import NamesView from "./NamesView";
//import BalanceView from "./BalanceView";
import { isNodeRemovable } from "@/store/slices/tree-list/tree-list-lib";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTreeNode } from "@/store/slices/tree-list/tree-list-selectors";
//import { removeAccount } from "../../redux/actions/accounts-actions-2";
//import { selectCurrentBookId } from "../../redux/reducers/db-config-slice";
import { useRouter } from "expo-router";
//import { AddAccountProps } from "./AddAccount";
//import { createRoutePath } from "@/utils/lib";
//import { EditAccountProps } from "./EditAccount";
//import { AddTransactionProps } from "../transactions/AddTransaction";

type AccountDataViewProps = IDataViewProps & {
  //navigation: NativeStackNavigationProp<RootStackParamList>;
}

const DirectoryDataView = (props: AccountDataViewProps) => {

  const node = useAppSelector(selectTreeNode(props.nodeId));
  const topicId: NodeId = props.nodeId;
  const nodeId: NodeId = props.nodeId;
  const isRemovable = isNodeRemovable(node);
  //const bookId = useAppSelector(selectCurrentBookId);

  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const addSiblingTopic = () => {    
    closeMenu();
    // const addAccountProps: AddAccountProps = {
    //   siblingAccountId: topicId,
    //   treeViewType: props.treeViewType,
    // };
    // const route = createRoutePath("/modal/add-account", addAccountProps);
    // router.push(route);
  };

  const addChildTopic = () => {
    closeMenu();
    // //navigation.navigate("AddAccount", { parentAccountId: accountId, treeViewType: props.treeViewType });
    // //dispatch(navigateTo({ routeName: "AddAccount", routeParameters: { parentAccountId: accountId, treeViewType: props.treeViewType }}));
    // const addAccountProps: AddAccountProps = {
    //   parentAccountId: topicId,
    //   treeViewType: props.treeViewType,
    // };
    // const route = createRoutePath("/modal/add-account", addAccountProps);
    // router.push(route);
  };
  
  const editTopic = () => {
    closeMenu();
    // //navigation.navigate("EditAccount", { accountId: accountId, treeViewType: props.treeViewType });
    // const editAccountProps: EditAccountProps = {
    //   accountId: topicId,
    //   treeViewType: props.treeViewType,
    // };
    // const route = createRoutePath("/modal/edit-account", editAccountProps);
    // router.push(route);
  };

  const removeCurrentTopic = async () => {
    closeMenu();
    // await dispatch(removeAccount({bookId, nodeId: topicId, treeViewType: props.treeViewType }));
  }; 

  return (
    <>
      <NamesView topicId={topicId} style={{flexGrow: 1, /*borderWidth: 2, borderColor: "blue"*/}} />
      <Menu
        visible={visibleMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        anchorPosition="bottom"
        onDismiss={closeMenu}
        >
        <Menu.Item onPress={addSiblingTopic} title="Add Sibling Topic" />
        <Menu.Item onPress={addChildTopic} title="Add Child Topic" />
        <Menu.Item onPress={editTopic} title="Edit Topic" />
        {isRemovable ? <Menu.Item onPress={ removeCurrentTopic } title="Remove Topic" /> : null }
      </Menu>    
    </>
  );
};

export default DirectoryDataView;

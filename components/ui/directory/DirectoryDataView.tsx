import React from "react";
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

const DirectoryDataView = () => {
  return (
    <>
      <NamesView accountId={accountId} style={{flexGrow: 1, /*borderWidth: 2, borderColor: "blue"*/}} />
      <Menu
        visible={visibleMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        anchorPosition="bottom"
        onDismiss={closeMenu}
        >
        <Menu.Item onPress={addSiblingAccount} title="Add Sibling Account" />
        <Menu.Item onPress={addChildAccount} title="Add Child Account" />
        <Menu.Item onPress={editAccount} title="Edit Account" />
        {isRemovable ? <Menu.Item onPress={ removeCurrentAccount } title="Remove Account" /> : null }
        <Divider />
        <Menu.Item onPress={addTransactionAsOrigin} title="Add Transaction as origin" />
        <Menu.Item onPress={addTransactionAsDestine} title="Add Transaction as destination"/>
      </Menu>    
    </>
  );
};

export default DirectoryDataView;

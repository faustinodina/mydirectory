import log from '@/config/log-conf';
import TreeList from '@/components/tree-list';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from "react";

const logger = log.extend('Index');
import { EvArgsOnSelectionChange, TreeViewId, TreeViewType } from "@/store/slices/tree-list/tree-list-types";
import DirectoryDataView from '@/components/ui/directory/DirectoryDataView';
import DirectoryNodeToggleButton from '@/components/ui/directory/DirectoryNodeToggleButton';
import { StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import NavBarRight from '@/components/ui/NavBarRight';
import DirectoryNodeMenu from '@/components/ui/directory/DirectoryNodeMenu';


const Index = () => {
  const router = useRouter();

  const navigation = useNavigation();

  //console.log("RENDERING INDEX");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarRight />
      ),
    });
  }, [navigation]);
  
  const doSelectionChange = (e: EvArgsOnSelectionChange): void => {
    logger.info('Node selected', { nodeId: e.nodeId, isSelected: e.isSelected });
    router.push({
      pathname: '/note',
      params: { nodeId: e.nodeId }
    });
  };

  return (
    // <ThemedView
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <ThemedText>INDEX</ThemedText>
    //   <ThemedText style={{ fontSize: 24 }}>Count: {count}</ThemedText>
    //   <Button title="Increment" onPress={() => dispatch(increment())} />
    //   <Button title="Decrement" onPress={() => dispatch(decrement())} />
    //   <Button title="GoTo Dir" onPress={() => router.push("/docs")} />

    // </ThemedView>
    <TreeList 
      treeViewType={"main"}
      dataView={DirectoryDataView}
      toggleButton={DirectoryNodeToggleButton}
      styles={styles}
      onSelectionChange={doSelectionChange}
      MenuComponent={DirectoryNodeMenu}
      />

  );
};

const styles = StyleSheet.create({
  // match the Note.tsx outlined TextInput look: radius 4 + 16px horizontal padding
  surface: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftView: {},
  rightView: {
    // borderWidth: 1, 
    // borderColor: "red", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    flex: 1, 
    //gap: 5,
    //paddingRight: 5,
    alignItems: "center",
  },
});

export default Index;
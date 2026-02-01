import { ThemedText } from '@/app-example/components/ThemedText';
import { ThemedView } from '@/app-example/components/ThemedView';
import TreeList from '@/components/tree-list';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment } from '@/store/slices/counter/counter-slice';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from "react";
import { EvArgsOnSelectionChange, TreeViewId, TreeViewType } from "@/store/slices/tree-list/tree-list-types";
import DirectoryDataView from '@/components/ui/directory/DirectoryDataView';
import DirectoryNodeToggleButton from '@/components/ui/directory/DirectoryNodeToggleButton';
import { StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import NavBarRight from '@/components/ui/NavBarRight';
import DirectoryNodeMenu from '@/components/ui/directory/DirectoryNodeMenu';


const Index = () => {
  const count = useAppSelector((state) => state.counter?.value ?? 0);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const navigation = useNavigation();

  console.log("RENDERING INDEX");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarRight />
      ),
    });
  }, [navigation]);
  
  const doSelectionChange = (e: EvArgsOnSelectionChange): void => {
    // handle selection change here, e.g., log or dispatch
    console.log("Selection changed:", e);
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
  surface: {},
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
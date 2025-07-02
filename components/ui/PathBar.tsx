import { useAppSelector } from "@/store/hooks";
import { selectCachedPath } from "@/store/slices/tree-list";
import { NO_NodeId } from "@/store/slices/tree-list/tree-list-types";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type PathBarProps = {
  nodeId?: number; // Optional nodeId to get the path for a specific node
};

const PathBar = (props: PathBarProps) => {

  const pathArray = ["Some path", "subpath1", "subpath2", "subpath3", "subpath4", "subpath5", "subpath6", "subpath7"]; // Example path array
  const nodIdsPathArray = useAppSelector(selectCachedPath(props?.nodeId ?? NO_NodeId)); 

  return (
    <View style={{ flexDirection: "row", paddingLeft: 15, paddingRight: 10, gap: 5 }} >
      <Text>at:</Text>
      <Text>{ pathArray.join(" : ")}</Text>
    </View>
  );
};

export default PathBar;

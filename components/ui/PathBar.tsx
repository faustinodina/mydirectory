import { useAppSelector } from "@/store/hooks";
import { selectNoteCachedPath } from "@/store/slices/notes/notes-selectors";
import { NO_NodeId } from "@/store/slices/tree-list/tree-list-types";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type PathBarProps = {
  nodeId?: number; // Optional nodeId to get the path for a specific node
};

const PathBar = (props: PathBarProps) => {

  //const pathArray = ["Some path", "subpath1", "subpath2", "subpath3", "subpath4", "subpath5", "subpath6", "subpath7"]; // Example path array
  const nodeId = props?.nodeId ?? NO_NodeId; // Use the provided nodeId or default to NO_NodeId
  //console.log("BEFORE nodeId: ", nodeId);
  const notePathArray = useAppSelector(selectNoteCachedPath(nodeId)); 
  //console.log("AFTER");
  //console.log("nodeId: ", nodeId, "notePathArray: ", notePathArray);

  return (
    <View style={{ flexDirection: "row", paddingLeft: 15, paddingRight: 10, gap: 5 }} >
      <Text>at:</Text>
      <Text>{ notePathArray.join(" : ")}</Text>
    </View>
  );
};

export default PathBar;

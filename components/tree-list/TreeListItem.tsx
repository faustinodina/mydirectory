import log from "@/config/log-conf";
import { useAppDispatch } from "@/store/hooks";
import { isNodeExpanded, selectTreeNode } from "@/store/slices/tree-list/tree-list-selectors";
import { treeListSlice } from "@/store/slices/tree-list/tree-list-slice";
import { EvArgsOnSelectionChange, IDataViewProps, /*IOnExpandedChangeEvent, IOnSelectionChangeEvent,*/ IToggleButtonProps, NodeId, TreeViewType } from "@/store/slices/tree-list/tree-list-types";
import React, { FunctionComponent } from "react";
import { GestureResponderEvent, StyleProp, View, ViewStyle } from "react-native";
import { MD3Elevation, Surface, TouchableRipple, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import LevelSpacer from "./LevelSpacer";

const logger = log.extend("TreeListItem");

export type TreeListItemProps = {
  treeViewType: TreeViewType;
  nodeId: NodeId;
  elevation?: MD3Elevation;
  isSelected: boolean;
  toggleButton: FunctionComponent<IToggleButtonProps>;
  dataView: FunctionComponent<IDataViewProps>;
  styles?: {
    surface?: ViewStyle;
    leftView?: ViewStyle;
    rightView?: ViewStyle;
  };
  selectedColor: string;
  onSelectionChange: (e: EvArgsOnSelectionChange) => void;
  onOpenMenu: (nodeId: NodeId, e: GestureResponderEvent) => void;
};

const rowContainerStyle: StyleProp<ViewStyle> = { flex: 1, flexDirection: "row" };

const TreeListItem = (props: TreeListItemProps) => {

  const node = useSelector(selectTreeNode(props.nodeId));
  const isExpanded = useSelector(isNodeExpanded(props.nodeId, props.treeViewType));

  const dispatch = useAppDispatch();
  const theme = useTheme();

  //const {db} = useDatabase();

  if (!node) { 
    // this happens after opening a book
    console.log(`2 No node found for props.nodeId: ${props.nodeId}`);
    //logger.warn(`No node found for props.nodeId: ${props.nodeId}`);
    return null; 
  }

  const isExpansible = () => !!node.children?.length;

  // expanding/collapsing the arrow key is an internal event for the tree list item control
  const onToggleButtonPress = async () => {
    //console.log("onToggleButtonPress, isExpanded: ", isExpanded, ", isExpansible(): ", isExpansible());
    if (isExpanded) {
      dispatch(treeListSlice.actions.collapseNode({ nodeId: props.nodeId, treeViewType: props.treeViewType }));
    }
    else if (isExpansible()) {
      dispatch(treeListSlice.actions.expandNode({ nodeId: props.nodeId, treeViewType: props.treeViewType }));
    }
  };

  const onSurfacePress = () => {
    props.onSelectionChange({ isSelected: !props.isSelected, nodeId: props.nodeId });
  };

  const ToggleButton = props.toggleButton;
  const DataView = props.dataView;
  const surfaceElevation = props.elevation || 1;
  const surfaceColor = props.isSelected ? props.selectedColor : theme.colors.elevation[surfaceElevation]

  //console.log("RENDERING TREE LIST ITEM: ", node.id);

  return (
    <TouchableRipple onPress={onSurfacePress} style={{ borderColor: "blue", borderWidth: 1 }}>
      <Surface style={{...rowContainerStyle, ...props.styles?.surface, backgroundColor: surfaceColor}} 
        elevation={surfaceElevation}
        >
        <View style={{ flexDirection: "row", ...props.styles?.leftView, borderWidth: 1, borderColor: "red" }}>
          {/* // insert spacings for levels */}
          <LevelSpacer level={node.level} />
          <ToggleButton 
            treeViewType={props.treeViewType} 
            nodeId={props.nodeId} 
            // isExpanded={isExpanded()} 
            // isExpansible={isExpansible()}
            onPress={onToggleButtonPress}
            />
        </View>
        <View style={{...props.styles?.rightView, borderWidth: 1, borderColor: "red" }}>
          <DataView 
            treeViewType={props.treeViewType}
            nodeId={props.nodeId} 
            onOpenMenu={props.onOpenMenu}
            // nodeData={node} 
            // isExpanded={isExpanded} 
            // isExpansible={isExpansible()}
            />
        </View>
      </Surface>
    </TouchableRipple>
  );
};

export default TreeListItem;
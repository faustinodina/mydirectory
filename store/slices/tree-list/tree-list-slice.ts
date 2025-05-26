import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRootNode } from "./tree-list-lib";
import { ITreeListState, NodeId, TreeViewType } from "./tree-list-types";
import { mutateStateResetVisibility, mutateStateToggleNodeExpansion } from "./tree-list-utils";
//import { setInitialState } from "../counter/counter-slice";

const initialState: ITreeListState = {
  nodesDict: {},
  viewsDict: {},
};

export const treeListSlice = createSlice({
  name: 'treeList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setInitialState: (state, action: PayloadAction<ITreeListState>) => {
      return action.payload;  
    },

    collapseNode: (state, action: PayloadAction<{nodeId: NodeId, treeViewType: TreeViewType}>) => {
      const {nodeId: nodeId, treeViewType: treeViewType} = action.payload;

      mutateStateToggleNodeExpansion({state, nodeId: nodeId, isExpanding: false, treeViewType: treeViewType});
    },

    expandNode: (state, action: PayloadAction<{nodeId: NodeId, treeViewType: TreeViewType}>) => {
      const {nodeId: nodeId, treeViewType: treeViewType} = action.payload;

      mutateStateToggleNodeExpansion({state, nodeId: nodeId, isExpanding: true, treeViewType: treeViewType});
    },

    resetVisibility: (state, action: PayloadAction<void>) => {
      // all the views, no exceptions
      const rootNode = getRootNode(state.nodesDict);
      mutateStateResetVisibility({
        rootNode,
        viewsDict: state.viewsDict,
        exceptions: [],
      });
    },

    // reset the state to state before loading from db
    clearState: (state, action: PayloadAction<void>) => {
      state.nodesDict = {};
      state.viewsDict = {};
    },

    setSelectedNode: (state, action: PayloadAction<{nodeId: NodeId, treeViewType: TreeViewType}>) => {
      const {nodeId: nodeId, treeViewType: treeViewType} = action.payload;

      state.viewsDict[treeViewType].selectedNodeId = nodeId;
    },
  },
});

export const { setInitialState, collapseNode, expandNode, resetVisibility, setSelectedNode } = treeListSlice.actions;
export default treeListSlice.reducer;

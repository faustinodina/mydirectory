import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRootNode } from "./tree-list-lib";
import { ITreeListState, ITreeNodePosition, NodeId, TreeViewType, IAddNodeData } from "./tree-list-types";
import { mutateStateAddNode, mutateStateResetVisibility, mutateStateToggleNodeExpansion } from "./tree-list-utils";
import { addNoteDialogSubmitted } from "@/store/actions/dialogActions";
//import { setInitialState } from "../counter/counter-slice";

const initialState: ITreeListState = {
  nextNodeId: 0,    // means it is not initialized yet, when we initialize the state from file we will set it to max existing node id + 1
  nodesDict: {},
  pathCache: {},
  viewsDict: {},
};

export const treeListSlice = createSlice({
  name: 'treeList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setInitialState: (state, action: PayloadAction<ITreeListState>) => {
      const newState = action.payload;

      // lets initialize the nextNodeId value based on the existing nodes in the state, so we can be sure it is always correct and we will never have id conflicts when adding new nodes
      if (newState ) {
        if (newState.nextNodeId === undefined) { newState.nextNodeId = 0; }
        
        const maxNodeId = Math.max(...Object.keys(newState.nodesDict).map(id => parseInt(id)), 0);
        newState.nextNodeId = maxNodeId + 1;
      }
      return newState;  
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
    
    incrementNextNodeId: (state, action: PayloadAction<void>) => {
      state.nextNodeId = state.nextNodeId + 1;
    },

    addNode: (state, action: PayloadAction<IAddNodeData >) => {
      const {newNodeId, treeViewType, position } = action.payload;

      mutateStateAddNode({
        state, 
        nodeId: newNodeId, 
        position, 
        treeViewType,
        sortOrder: 0,
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addNoteDialogSubmitted, (state, action) => {

      console.log("action.payload.newNodeId: ", action.payload.newNodeId, "state.nextNodeId: ", state.nextNodeId);

      // current nextNodeId is used, we need to generate a new one
      state.nextNodeId = state.nextNodeId + 1;

      // add the new node to the tree-list state
      mutateStateAddNode({
        state,
        nodeId: action.payload.newNodeId, 
        position: action.payload.position, 
        treeViewType: action.payload.treeViewType,
        sortOrder: 0,
      });
    });
  }
});

export const { incrementNextNodeId, setInitialState, collapseNode, expandNode, resetVisibility, setSelectedNode, addNode } = treeListSlice.actions;
export default treeListSlice.reducer;

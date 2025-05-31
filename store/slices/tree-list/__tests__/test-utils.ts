import { ITreeListState, NO_NodeId } from "../tree-list-types";

export function generateITreeListState1(): ITreeListState {
  const state: ITreeListState = {
    nodesDict: {
      1000: { id: 1000,   parent: NO_NodeId,  level: 0, sortOrder: 1,   children: [1001, 1002, 1003], },
      1001: { id: 1001,   parent: 1000,       level: 1, sortOrder: 10,  children: [10011], },
      10011: { id: 10011, parent: 1001,       level: 2, sortOrder: 1,  children: [], },
      1002: { id: 1002,   parent: 1000,       level: 1, sortOrder: 20,  children: [10021, 10022, 10023], },
      10021: { id: 10021, parent: 1002,       level: 2, sortOrder: 10,  children: [], },
      10022: { id: 10022, parent: 1002,       level: 2, sortOrder: 20,  children: [], },
      10023: { id: 10023, parent: 1002,       level: 2, sortOrder: 30,  children: [], },
      1003: { id: 1003, parent: 1000, level: 1, sortOrder: 30, children: [], },
    },
    viewsDict: {
      'Main': {
        viewType: "Main",
        treeViewId: 1,
        selectedNodeId: NO_NodeId,
        visibleNodesDict: {
          1001:   { id: 1001,   isExpanded: true, nodeVisibilityId: "guid-11001", },
          10011:  { id: 10011,  isExpanded: false, nodeVisibilityId: "guid-110011", },
          1002:   { id: 1002,   isExpanded: false, nodeVisibilityId: "guid-11002", },
          10021:  { id: 10021,  isExpanded: false, nodeVisibilityId: "guid-110021", },
          10022:  { id: 10022,  isExpanded: false, nodeVisibilityId: "guid-110022", },
          10023:  { id: 10023,  isExpanded: false, nodeVisibilityId: "guid-110023", },
          1003:   { id: 1003,   isExpanded: false, nodeVisibilityId: "guid-11003", }
        },
        visibleNodesList: [1001, 10011, 1002, 1003]
      },
      'Other2': {
        viewType: "Other2",
        treeViewId: 2,
        selectedNodeId: NO_NodeId,
        visibleNodesDict: {
          1001:   { id: 1001,   isExpanded: true, nodeVisibilityId: "guid-21001", },
          10011:  { id: 10011,  isExpanded: false, nodeVisibilityId: "guid-210011", },
          1002:   { id: 1002,   isExpanded: false, nodeVisibilityId: "guid-21002", },
          1003:   { id: 1003,   isExpanded: false, nodeVisibilityId: "guid-21003", }
        },
        visibleNodesList: [1001, 10011, 1002, 1003]
      },
      'Other3': {
        viewType: "Other3",
        treeViewId: 3,
        selectedNodeId: NO_NodeId,
        visibleNodesDict: {
          1001:   { id: 1001,   isExpanded: true, nodeVisibilityId: "guid-31001", },
          10011:  { id: 10011,  isExpanded: false, nodeVisibilityId: "guid-310011", },
          1002:   { id: 1002,   isExpanded: false, nodeVisibilityId: "guid-31002", },
          1003:   { id: 1003,   isExpanded: false, nodeVisibilityId: "guid-31003", }
        },
        visibleNodesList: [1001, 10011, 1002, 1003]
      }
    },
  };  

  return state;
}
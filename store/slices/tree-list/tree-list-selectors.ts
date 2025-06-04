import { RootState } from "@/store";
import { memoize } from "proxy-memoize";
import { NO_NodeId, NodeId, TreeViewType } from "./tree-list-types";

// Other code such as selectors can use the imported `RootState` type
//export const selectNodesDict = (state: RootState) => state.treeList.nodesDict;
export const selectNodesDict = memoize((state: RootState) => state.treeList.nodesDict);
export const selectVisibleNodesList = (treeViewType: TreeViewType) => { return memoize((state: RootState) => state.treeList.viewsDict?.[treeViewType]?.visibleNodesList ?? []); }
export const selectTreeNode = (id: NodeId) => { return (state: RootState) => state.treeList.nodesDict[id]; }
export const selectVisibleNodesDict = (treeViewType: TreeViewType) => { return memoize((state: RootState) => state.treeList.viewsDict?.[treeViewType]?.visibleNodesDict ?? {}); }
export const isNodeExpanded = (nodeId: NodeId, treeViewType: TreeViewType) => { return (state: RootState) => state.treeList.viewsDict?.[treeViewType]?.visibleNodesDict[nodeId]?.isExpanded ?? false; }
export const selectSelectedNodeId = (treeViewType: TreeViewType) => { return memoize((state: RootState) => state.treeList.viewsDict?.[treeViewType]?.selectedNodeId ?? NO_NodeId); }
export const selectParentNodeId = (nodeId: NodeId) => { 
  return (state: RootState) => {
    if (!nodeId) { return undefined; }
    if (!(nodeId in state.treeList.nodesDict)) { return undefined; }
    const node = state.treeList.nodesDict[nodeId];
    if (!node) { return undefined; }
    return node.parent;
  }; 
};
export const selectRootNodeId = memoize((state: RootState) => { 
  const strKey = Object.keys(state.treeList.nodesDict).find(key => state.treeList.nodesDict[+key].parent === NO_NodeId); 
  return strKey ? +strKey : 0;
});
export const selectTreeViewId = (treeViewType: TreeViewType) => { return memoize((state: RootState) => state.treeList.viewsDict?.[treeViewType]?.treeViewId); }

// todo: select path

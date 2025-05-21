import { ITreeNode, NO_NodeId, NodeId, TreeDataSource } from "./tree-list-types";

export function isNodeRemovable(nodeToDelete: ITreeNode): boolean {
  if (!nodeToDelete) { return false; }  // node not found
  if (nodeToDelete.children.length != 0) { return false; }  // has children
  if (nodeToDelete.parent === NO_NodeId) { return false; }  // root node can't be removed
  return true;
}

export function getNextSiblingNodeId(nodeId: NodeId, dataSource: TreeDataSource): NodeId|undefined {
  const node = dataSource[nodeId];
  if (!node) { throw "Invalid state: nodeId not found."; }

  const nodeParent = dataSource[node.parent];
  if (!nodeParent) { throw "Invalid state: nodeParent not found."; }

  const indexInParentChildren = nodeParent.children.indexOf(nodeId);
  if (indexInParentChildren === -1) { throw "Invalid state: child not in the parent children list."; }

  if (indexInParentChildren == nodeParent.children.length - 1) {
    // is the last child, has no more sibligs
    return undefined;
  }
  else {
    const nodeIdNextSibling = nodeParent.children[indexInParentChildren + 1];
    return nodeIdNextSibling;
  }
}

export function getNextSiblingVisibilityIndexOfExpandedNode(a: {
  currentVisIndex: number,       // it is the index in vis array of the node for which we want to find its next sibling vis index
  nodeVisibilityList: NodeId[],
  nodesDict: TreeDataSource, 
}): number {
  // if the node with currentVisIndex has childs AND is expanded we need to getFirstVisibleNodeFromDifferentAncestor from its last child
  const currentVisId = a.nodeVisibilityList[a.currentVisIndex];
  const currentNode = a.nodesDict[currentVisId];
  if (!currentNode) {
    throw "getNextSiblingVisibilityIndexOfExpandedNode: Invalid state: no current node found for currentVisId parameter";
  }
  if (!currentNode.children) {
    // wrong usage: it cant be expanded if no children (corrupted state?)
    // anyway we can recover from this returning next index if any
    return a.currentVisIndex >= a.nodeVisibilityList.length - 1 
      ? -1 
      : a.currentVisIndex + 1;
  }
  const lastChildId = currentNode.children[currentNode.children.length - 1];
  const lastChildVisIndex = a.nodeVisibilityList.indexOf(lastChildId);
  if (lastChildVisIndex === -1) {
    // child of expanded node not in the visibility list: corrupted state?
    // then we'll return index next to currentVisIndex assuming the node has no children
    return a.currentVisIndex >= a.nodeVisibilityList.length - 1 
      ? -1 
      : a.currentVisIndex + 1;
  }

  return getFirstVisibleNodeFromDifferentAncestor({
    startingVisIndex: lastChildVisIndex,
    nodeVisibilityList: a.nodeVisibilityList,
    nodesDict: a.nodesDict, 
  });
}

// iterate the vis list from startingVisIndex to find the first node not having startingVisIndex as ancestor"
export function getFirstVisibleNodeFromDifferentAncestor(a: {
  startingVisIndex: number,       // it is the index in vis array of the node for which we want to find its first non-ancestor
  nodeVisibilityList: NodeId[],
  nodesDict: TreeDataSource, 
}): number {

  // get the parent nodeKey of startingVisIndex
  const startingVisNodeId = a.nodeVisibilityList[a.startingVisIndex];
  const startingVisNode = a.nodesDict[startingVisNodeId];

  const parents: NodeId[] = [];
  parents.push(startingVisNodeId);

  const result = a.nodeVisibilityList.findIndex((nodeId, index) => {
    const node = a.nodesDict[nodeId];
    if (!node) {
      console.log("error: node in visList is not in the tree dict");
      return false;
    }
    console.log("nodeId: ", nodeId, ", node: ", node, ", parents: ", parents);
    // start checking parents for the next visible after startingVisIndex
    if (index <= a.startingVisIndex) { return false; }
    if (parents.includes(node.parent)) {
      parents.push(node.id);
      return false;
    } else {
      return true;
    }
  });

  return result;
}

export function getRootNode(treeDataSource: TreeDataSource): ITreeNode {
  const rootNodeId = getRootNodeId(treeDataSource);
  if (rootNodeId === NO_NodeId) { throw "Invalid nodeId"; }
  return treeDataSource[rootNodeId];
}

export function getRootNodeId(treeDataSource: TreeDataSource): NodeId {
  const rootNodeIdStr = Object.keys(treeDataSource).find(key => treeDataSource[+key as NodeId].parent === NO_NodeId);
  return rootNodeIdStr ? +rootNodeIdStr : NO_NodeId;
}


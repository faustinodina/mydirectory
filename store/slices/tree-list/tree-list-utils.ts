import { clearArray, clearDict, mutateArrayRemoveElement } from "@/utils/ts-utils";
import { getFirstVisibleNodeFromDifferentAncestor, getNextSiblingNodeId, getNextSiblingVisibilityIndexOfExpandedNode, getRootNode, isNodeRemovable } from "./tree-list-lib";
import { INodePathCacheDict, ITreeListState, ITreeNode, ITreeNodePosition, NO_NodeId, NodeId, TreeDict, TreeViewType, ViewsDict, VisibleNodesDict } from "./tree-list-types";

export function getInitialStateSample(): ITreeListState {
  return {
    nodesDict: {
      1: {
        id: 1,
        children: [2, 3, 4],
        parent: NO_NodeId,
        level: 0,
        sortOrder: 0,
      }, 
      // 1st level
      2: {
        id: 2,
        children: [],
        parent: 1,
        level: 1,
        sortOrder: 0,
      }, // Sample child node
      3: {
        id: 3,
        children: [5, 6],
        parent: 1,
        level: 1,
        sortOrder: 1,
      }, // Another sample child node
      4: {
        id: 4,
        children: [],
        parent: 1,
        level: 1,
        sortOrder: 2,
      }, 
      // second level
      5: {
        id: 5,
        children: [],
        parent: 3,
        level: 2,
        sortOrder: 0,
      }, // Another sample child node
      6: {
        id: 6,
        children: [],
        parent: 3,
        level: 2,
        sortOrder: 1,
      }, // Another sample child node

    },
    pathCache: {
      1: [],
      2: [2],
      3: [3],
      4: [4],
      5: [3, 5],
      6: [3, 6],
    },
    viewsDict: {
      main: {
        treeViewId: 100,
        viewType: "main",
        visibleNodesDict: {
          // Sample visibility state for nodes
          1: { id: 1, isExpanded: true },
          2: { id: 2, isExpanded: false },
          3: { id: 3, isExpanded: false },
          4: { id: 4, isExpanded: false },
        },
        visibleNodesList: [
          2, // Child node
          3, // Another child node
          4,
        ],
        selectedNodeId: NO_NodeId,
      },
      // Add more views as needed
    },
  };
}

export function mutateStateToggleNodeExpansion({state, nodeId, isExpanding, treeViewType: treeViewType}: {
  state: ITreeListState,
  nodeId: NodeId, 
  isExpanding: boolean, 
  treeViewType: TreeViewType,
}): void /*[ VisibleNodesDict | undefined, string[] | undefined ]*/ {

  //let newNodeVisibilityDict: VisibleNodesDict | undefined = undefined;
  //let newVisibleNodeIdsList: string[] | undefined = undefined;

  // update expanding state in nodeVisibilityDict
  const stateView = state.viewsDict[treeViewType];
  console.log("stateView: ", stateView, treeViewType);

  //console.log("BEFORE nodeVisibilityDict", stateView.visibleNodesDict);
  const nodeVisibility = stateView.visibleNodesDict[nodeId];
  if (!nodeVisibility) {
    //newNodeVisibilityDict = update(state.visibleNodesDict, {[nodeId]: {$set: {key: nodeId, /*level: 0,*/ isExpanded: isExpanding }}});
    stateView.visibleNodesDict[nodeId] = {
      id: nodeId, 
      isExpanded: isExpanding,
      //isDirty: true,
    };
  }
  else if (nodeVisibility.isExpanded != isExpanding) {
    //newNodeVisibilityDict = update(state.visibleNodesDict, {[nodeId]: {isExpanded: {$set: isExpanding }}});
    nodeVisibility.isExpanded = isExpanding;
  }
  else {
    // do nothing: the new state isExpanding is already set
    return;
  }

  // insert/remove id into the visibleNodeIdsList
  if (isExpanding) {
    // is expanding: add all the direct children after himself
    const expandingNode = state.nodesDict[nodeId];
    if (!expandingNode) {
      throw "mutateStateToggleNodeExpansion: Invalid state, no expandingNode could be found from nodeId parameter"
    }
    const allChildren = expandingNode.children;
    const expandingNodeIndex = stateView.visibleNodesList.indexOf(nodeId);
    //newVisibleNodeIdsList = update(state.visibleNodesList, {$splice: [[expandingNodeIndex + 1, 0, ...allChildren]] });
    stateView.visibleNodesList.splice(expandingNodeIndex + 1, 0, ...allChildren);

    // create a node visibility for each children now visible (if not exists)
    const childrenVisibilityDefaults: VisibleNodesDict = {};
    allChildren.forEach(id => {
      childrenVisibilityDefaults[id] = { id: id, isExpanded: false };
    });
    // merge existing children's visibility with the newly created
    // ??? note we want to preserve previous visibility state so old state is at the end
    //newNodeVisibilityDict = {...childrenVisibilityDefaults, ...newNodeVisibilityDict};
    Object.assign(stateView.visibleNodesDict, childrenVisibilityDefaults);
  }
  else {
    // is collapsing: remove all the children and grand-children from the list

    const collapsingNodeIndex = stateView.visibleNodesList.indexOf(nodeId);
    const nextSiblingNodeId = getNextSiblingNodeId(nodeId, state.nodesDict);
    let countToRemove = 0;
    //debugger;
    if (nextSiblingNodeId === undefined) {
      // remove all the list after collapsingNodeIndex
      countToRemove = stateView.visibleNodesList.length - (collapsingNodeIndex + 1);
      console.log("countToRemove1: ", countToRemove)
    }
    else {
      // find index of sibling
      const siblingNodeIndex = stateView.visibleNodesList.indexOf(nextSiblingNodeId);
      if (siblingNodeIndex === -1) { throw "Invalid state: sibling not in the visibility list"; }

      // remove all between collapsingNodeIndex + 1 and siblingNodeIndex
      countToRemove = siblingNodeIndex - (collapsingNodeIndex + 1);
      console.log("countToRemove2: ", countToRemove)
    }
    //newVisibleNodeIdsList = update(state.visibleNodesList, {$splice: [[collapsingNodeIndex + 1, countToRemove]] });
    stateView.visibleNodesList.splice(collapsingNodeIndex + 1, countToRemove);

    // visibilty dictionary for children doesn't change when collapsing a node because we want to preserve it for the next expansion
  }
}

/// Resets the visibility for all the views, with exceptions
export function mutateStateResetVisibility({viewsDict, rootNode, exceptions}: {
  viewsDict: ViewsDict,
  rootNode: ITreeNode,
  exceptions?: TreeViewType[],
}): void {
  
  // const rootNode = getRootNode(state.nodesDict);
  // if (!rootNode) { 
  //   console.log("error: no root node detected");
  //   return; 
  // }

  for (let viewKey in viewsDict) {
    if (exceptions?.includes(viewKey)) { continue; }

    clearDict(viewsDict[viewKey].visibleNodesDict);
    clearArray(viewsDict[viewKey].visibleNodesList);

    // note rootNode is not present in visibleNodesDict nor visibleNodesList

    // visualize only the 1st level accounts
    mutateStateSetDefaultVisibility({
      nodeVisibilityDict: viewsDict[viewKey].visibleNodesDict,
      nodeVisibilityList: viewsDict[viewKey].visibleNodesList,
      rootNode
    })
  }
}

// recreates a minimal list: all the direct childs of the root
// resets nodeVisibilityList, nodeVisibilityList to display level 1 nodes collapsed
// both are mutated
export function mutateStateSetDefaultVisibility(a: {
  rootNode: ITreeNode,
  nodeVisibilityDict: VisibleNodesDict, 
  nodeVisibilityList: NodeId[],
}) : void {
  // recreate the node visibiity list
  a.nodeVisibilityList.length = 0;

  if (!a.rootNode) {
    throw "Invalid parameter rootNode (null)";
  }

  // now only the direct children of the root will be visible
  a.nodeVisibilityList.push(...(a.rootNode.children));

  //... and all will be collapsed
  a.nodeVisibilityList.forEach(childNodeId => {
    let nodeVisibility = a.nodeVisibilityDict[childNodeId];
    if (!nodeVisibility) {
      nodeVisibility = { id: childNodeId, isExpanded: false, };
      a.nodeVisibilityDict[childNodeId] = nodeVisibility;
    } else {
      nodeVisibility.isExpanded = false;
    }
  });
}

export function mutateStateResetPathCache(state: ITreeListState) {
  // clear dictionary
  Object.keys(state.pathCache).forEach(key => {
    delete state.pathCache[+key];
  });

  // iterate recursively the tree, calculate paths
  const rootNode = getRootNode(state.nodesDict);

  // root node should not be included in path so we start recursing the children
  rootNode.children.forEach(childId => {
    const childNode = state.nodesDict[childId];
    if (childNode) {
      recurseTreeRecreatePaths(childNode, [], state.pathCache, state.nodesDict);
    }
  });
}

export function recurseTreeRecreatePaths(node: ITreeNode, path: NodeId[], pathCache: INodePathCacheDict, nodesDict: TreeDict) {
  // add current node to the path
  path.push(node.id);
  // store the path in the cache
  pathCache[node.id] = [...path];

  // iterate children
  for (const childId of node.children) {
    const childNode = nodesDict[childId];
    if (childNode) {
      recurseTreeRecreatePaths(childNode, path, pathCache, nodesDict);
    }
  }

  // remove current node from the path (backtrack)
  path.pop();

}

export function mutateStateAddNode({ state, nodeId: nodeId, position, treeViewType: viewType, sortOrder }: {
  state: ITreeListState,
  nodeId: NodeId, 
  position: ITreeNodePosition, 
  treeViewType: TreeViewType,
  sortOrder: number,
}): void {

  console.log("addNode CALLED parameters: ", arguments);
  const parentNode = state.nodesDict[position.parentId];
  if (!parentNode) { return; }

  const rootNode = getRootNode(state.nodesDict);

  const node: ITreeNode = {
    id: nodeId,
    children: [],
    parent: position.parentId,
    level: parentNode.level + 1,
    sortOrder: sortOrder,
  };

  if (state.nodesDict[nodeId]) {
    throw `Can't add an existing nodeId (${nodeId})`;
  }

  state.nodesDict[nodeId] = node;

  if (position.siblingId) {
    // todo: error when sibling is level 1 it is not displayed
    const siblingIndex = parentNode.children.indexOf(position.siblingId);
    if (siblingIndex != -1) {
      // insert after sibling
      parentNode.children.splice(siblingIndex + 1, 0, nodeId);
    } else {
      // sibling not found: add at the end
      parentNode.children.push(nodeId);
    }
  } else {
    // no sibling specified: add at the end
    try {
      //parentChildren.push(nodeKey); // TypeError: Cannot add property 0, object is not extensible at Array.push (<anonymous>)
      parentNode.children = [...parentNode.children, nodeId];
    }
    catch(err) {
      throw err;
    }
  }

  // register the new account in the viewList and dict
  // if the parent is expanded

  const stateView = state.viewsDict[viewType];

  console.log("SEIS");
  // always register the new node in the visibility dictionary
  stateView.visibleNodesDict[nodeId] = {id: nodeId, isExpanded: false }
  console.log("SIETE");

  // if parent is root it is not in the vis dictionary nor in the vis list so it will need special treatment
  const isParentTheRoot = !parentNode.parent;
  
  // check if new node is visible (parent is expanded AND parent is visible)
  const _parentVisibility = stateView.visibleNodesDict[position.parentId];
  if (isParentTheRoot || (_parentVisibility && _parentVisibility.isExpanded)) {
    const _parentVisIndex = stateView.visibleNodesList.indexOf(position.parentId);
    if (!isParentTheRoot && _parentVisIndex == -1) { 
      // parent is not visible so child won't be visible too
      // reset all the other views
      mutateStateResetVisibility({
        viewsDict: state.viewsDict,
        rootNode,
        exceptions: [viewType]
      });
      return;
    }

    // at this point parent is visible and expanded

    if (position.siblingId) {
      // if sibling specified, insert after sibling
      const _siblingVisIndex = stateView.visibleNodesList.indexOf(position.siblingId);
      if (_siblingVisIndex != -1) {
        const siblingVisibility = stateView.visibleNodesDict[position.siblingId];
        if (!siblingVisibility) {
          console.log("sibling visibility not found: looks like a corrupted visibility state");
          // todo: how to escape from here?
        }

        if (siblingVisibility.isExpanded) {
          // if sibling is expanded then insert after last child visible
          // find last visible child of sibling
          const firstNonAncestorVisIndex = getNextSiblingVisibilityIndexOfExpandedNode({
            currentVisIndex: _siblingVisIndex, 
            nodesDict: state.nodesDict, 
            nodeVisibilityList: stateView.visibleNodesList, 
          });
          if (firstNonAncestorVisIndex === -1) {
            // no node from different ancestor found after _siblingVisIndex: add at the end of the list
            stateView.visibleNodesList = [...stateView.visibleNodesList, nodeId];
          } else {
            // insert before the first non ancestor
            stateView.visibleNodesList.splice(firstNonAncestorVisIndex, 0, nodeId);
          }

          // reset all the other views
          mutateStateResetVisibility({
            viewsDict: state.viewsDict,
            rootNode,
            exceptions: [viewType]
          });
          return;
        }
        else {
          // insert directly after sibling
          // visibility list changes so lets clone it and add to result
          //result.visibleNodesList = [...state.visibleNodesList];
          stateView.visibleNodesList.splice(_siblingVisIndex + 1, 0, nodeId);

          // reset all the other views
          mutateStateResetVisibility({
            viewsDict: state.viewsDict,
            rootNode,
            exceptions: [viewType]
          });
          return;
        }
      }
      else {
        // sibling not found when parent is expanded: looks like a corrupted state
        // but we can add the new node under the parent
        console.log("sibling not found when parent is expanded: looks like a corrupted state");
      }
    }

    /// insert as last visible child:
    // get the previous last child (the one before me)
    const previousLastChildNodeKey = parentNode.children[parentNode.children.length - 2];
    if (!previousLastChildNodeKey) {
      // only one child: the added one; so we can insert it in the vis list after its parent
      // todo: insert after parent      
      // visibility list changes so lets clone it and add to result
      //result.visibleNodesList = [...state.visibleNodesList];
      // this should work when isParentTheRoot (_parentVisIndex should be -1)
      if (isParentTheRoot) {
        stateView.visibleNodesList.splice(0, 0, nodeId);
      }
      else {
        stateView.visibleNodesList.splice(_parentVisIndex + 1, 0, nodeId);
        // only one child: the added one; so we can insert it in the vis list after its parent, returning
      }
      
      // reset all the other views
      mutateStateResetVisibility({
        viewsDict: state.viewsDict,
        rootNode,
        exceptions: [viewType]
      });
      return;
    }

    // get the index of the previous last child in the visibility list, it can have children so it is not necesarily the last in the vis list
    let _previousLastChildVisIndex = stateView.visibleNodesList.indexOf(previousLastChildNodeKey);
    if (_previousLastChildVisIndex === -1) {
      // not found: error, but we can save the situation by
      _previousLastChildVisIndex = _parentVisIndex;
    }

    // iterate the vis list from there to find the first node not having me as ancestor
    const _firstNotAncestorVisIndex = getFirstVisibleNodeFromDifferentAncestor({
      startingVisIndex: _previousLastChildVisIndex,
      nodesDict: state.nodesDict,
      nodeVisibilityList: stateView.visibleNodesList,
    });

    // insert new node before the found one
    // if none was found, push at the end of the vis list
    if (_firstNotAncestorVisIndex === -1) {
      stateView.visibleNodesList = [...stateView.visibleNodesList, nodeId];
    } else {
      //result.visibleNodesList = [...state.visibleNodesList];
      stateView.visibleNodesList.splice(_firstNotAncestorVisIndex, 0, nodeId);
    }

    // reset all the other views
    mutateStateResetVisibility({
      viewsDict: state.viewsDict,
      rootNode,
      exceptions: [viewType]
    });
  } 
}

export function mutateStateRemoveLeafNode({state, nodeId, treeViewType: viewKey}: {
  state: ITreeListState,
  nodeId: NodeId, 
  treeViewType: TreeViewType,
}): boolean {

  const nodeToDelete = state.nodesDict[nodeId];
  if (!nodeToDelete) { return false; }  // node not found
  if (!isNodeRemovable(nodeToDelete)) { return false; }

  const stateView = state.viewsDict[viewKey];

  // remove from the vis list
  mutateArrayRemoveElement(stateView.visibleNodesList, nodeId);

  // remove from the vis dict
  delete stateView.visibleNodesDict[nodeId];

  // remove from parent's children list
  const parentNode = state.nodesDict[nodeToDelete.parent];
  if (!parentNode) {
    throw `mutateStateRemoveLeafNode: Invalid state: parentNode could not be found (nodeId: ${nodeToDelete.parent})`;
  }
  if (!mutateArrayRemoveElement(parentNode.children, nodeId)) {
    console.log("error: not removed from parent's list");
  }

  // remove from tree
  delete state.nodesDict[nodeId];

  // reset all the other views
  mutateStateResetVisibility({
    viewsDict: state.viewsDict,
    rootNode: getRootNode(state.nodesDict),
    exceptions: [viewKey]
  });

  return true;
}

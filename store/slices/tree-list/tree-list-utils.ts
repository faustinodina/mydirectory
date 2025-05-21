import { clearArray, clearDict } from "@/utils/ts-utils";
import { getNextSiblingNodeId } from "./tree-list-lib";
import { ITreeListState, ITreeNode, NodeId, TreeViewType, ViewsDict, VisibleNodesDict } from "./tree-list-types";


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

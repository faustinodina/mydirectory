import { ITreeNode, NO_NodeId, VisibleNodesDict, NodeId } from "../tree-list-types";
import { mutateStateSetDefaultVisibility, mutateStateResetVisibility, mutateStateToggleNodeExpansion } from "../tree-list-utils";
import { generateITreeListState1 } from "./test-utils.helper";
import { getInitialStateSample as getTreeListInitialStateSample } from '../tree-list-utils';


describe('mutateStateSetDefaultVisibility', () => {
  it('should reset the visibility for a view', () => {
    
    const rootNode: ITreeNode = { id: 1000, parent: NO_NodeId,  level: 0, sortOrder: 1,   children: [1001, 1003], };
    const nodeVisibilityDict: VisibleNodesDict = {
      // 1001: { id: 1001, isExpanded: false, nodeVisibilityId: "guid-11001", },
      // 1003: { id: 1003, isExpanded: false, nodeVisibilityId: "guid-11003", }
    }; 
    const nodeVisibilityList: NodeId[] = [/*1001, 1003*/];
  
    mutateStateSetDefaultVisibility({rootNode, nodeVisibilityDict, nodeVisibilityList});

    expect(nodeVisibilityList).toEqual([1001, 1003]);
    expect(nodeVisibilityDict[1001]).toBeDefined();
    expect(nodeVisibilityDict[1003]).toBeDefined();
  });

  it('should reset the visibility for all the views, with exceptions', () => {

    const treeListState = generateITreeListState1();
    const rootNode = treeListState.nodesDict[1000];
    const viewsDict = treeListState.viewsDict;

    expect(viewsDict["Other2"].visibleNodesDict[10011]).toBeDefined();

    mutateStateResetVisibility({viewsDict, rootNode, exceptions: ["Main"]});

    // Main does not change because it is an exception
    expect(viewsDict["Main"].visibleNodesList).toEqual([1001, 10011, 1002, 1003]);

    // no exceptions views are reduced to show only first level
    expect(viewsDict["Other2"].visibleNodesList).toEqual([1001, 1002, 1003]);
    expect(viewsDict["Other3"].visibleNodesList).toEqual([1001, 1002, 1003]);

    // it is a full reset of the list so items removed from visibility are also removed from the dict
    expect(viewsDict["Other2"].visibleNodesDict[10011]).toBeUndefined();
    expect(viewsDict["Other3"].visibleNodesDict[10011]).toBeUndefined();

  });

  // it('should reset the visibility for all the views, with exceptions', () => {
  //   const treeListState = getTreeListInitialStateSample();
  // });

});

describe('mutateStateToggleNodeExpansion', () => {
  it('should expand', () => {

    const treeListState = getTreeListInitialStateSample();
    console.log ('Initial state:', JSON.stringify(treeListState, null, 2));
    mutateStateToggleNodeExpansion({state: treeListState, nodeId: 3, isExpanding: true, treeViewType: "main"});
    console.log ('Final state:', JSON.stringify(treeListState, null, 2));

  });

});

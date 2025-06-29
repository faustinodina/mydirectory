import { NodeId, ITreeNodePosition, TreeViewType } from "../tree-list-types";
import { mutateStateAddNode, mutateStateRemoveLeafNode, mutateStateToggleNodeExpansion } from "../tree-list-utils";
import { generateITreeListState1 } from "./test-utils.helper";

describe('mutateStateAddNode', () => {
  it('add child of root at the end (level 1)', () => {

    const state = generateITreeListState1();
    const nodeId: NodeId = 1004; 
    const position: ITreeNodePosition = {
      parentId: 1000,
      siblingId: undefined,
    }; 
    const treeViewType: TreeViewType = "Main";
    const sortOrder: number = 15;

    const args = { state, nodeId, position, treeViewType, sortOrder };

    mutateStateAddNode(args);

    expect(state.nodesDict[1004]).toBeDefined();
    expect(state.viewsDict["Main"].visibleNodesList).toContain(1004);
    expect(state.viewsDict["Main"].visibleNodesList[state.viewsDict["Main"].visibleNodesList.length-1]).toEqual(1004);  // is the last

    // new node is level 1 so it should be added to all the others views too that supposedly were reset to minimum state
    expect(state.viewsDict["Other2"].visibleNodesDict[1004]).toBeDefined();
    expect(state.viewsDict["Other2"].visibleNodesList).toContain(1004);
    expect(state.viewsDict["Other2"].visibleNodesList[state.viewsDict["Other2"].visibleNodesList.length-1]).toEqual(1004);  // is the last
    expect(state.viewsDict["Other3"].visibleNodesDict[1004]).toBeDefined();
    expect(state.viewsDict["Other3"].visibleNodesList).toContain(1004);
    expect(state.viewsDict["Other3"].visibleNodesList[state.viewsDict["Other3"].visibleNodesList.length-1]).toEqual(1004);  // is the last

    //console.log("state.pathCache: ", state.pathCache);
    // note parent is root which is not included in the path
    expect(state.pathCache[1004]).toStrictEqual([1004]);

  });

  it('add sibling of level 1, between two existing nodes', () => {

    const state = generateITreeListState1();
    const nodeId: NodeId = 10025; 
    const position: ITreeNodePosition = {
      parentId: 1000,
      siblingId: 1002,
    }; 
    const treeViewType: TreeViewType = "Main";
    const sortOrder: number = 25;

    const args = { state, nodeId, position, treeViewType, sortOrder };

    mutateStateAddNode(args);

    expect(state.nodesDict[10025]).toBeDefined();
    expect(state.viewsDict["Main"].visibleNodesList).toContain(10025);

    // new node should be between 1002 and 1003
    const pos10025 = state.viewsDict["Main"].visibleNodesList.indexOf(10025);
    const pos1002 = pos10025 - 1;
    const pos1003 = pos10025 + 1;
    expect(state.viewsDict["Main"].visibleNodesList[pos1002]).toEqual(1002);
    expect(state.viewsDict["Main"].visibleNodesList[pos1003]).toEqual(1003);

    // new node is level 1 so it should be added to all the others views too that supposedly were reset to minimum state
    expect(state.viewsDict["Other2"].visibleNodesDict[1002]).toBeDefined();
    expect(state.viewsDict["Other2"].visibleNodesList).toContain(10025);
    expect(state.viewsDict["Other3"].visibleNodesDict[1002]).toBeDefined();
    expect(state.viewsDict["Other3"].visibleNodesList).toContain(10025);

    // note parent is root which is not included in the path
    expect(state.pathCache[10025]).toStrictEqual([10025]);

  });

  it('add sibling of level 2, between two existing nodes', () => {

    const state = generateITreeListState1();
    const nodeId: NodeId = 10025; 
    const position: ITreeNodePosition = {
      parentId: 1002,
      siblingId: 10022,
    }; 
    const treeViewType: TreeViewType = "Main";
    const sortOrder: number = 25;

    const args = { state, nodeId, position, treeViewType, sortOrder };

    // the sibling node should be visible in order to hang a sibling
    mutateStateToggleNodeExpansion({state, nodeId: 1002, isExpanding: true, treeViewType: "Main"});
    
    expect(state.viewsDict["Main"].visibleNodesList).toContain(10022);

    mutateStateAddNode(args);

    expect(state.nodesDict[10025]).toBeDefined();
    expect(state.viewsDict["Main"].visibleNodesList).toContain(10025);

    // new node should be between 10022 and 10023
    const pos10025 = state.viewsDict["Main"].visibleNodesList.indexOf(10025);
    const pos1002 = pos10025 - 1;
    const pos1003 = pos10025 + 1;
    expect(state.viewsDict["Main"].visibleNodesList[pos1002]).toEqual(10022);
    expect(state.viewsDict["Main"].visibleNodesList[pos1003]).toEqual(10023);

    // new node is level 2 so it should not be added to the others views that supposedly were reset to display only level 1
    expect(state.viewsDict["Other2"].visibleNodesDict[10025]).not.toBeDefined();
    expect(state.viewsDict["Other2"].visibleNodesList).not.toContain(10025);
    expect(state.viewsDict["Other3"].visibleNodesDict[10025]).not.toBeDefined();
    expect(state.viewsDict["Other3"].visibleNodesList).not.toContain(10025);

    expect(state.pathCache[10025]).toStrictEqual([1002, 10025]);

  });
});

describe('mutateStateRemoveLeafNode', () => {
  it('remove leaf node', () => {

    const state = generateITreeListState1();

    expect(state.viewsDict["Other3"].visibleNodesList).toContain(10011);

    mutateStateRemoveLeafNode({
      state,
      nodeId: 10011,
      treeViewType: "Main",
    })

    expect(state.nodesDict[10011]).not.toBeDefined();
    expect(state.viewsDict["Main"].visibleNodesDict[10011]).not.toBeDefined();
    expect(state.viewsDict["Main"].visibleNodesList).not.toContain(10011);

    expect(state.viewsDict["Other3"].visibleNodesList).not.toContain(10011);
    expect(state.pathCache[10011]).not.toBeDefined();

  });
});

import { RootState } from "@/store";
import { memoize } from "proxy-memoize";
import { TreeViewType, NO_NodeId, NodeId } from "../tree-list/tree-list-types";

// Other code such as selectors can use the imported `RootState` type
export const selectNotes = memoize((state: RootState) => state.notes);

//export const selectSelectedNodeKey = (viewKey: ViewKey) => { return (state: RootState) => state.treeList.viewsDict?.[viewKey]?.selectedNodeKey ?? NO_NodeKey; }

export const selectSelectedNoteName = (treeViewType: TreeViewType) => { 
  return (state: RootState) => { 
    const selectedNodeId = state.treeList.viewsDict?.[treeViewType]?.selectedNodeId ?? NO_NodeId; 
    if (!selectedNodeId ) { return null; }
    return state.notes.notesDict?.[selectedNodeId]?.title;
  }
};

export const selectNoteNameById = (nodeId: NodeId) => {
  return (state: RootState) => {
    if (!nodeId) { return ""; }
    const acc = state.notes.notesDict[nodeId];
    return acc?.alias ?? acc?.title ?? "";
  };
};

export const selectNotesDict = memoize((state: RootState) => state.notes.notesDict);
export const selectNote = (accId: NodeId) => { return memoize((state: RootState) => state.notes.notesDict[accId]);};

// const [alias, setAlias] = useState<string|undefined>(useAppSelector((state) => state.notes.notesDict[route.params.accountId].alias));
// const [accountName, setAccountName] = useState<string|undefined>(useAppSelector((state) => state.notes.notesDict[route.params.accountId].name));
// const [accountDescription, setAccountDescription] = useState(useAppSelector((state) => state.notes.notesDict[route.params.accountId].description));

export const selectNoteLabel =(accId: NodeId) => { return memoize((state: RootState) => {
  const alias = state.notes.notesDict[accId]?.alias ?? "";
  const name = state.notes.notesDict[accId]?.title ?? "";
  if (!alias && !name) { return ""; }
  return alias ? `${alias} - ${name}` : name;
});};

export const selectNoteCachedPath = (nodeId: NodeId) => {
  return memoize((state: RootState) => {
    if (!nodeId) { return []; }
    console.log("state.treeList.pathCache: ", state.treeList);
    if (!(nodeId in state.treeList.pathCache)) { return []; }
    return state.treeList.pathCache[nodeId].map((id) => {
      return state.notes.notesDict[id]?.title ?? "";
    });
  });
}

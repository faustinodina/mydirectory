import { RootState } from "@/store";
import { memoize } from "proxy-memoize";
import { TreeViewType, NO_NodeId, NodeId } from "../tree-list/tree-list-types";

// Other code such as selectors can use the imported `RootState` type
export const selectTopics = memoize((state: RootState) => state.topics);

//export const selectSelectedNodeKey = (viewKey: ViewKey) => { return (state: RootState) => state.treeList.viewsDict?.[viewKey]?.selectedNodeKey ?? NO_NodeKey; }

export const selectSelectedTopicName = (treeViewType: TreeViewType) => { 
  return (state: RootState) => { 
    const selectedNodeId = state.treeList.viewsDict?.[treeViewType]?.selectedNodeId ?? NO_NodeId; 
    if (!selectedNodeId ) { return null; }
    return state.topics.topicsDict?.[selectedNodeId]?.name;
  }
};

export const selectTopicNameById = (nodeId: NodeId) => {
  return (state: RootState) => {
    if (!nodeId) { return ""; }
    const acc = state.topics.topicsDict[nodeId];
    return acc?.alias ?? acc?.name ?? "";
  };
};

export const selectTopicsDict = memoize((state: RootState) => state.topics.topicsDict);
export const selectTopic = (accId: NodeId) => { return memoize((state: RootState) => state.topics.topicsDict[accId]);};

// const [alias, setAlias] = useState<string|undefined>(useAppSelector((state) => state.topics.topicsDict[route.params.accountId].alias));
// const [accountName, setAccountName] = useState<string|undefined>(useAppSelector((state) => state.topics.topicsDict[route.params.accountId].name));
// const [accountDescription, setAccountDescription] = useState(useAppSelector((state) => state.topics.topicsDict[route.params.accountId].description));

export const selectTopicLabel =(accId: NodeId) => { return memoize((state: RootState) => {
  const alias = state.topics.topicsDict[accId]?.alias ?? "";
  const name = state.topics.topicsDict[accId]?.name ?? "";
  if (!alias && !name) { return ""; }
  return alias ? `${alias} - ${name}` : name;
});};


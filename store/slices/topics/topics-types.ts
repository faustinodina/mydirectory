import { ITreeListState, ITreeNodePosition, NodeId, TreeViewType } from "../tree-list/tree-list-types";

export interface ITopicPayload {
  name: string;
  alias?: string;
  description?: string;
}

export interface ITopic2 extends ITopicPayload {
  id: NodeId;
}

export type TopicsPayloadDict = { [key: NodeId]: ITopic2 };

export interface TopicsState {
  topicsDict: TopicsPayloadDict,   // nodes' payload: uses the same node keys used by nodesDict
}

export interface ResetTopicsPayload {  
  rootTopicId: NodeId;
  topicsState: TopicsState;
}

// used to persist together both account and tree-list states
export interface TopicsAndITreeListState extends TopicsState, ITreeListState {
}

export interface ITopicToAdd {
  topic: ITopicPayload;
  position: ITreeNodePosition;
  treeViewType: TreeViewType;
};

export interface ITopicEditable {
  treeViewType: TreeViewType;
  topicId: NodeId;
  name: string;
  alias?: string;
  description?: string;
}

//--- viewKeys ---
export const ViewKeysRegistry = {
  Main: "Main" as TreeViewType,
  AddTrxSource: "AddTrxSource" as TreeViewType,
  AddTrxDestine: "AddTrxDestine" as TreeViewType,
};

export type TreeViewTypeKey = keyof typeof ViewKeysRegistry;

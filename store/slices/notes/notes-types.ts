import { ITreeListState, ITreeNodePosition, NodeId, TreeViewType } from "../tree-list/tree-list-types";

export interface INotePayload {
  title: string;
  alias?: string;
  description?: string;
}

export interface INote2 extends INotePayload {
  id: NodeId;
}

export type NotesPayloadDict = { [key: NodeId]: INote2 };

export interface NotesState {
  notesDict: NotesPayloadDict,   // nodes' payload: uses the same node keys used by nodesDict
}

export interface ResetNotesPayload {  
  rootNoteId: NodeId;
  notesState: NotesState;
}

// used to persist together both account and tree-list states
export interface NotesAndITreeListState extends NotesState, ITreeListState {
}

export interface INoteToAdd {
  note: INotePayload;
  position: ITreeNodePosition;
  treeViewType: TreeViewType;
};

export interface INoteEditable {
  treeViewType: TreeViewType;
  noteId: NodeId;
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

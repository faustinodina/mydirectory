import { createAction } from '@reduxjs/toolkit';
import { IAddNodeData, ITreeNodePosition, TreeViewType } from '../slices/tree-list/tree-list-types';
import { INoteEditable } from '../slices/notes/notes-types';
import { createAppAsyncThunk } from '..';
import { incrementNextNodeId } from '../slices/tree-list';
import { IAddEditNoteFormData } from '@/components/ui/directory/types';

// export const addNoteDialogSubmitted = createAction<{
//   nodeData: {
//     treeViewType: TreeViewType, 
//     position: ITreeNodePosition,
//   };
//   noteData: INoteEditable;
// }>('addNoteDialog/submitted');

// note the input parameter is available to the extraReducers through action.meta.arg; 
// the strategy here is to pass all the data needed for adding the note in the dialog through the action parameter, and then handle the actual logic of adding the note in the extraReducers 
// export const addNoteDialogSubmitted = createAppAsyncThunk<void, IAddNodeData & IAddEditNoteFormData>(
//   'addNoteDialog/submitted', 
//   async (addNoteData, { dispatch, getState }) => {
//     // You can access the current state if needed
//     const currentState = getState();
//     addNoteData.newNodeId = currentState.treeList.nextNodeId;

//     // increment the nextNodeId in the treeList slice, so it will be available for the next usage
//     dispatch(incrementNextNodeId());
//   } 
// );

// we don't need an asyncThunk here because we don't have any async logic in the action, all the logic will be handled in the extraReducers, so we can just use createAction
export const addNoteDialogSubmitted = createAction<IAddNodeData & IAddEditNoteFormData>('addNoteDialog/submitted');


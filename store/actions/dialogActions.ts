import { createAction } from '@reduxjs/toolkit';
import { IAddNodeData } from '../slices/tree-list/tree-list-types';
import { INoteEditable } from '../slices/notes/notes-types';
import { IAddEditNoteFormData } from '@/components/ui/directory/types';

// we don't need an asyncThunk here because we don't have any async logic in the action, all the logic will be handled in the extraReducers, so we can just use createAction
export const addNoteDialogSubmitted = createAction<IAddNodeData & IAddEditNoteFormData>('addNoteDialog/submitted');

export const editNoteDialogSubmitted = createAction<INoteEditable>('editNoteDialog/submitted');

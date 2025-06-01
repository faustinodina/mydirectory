import type { RootState } from '@/store';
import { NotesState, INoteEditable, INoteToAdd, ResetNotesPayload } from "@/store/slices/notes/notes-types";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NO_NodeId, NodeId, TreeViewType } from '@/store/slices/tree-list/tree-list-types';
import { memoize } from "proxy-memoize";

const initialState: NotesState = {
  notesDict: {},
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {

    setInitialState: (state, action: PayloadAction<NotesState>) => {
      return action.payload;  
    },

    resetNotes: (state, action: PayloadAction<ResetNotesPayload>) => {
      const resetNotesPayload = action.payload;
      state.notesDict = resetNotesPayload.notesState.notesDict;
    },
  
    addNote: (state, action: PayloadAction<{nodeId: NodeId, noteToAdd: INoteToAdd}>) => {
      const {nodeId: nodeId, noteToAdd: noteToAdd } = action.payload;
      state.notesDict[nodeId] = {id: nodeId, ...noteToAdd.note};
    },

    updateNote: (state, action: PayloadAction<INoteEditable>) => {
      const modifiedNoteData = action.payload;
      const noteToModify = state.notesDict[modifiedNoteData.noteId];
      if (!noteToModify) { return; }
      noteToModify.name = modifiedNoteData.name;
      noteToModify.alias = modifiedNoteData.alias;
      noteToModify.description = modifiedNoteData.description;
    },

    removeNote: (state, action: PayloadAction<NodeId>) => {
      const nodeId = action.payload;
      delete state.notesDict[nodeId];
    },

    // reset the state to state before loading from db
    clearState: (state, action: PayloadAction<void>) => {
      state.notesDict = {};
    },
  },

  extraReducers: (builder) => {
  },
});

export const { resetNotes, setInitialState } = notesSlice.actions;


export default notesSlice.reducer;

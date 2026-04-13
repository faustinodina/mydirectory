import type { RootState } from '@/store';
import { NotesState, INoteEditable, INoteToAdd, ResetNotesPayload } from "@/store/slices/notes/notes-types";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NO_NodeId, NodeId, TreeViewType } from '@/store/slices/tree-list/tree-list-types';
import { addNoteDialogSubmitted } from '@/store/actions/dialogActions';

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
      noteToModify.title = modifiedNoteData.name;
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
    builder.addCase(addNoteDialogSubmitted, (state, action) => {
      //const {nodeId: nodeId, noteToAdd: noteToAdd } = action.payload;
      const nodeId = action.payload.newNodeId;
      const noteToAdd: INoteToAdd = {
        note: {
          title: action.payload.title,
          alias: action.payload.alias,
          description: action.payload.description,
          contentGuid: `note_${nodeId}.html`,  // we will use this guid to create the file containing the note content in html format, and also to link the note to its content file
        },
        position: action.payload.position,
        treeViewType: action.payload.treeViewType,
      };

      state.notesDict[nodeId] = {id: nodeId, ...noteToAdd.note};
    });
  },
});

export const { resetNotes, setInitialState, updateNote } = notesSlice.actions;


export default notesSlice.reducer;

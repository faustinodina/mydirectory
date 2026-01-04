import { AddEditNoteFormData } from "@/components/ui/directory/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import notesSlice from "./notes-slice";
import { updateNote } from "@/store/slices/notes/notes-slice";
import { NodeId } from "../tree-list/tree-list-types";


export const updateNoteThunk = createAsyncThunk(
  "notes/update",
  async (
    payload: { id?: NodeId; data: AddEditNoteFormData },
    { dispatch, getState }
  ) => {
    // 1. Update Redux state (sync)
    dispatch(updateNote({
      treeViewType: "Main",
      noteId: payload.id!,
      name: payload.data.title,
      alias: payload.data.alias,
      description: payload.data.description,
    }));

    return payload;
  }
);

//resetTreeView

import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetTreeView = createAsyncThunk(
  'treeList/resetTreeView', 
  async (_, { dispatch, getState }) => {
    // You can access the current state if needed
    const currentState = getState();
    
    // Dispatch any actions needed to reset the tree view
    // For example, you might want to clear the current selection or reset the view to its initial state
    //dispatch({ type: 'treeList/reset' });

    // Return any data if necessary
    return;
  } 
);

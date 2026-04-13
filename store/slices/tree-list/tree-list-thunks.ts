//resetTreeView

import { createAppAsyncThunk } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { incrementNextNodeId } from '../tree-list/tree-list-slice';

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

export const getNextNodeId = createAppAsyncThunk<number, void>(
  'treeList/getNextNodeId', 
  async (_, { dispatch, getState }) => {
    // You can access the current state if needed
    const currentState = getState();
    const result = currentState.treeList.nextNodeId;

    dispatch(incrementNextNodeId());

    return result;
  } 
);

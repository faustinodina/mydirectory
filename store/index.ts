import { configureStore } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import counterReducer from './slices/counter/counter-slice';
import treeListReducer from './slices/tree-list/tree-list-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treeList: treeListReducer,
  },
});

// In store/index.ts or a file like store/persist.ts
store.subscribe(() => {
  const state = store.getState();
  const fileUri = FileSystem.documentDirectory + 'state.json';
  FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state)).catch(console.error);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

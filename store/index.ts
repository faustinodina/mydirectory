import { configureStore } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import counterReducer from './slices/counter/counter-slice';
import treeListReducer from './slices/tree-list/tree-list-slice';
import topicsReducer from './slices/notes/notes-slice';
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { saveStateToFile } from './persistence';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treeList: treeListReducer,
    topics: topicsReducer,
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

// In store/index.ts or a file like store/persist.ts
store.subscribe(() => {
  const state = store.getState();
  saveStateToFile(state);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system/legacy';
import counterReducer from './slices/counter/counter-slice';
import treeListReducer from './slices/tree-list/tree-list-slice';
import notesReducer from './slices/notes/notes-slice';
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { saveStateToFile } from './persistence';
import { debounce } from "ts-debounce";

const saveStateToFileDebounced = debounce(saveStateToFile, 1000);

const saverClosure = () => {
  let pastState: any = null;

  return (newState: any) => {
    if (newState !== pastState) {
      pastState = newState;
      saveStateToFileDebounced(newState);
    }
  };
}

const save = saverClosure();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treeList: treeListReducer,
    notes: notesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,         // This will throw warnings if immutability is violated.
      serializableCheck: true,
    }),
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

// In store/index.ts or a file like store/persist.ts
store.subscribe(() => {
  try {
    const state = store.getState();
    save(state);
  } catch (error) {
    console.error("Error saving state to file:", error);
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

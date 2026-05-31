import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import treeListReducer from './slices/tree-list/tree-list-slice';
import notesReducer from './slices/notes/notes-slice';
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { saveStateToFile } from './persistence';
import { debounce } from "ts-debounce";
import { AppState } from 'react-native';

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


// Force an immediate save when the app goes to background.
// The debounced subscriber has a 1s delay, so if the user closes the app
// during that window the latest state would be lost. Android may kill the
// process shortly after backgrounding, so this is the last reliable save point.
AppState.addEventListener('change', (nextState) => {
  if (nextState === 'background') {
    void saveStateToFile(store.getState());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>();


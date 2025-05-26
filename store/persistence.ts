// store/bootstrap.ts
import * as FileSystem from 'expo-file-system';
import { AppDispatch, RootState } from './index';
import { setInitialState as setCounterInitialState } from './slices/counter/counter-slice'; // assume your slice supports this
import { getInitialStateSample as getTreeListInitialStateSample } from './slices/tree-list/tree-list-utils';
import { setInitialState as setTreeListInitialState } from './slices/tree-list/tree-list-slice';

const fileUri = FileSystem.documentDirectory + 'state.json';
const treeListFileUri = FileSystem.documentDirectory + 'tree-list.json';

// note it is a dispatch-able thunk
export const loadStateFromFile = () => async (dispatch: AppDispatch) => {
  try {
    const data = await FileSystem.readAsStringAsync(fileUri);
    console.log('state.json:', data);
    const parsed = JSON.parse(data) as RootState;

    dispatch(setCounterInitialState(parsed.counter));

    dispatch(setTreeListInitialState(parsed.treeList ?? getTreeListInitialStateSample()));

  } catch (error) {
    console.log(`No existing file "${fileUri}" or failed to load:`, error);
  }
};

export const saveStateToFile = (state: RootState) => {
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state)).catch(console.error);
}

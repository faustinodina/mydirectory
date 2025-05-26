// store/bootstrap.ts
import * as FileSystem from 'expo-file-system';
import { AppDispatch } from './index';
import { setInitialState } from './slices/counter/counter-slice'; // assume your slice supports this
import { getInitialStateSample as getTreeListInitialStateSample } from './slices/tree-list/tree-list-utils';
import { setInitialState as setTreeListInitialState } from './slices/tree-list/tree-list-slice';
import { ITreeListState } from './slices/tree-list/tree-list-types';

const fileUri = FileSystem.documentDirectory + 'state.json';
const treeListFileUri = FileSystem.documentDirectory + 'tree-list.json';

export const loadStateFromFile = () => async (dispatch: AppDispatch) => {
  try {
    const data = await FileSystem.readAsStringAsync(fileUri);
    console.log('state.json:', data);
    const parsed = JSON.parse(data);
    dispatch(setInitialState(parsed.counter));

    //---
    const data2 = await tryLoadTreeListStateAsync();
    dispatch(setTreeListInitialState (data2));

  } catch (error) {
    console.log('No existing file state.json or failed to load:', error);
  }
};

async function tryLoadTreeListStateAsync(): Promise<ITreeListState> {
  
  try {
    const treeListJsonData = await FileSystem.readAsStringAsync(treeListFileUri);
    const result = JSON.parse(treeListJsonData);
    if (!result) {
      return getTreeListInitialStateSample();
    }
    return result;
  } catch(error) {
    console.log(`No existing file "${treeListFileUri}" or failed to load or failed to parse: `, error);
    return getTreeListInitialStateSample();
  }

  // return FileSystem.readAsStringAsync(treeListFileUri)
  //   .then(data => {
  //     if (!data) {
  //       return getTreeListInitialStateSample();
  //     }
  //     return JSON.parse(data);
  //   })
  //   .catch(error => {
  //     console.log('No existing file tree-list.json or failed to load:', error);
  //     return getTreeListInitialStateSample();
  //   });
}
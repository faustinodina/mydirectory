// store/bootstrap.ts
import * as FileSystem from 'expo-file-system';
import { AppDispatch } from './index';
import { setInitialState } from './slices/counter/counter-slice'; // assume your slice supports this

const fileUri = FileSystem.documentDirectory + 'state.json';

export const loadStateFromFile = () => async (dispatch: AppDispatch) => {
  try {
    const data = await FileSystem.readAsStringAsync(fileUri);
    console.log('state.json:', data);
    const parsed = JSON.parse(data);
    dispatch(setInitialState(parsed.counter));
  } catch (error) {
    console.log('No existing file state.json or failed to load:', error);
  }
};

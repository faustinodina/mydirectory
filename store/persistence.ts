// store/bootstrap.ts
import { File, Paths} from 'expo-file-system';
import { AppDispatch, RootState } from './index';
import { setInitialState as setCounterInitialState } from './slices/counter/counter-slice'; // assume your slice supports this
import { getInitialStateSample as getTreeListInitialStateSample } from './slices/tree-list/tree-list-utils';
import { setInitialState as setTreeListInitialState } from './slices/tree-list/tree-list-slice';
import { getInitialStateSample as getNotesInitialStateSample } from './slices/notes/notes-utils';
import { setInitialState as setNotesInitialState} from './slices/notes/notes-slice';

// note it is a dispatch-able thunk
export const loadStateFromFile = (loadSample: boolean) => async (dispatch: AppDispatch) => {
  try {
    console.log('Loading state from file');
    const file = new File(Paths.document,'state.json');
    const data = await file.text();
    //console.log('Raw data from file:', data);
    const parsed = loadSample ? { counter: null, treeList: null, notes: null } : JSON.parse(data) as RootState;

    dispatch(setCounterInitialState(parsed.counter));

    dispatch(setTreeListInitialState(parsed.treeList ?? getTreeListInitialStateSample()));

    dispatch(setNotesInitialState(parsed.notes ?? getNotesInitialStateSample()));

  } catch (error) {
    console.log(`Error loading state from file: `, error);
  }
};

export const saveStateToFile = (state: RootState) => {
  try {
    console.log('Saving state to file');
    const file = new File(Paths.document,'state.json');
    file.write(JSON.stringify(state));
  } catch(err) {
    console.error("Error saving state to file: ", err);
  }
}

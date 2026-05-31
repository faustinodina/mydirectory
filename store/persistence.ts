// store/bootstrap.ts
import { File, Paths} from 'expo-file-system';
import { AppDispatch, RootState } from './index';
import { getInitialStateSample as getTreeListInitialStateSample } from './slices/tree-list/tree-list-utils';
import { setInitialState as setTreeListInitialState } from './slices/tree-list/tree-list-slice';
import { getInitialStateSample as getNotesInitialStateSample } from './slices/notes/notes-utils';
import { setInitialState as setNotesInitialState} from './slices/notes/notes-slice';

// Increment this when the shape of RootState changes in a breaking way.
// loadStateFromFile will discard persisted state that doesn't match,
// preventing crashes from stale or incompatible data.
const STATE_VERSION = 1;

type PersistedState = {
  version: number;
  state: RootState;
};

// note it is a dispatch-able thunk
export const loadStateFromFile = (loadSample: boolean) => async (dispatch: AppDispatch) => {
  try {
    let parsed: Partial<RootState> = {};

    if (!loadSample) {
      const data = await getStateFromFile();
      if (data) {
        const persisted = JSON.parse(data) as Partial<PersistedState>;

        if (persisted.version === STATE_VERSION) {
          parsed = persisted.state ?? parsed;
        } else {
          // Persisted state is from a different version — discard it and start fresh.
          // Add migration logic here when needed instead of discarding.
          console.log(`State version mismatch (found ${persisted.version}, expected ${STATE_VERSION}), starting fresh.`);
        }
      }
    }

    dispatch(setTreeListInitialState(parsed.treeList ?? getTreeListInitialStateSample()));
    dispatch(setNotesInitialState(parsed.notes ?? getNotesInitialStateSample()));

  } catch (error) {
    console.log(`Error loading state from file: `, error);
  }
};

export const saveStateToFile = async (state: RootState) => {
  try {
    const persisted: PersistedState = { version: STATE_VERSION, state };
    await writeStringToStateFile(JSON.stringify(persisted));
  } catch (error) {
    console.log(`Error serializing state for saving state to file: `, error);
  }
};

export const writeStringToStateFile = async (json: string) => {
  try {
    // Write to a temp file first, then atomically move it over state.json.
    // This prevents a corrupt state file if the app is killed mid-write.
    const tmp = new File(Paths.document, 'state.json.tmp');
    tmp.write(json);
    await tmp.move(new File(Paths.document, 'state.json'), { overwrite: true });
  } catch(err) {
    console.error("Error saving json state to file: ", err);
  }
};

export const getStateFromFile = async (): Promise<string | null> => {
  try {
    console.log('Getting state from file');
    const file = new File(Paths.document,'state.json');
    if (!file.exists) {
      console.log('State file does not exist');
      return null;
    }
    const data = await file.text();
    return data;
  }
 catch (error) {
    console.log(`Error getting state from file: `, error);
    return null;
  }
};

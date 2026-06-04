// store/bootstrap.ts
import log from '@/config/log-conf';
import { File, Paths} from 'expo-file-system';
import { AppDispatch, RootState } from './index';

const logger = log.extend('persistence');
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
          logger.info('State loaded', { version: persisted.version });
        } else {
          // Persisted state is from a different version — discard it and start fresh.
          // Add migration logic here when needed instead of discarding.
          logger.warn(`State version mismatch (found ${persisted.version}, expected ${STATE_VERSION}), starting fresh.`);
        }
      }
    }

    dispatch(setTreeListInitialState(parsed.treeList ?? getTreeListInitialStateSample()));
    dispatch(setNotesInitialState(parsed.notes ?? getNotesInitialStateSample()));

  } catch (error) {
    logger.error('Error loading state from file', { error: String(error) });
  }
};

export const saveStateToFile = async (state: RootState) => {
  try {
    const persisted: PersistedState = { version: STATE_VERSION, state };
    await writeStringToStateFile(JSON.stringify(persisted));
  } catch (error) {
    logger.error('Error serializing state for saving', { error: String(error) });
  }
};

export const writeStringToStateFile = async (json: string) => {
  try {
    // Write to a temp file first, then atomically move it over state.json.
    // This prevents a corrupt state file if the app is killed mid-write.
    const tmp = new File(Paths.document, 'state.json.tmp');
    tmp.write(json);
    await tmp.move(new File(Paths.document, 'state.json'), { overwrite: true });
    logger.debug('State saved to file', { size: json.length });
  } catch(err) {
    logger.error('Error saving state to file', { error: String(err) });
  }
};

export const getStateFromFile = async (): Promise<string | null> => {
  try {
    //console.log('Getting state from file');
    const file = new File(Paths.document,'state.json');
    if (!file.exists) {
      logger.info('State file does not exist, starting fresh');
      return null;
    }
    const data = await file.text();
    return data;
  }
 catch (error) {
    logger.error('Error reading state file', { error: String(error) });
    return null;
  }
};

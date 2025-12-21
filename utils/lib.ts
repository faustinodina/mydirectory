import * as FileSystem from 'expo-file-system/legacy';

export type FileEntry = {
  uri: string;
  relativeUri: string;
  size: number | null;
  isDirectory: boolean;
  modificationTime: number | null;
};

export const listFilesRecursive = async (
  dirUri: string | null = FileSystem.documentDirectory,
  relUri: string = ""
): Promise<FileEntry[]> => {
  const result: FileEntry[] = [];

  const walk = async (currentUri: string, currRelUri: string) => {
    try {
      const items = await FileSystem.readDirectoryAsync(currentUri);
      for (const item of items) {
        const itemUri = currentUri + item;
        const relUri = currRelUri + item;
        const info = await FileSystem.getInfoAsync(itemUri);
        const isDirectory = info.isDirectory ?? false;

        if (info.exists) {
          result.push({
            uri: itemUri,
            relativeUri: relUri,
            size: info.size ?? null,
            isDirectory,
            modificationTime: info.modificationTime ?? null,
          });

          if (isDirectory) {
            await walk(itemUri + '/', relUri + '/'); // Ensure trailing slash for directories
          }
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${currentUri}:`, err);
    }
  };

  dirUri && await walk(dirUri, "");
  return result;
};


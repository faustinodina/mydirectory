import log from "@/config/log-conf";
import { useAppSelector } from "@/store/hooks";
import { selectNotesDict } from "@/store/slices/notes/notes-selectors";
import { selectNodesDict } from "@/store/slices/tree-list/tree-list-selectors";
import { Directory, File, Paths } from "expo-file-system";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";

const logger = log.extend("note-files");

// Note content files are written as `n-<nodeId>.html` (see components/ui/Note.tsx).
const NOTE_FILE_RE = /^n-(\d+)\.html$/;

type NoteFileInfo = {
  name: string;
  size: number | null;
  modificationTime: number | null;
  nodeId: number | null; // parsed from the file name, null if not a note file
  inNotes: boolean; // present in the notes slice
  inTree: boolean; // present in the tree-list nodesDict
  title?: string; // title from the notes slice, if registered
};

const formatSize = (size: number | null) => {
  if (size == null) return "?";
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(1)} KB`;
};

const formatDate = (ms?: number | null) => {
  if (!ms) return "";
  return new Date(ms).toLocaleString();
};

const NoteFilesScreen = () => {
  const theme = useTheme();
  const notesDict = useAppSelector(selectNotesDict);
  const nodesDict = useAppSelector(selectNodesDict);
  const [files, setFiles] = useState<NoteFileInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(() => {
    try {
      const docDir = new Directory(Paths.document);
      const entries = docDir.list();

      const infos: NoteFileInfo[] = entries
        .filter((entry): entry is File => entry instanceof File)
        .map((file) => {
          const match = file.name.match(NOTE_FILE_RE);
          const nodeId = match ? Number(match[1]) : null;
          const note = nodeId != null ? notesDict[nodeId] : undefined;
          const treeNode = nodeId != null ? nodesDict[nodeId] : undefined;
          return {
            name: file.name,
            size: file.size,
            modificationTime: file.modificationTime,
            nodeId,
            inNotes: !!note,
            inTree: !!treeNode,
            title: note?.title,
          };
        })
        // Note files first, then everything else; alphabetical within each group.
        .sort((a, b) => {
          const aNote = a.nodeId != null ? 0 : 1;
          const bNote = b.nodeId != null ? 0 : 1;
          if (aNote !== bNote) return aNote - bNote;
          return a.name.localeCompare(b.name);
        });

      setFiles(infos);
      setError(null);
      logger.info("Listed document files", { count: infos.length });
    } catch (e) {
      logger.error("Error listing document files", { error: String(e) });
      setError(String(e));
    }
  }, [notesDict, nodesDict]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const noteFiles = files.filter((f) => f.nodeId != null);
  // An orphan is a note file whose nodeId is missing from BOTH slices.
  const orphanCount = noteFiles.filter((f) => !f.inNotes && !f.inTree).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ title: "Note Files (debug)" }} />
      <List.Section>
        <List.Subheader>
          {`${noteFiles.length} note file(s) — ${orphanCount} orphaned`}
        </List.Subheader>

        {error && (
          <Text style={{ padding: 16, color: theme.colors.error }}>{error}</Text>
        )}

        {files.map((f, i) => {
          const isNote = f.nodeId != null;
          // Orphan = note file whose nodeId is in neither the notes nor the tree slice.
          const isOrphan = isNote && !f.inNotes && !f.inTree;

          let statusLabel: string;
          let statusColor: string;
          let icon: string;
          if (!isNote) {
            statusLabel = "other file";
            statusColor = theme.colors.onSurfaceVariant;
            icon = "file-outline";
          } else if (isOrphan) {
            statusLabel = "ORPHANED — missing from notes AND tree slices";
            statusColor = theme.colors.error;
            icon = "file-alert-outline";
          } else {
            // Tracked in at least one slice; note any partial mismatch.
            const flags = [
              f.inNotes ? "notes ✓" : "notes ✗",
              f.inTree ? "tree ✓" : "tree ✗",
            ];
            statusLabel = `${f.title ?? "(untitled)"} — ${flags.join(", ")}`;
            statusColor =
              f.inNotes && f.inTree ? theme.colors.primary : theme.colors.tertiary;
            icon = "file-document-check-outline";
          }

          return (
            <View key={f.name}>
              {i > 0 && <Divider />}
              <List.Item
                title={f.name}
                description={() => (
                  <View>
                    <Text style={{ color: statusColor }}>{statusLabel}</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                      {`${formatSize(f.size)}${
                        f.modificationTime ? ` · ${formatDate(f.modificationTime)}` : ""
                      }`}
                    </Text>
                  </View>
                )}
                left={(props) => (
                  <List.Icon {...props} icon={icon} color={statusColor} />
                )}
              />
            </View>
          );
        })}

        {files.length === 0 && !error && (
          <Text style={{ padding: 16, color: theme.colors.onSurfaceVariant }}>
            No files found in the document directory.
          </Text>
        )}
      </List.Section>
    </ScrollView>
  );
};

export default NoteFilesScreen;

import log from "@/config/log-conf";
import HtmlEditor from "@/components/ui/html-editor";
import React, { useEffect, useRef } from "react";

const logger = log.extend('Note');
import { AppState, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import PathBar from "./PathBar";
import { File, Paths } from 'expo-file-system';
import TextEditor from "./txt-editor";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectNote } from "@/store/slices/notes/notes-selectors";
import { editNoteDialogSubmitted } from "@/store/actions/dialogActions";
import { ViewKeysRegistry } from "@/store/slices/notes/notes-types";
import { IAddEditNoteFormData } from "./directory/types";

//https://github.com/wxik/react-native-rich-editor/blob/master/examples/src/example.tsx
//https://chatgpt.com/share/683b3328-34d0-8013-9fd6-8226aa01e7a6

export type NoteProps = {
  nodeId?: number; // Optional nodeId to get the path for a specific node
  isFocused?: boolean; // Optional prop to indicate if the note is currently focused
};

const Note = (props: NoteProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const note = useAppSelector(selectNote(props.nodeId ?? -1));

  const [content, setContent] = React.useState("INITIAL CONTENT");

  // initializes form state and validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddEditNoteFormData>({
    defaultValues: {
      title: "",
      alias: "",
      description: "",
    },
  });

  // Track if we initialized the form for the current note
  const currentNoteIdRef = useRef<number | undefined>(undefined);

  // Track whether this note was ever focused, so the save/validation on
  // unfocus only runs when actually leaving the note (not on initial mount
  // of a tab that was never opened).
  const wasFocusedRef = useRef(false);

  // populate form when note changes or when we load a new node
  useEffect(() => {
    if (!note) { return; }
    if (currentNoteIdRef.current === props.nodeId) return;

    reset({
      title: note.title,
      alias: note.alias,
      description: note.description ?? "",
    });

    currentNoteIdRef.current = props.nodeId;
  }, [note, props.nodeId, reset]);

  // Handle auto-save of metadata
  const handleAutoSave = handleSubmit((data) => {
    if (!note || !props.nodeId) return;

    // Only save if something actually changed
    if (
      data.title === note.title &&
      data.alias === note.alias &&
      data.description === note.description
    ) {
      return;
    }

    logger.info('Auto-saving note metadata', { nodeId: props.nodeId, title: data.title });
    dispatch(editNoteDialogSubmitted({
      treeViewType: ViewKeysRegistry.Main,
      noteId: props.nodeId,
      name: data.title,
      alias: data.alias,
      description: data.description,
    }));
  });

  // Persist metadata + content for the current note. Kept in a ref (refreshed
  // every render) so the AppState listener below can call the latest version
  // without re-subscribing, and always reads the current `content`/form state.
  const saveNoteRef = useRef<() => Promise<void>>(async () => {});
  saveNoteRef.current = async () => {
    await handleAutoSave();
    const file = new File(Paths.document, `n-${props.nodeId}.html`);
    await file.write(content);
    logger.debug('Note saved', { nodeId: props.nodeId, size: content.length });
  };

  useEffect(() => {
    const fetchNoteContent = async () => {
      if (props.isFocused) {
        wasFocusedRef.current = true;
        const fileName = `n-${props.nodeId}.html`;
        const file = new File(Paths.document, fileName);
        const fileExists = await file.exists;
        if (!fileExists) {
          logger.info('Note file not found, starting empty', { nodeId: props.nodeId });
          setContent("This note is empty. Start writing!");
          return;
        } else {
          const fileContent = await file.text();
          setContent(fileContent);
          logger.debug('Note loaded', { nodeId: props.nodeId, size: fileContent.length });
          return;
        }
      } else {
        // Only persist when leaving a note that was actually opened.
        if (!wasFocusedRef.current) { return; }
        wasFocusedRef.current = false;
        await saveNoteRef.current();
      }
    };
    fetchNoteContent();
  }, [props.isFocused, props.nodeId]);

  // Save when the app goes to the background/inactive, so edits aren't lost if
  // the OS kills the app while the note is still open (focus never flips).
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if ((next === 'background' || next === 'inactive') && wasFocusedRef.current) {
        saveNoteRef.current();
      }
    });
    return () => sub.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <PathBar nodeId={props.nodeId}/> */}
      <View style={{ padding: 16, gap: 12 }}>
        <Controller
          control={control}
          name="title"
          // Title validation temporarily disabled.
          // rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextInput
              mode="outlined"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              label="Title"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                handleAutoSave();
              }}
              error={!!errors.title}
            />
          )}
        />

        <Controller
          control={control}
          name="alias"
          // Alias validation temporarily disabled.
          // rules={{ required: "Alias is required" }}
          render={({ field }) => (
            <TextInput
              mode="outlined"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              label="Alias"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                handleAutoSave();
              }}
              error={!!errors.alias}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              mode="outlined"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              label="Description"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                handleAutoSave();
              }}
              error={!!errors.description}
              multiline
            />
          )}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}>
        {/* <HtmlEditor initialContent={content} /> */}
        <TextEditor content={content} onChange={(newContent) => { setContent(newContent); }} />
      </View>
    </View>
  );
};

export default Note;
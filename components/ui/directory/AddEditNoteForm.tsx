import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import { useAppSelector } from "@/store/hooks";
import { selectNote } from "@/store/slices/notes/notes-selectors";
import { AddEditNoteFormData } from "./types";

        // title: "Topic 2-2",
        // alias: "2-2",
        // description: "",

export type AddEditNoteFormProps = {
  mode: "add" | "edit" | undefined;
  parentId?: number;
  siblingId?: number;
  //note?: Note; // required in edit mode
  noteId?: NodeId;   // required in edit mode
  onSubmit: (data: AddEditNoteFormData) => void;  // note according to best practices dealing with form submit is responsibility of parent component!
};

const AddEditNoteForm = ({ 
  mode = "add", 
  parentId,
  siblingId,
  noteId,
  onSubmit 
}: AddEditNoteFormProps) => {

  // use redux selector to get note data if in edit mode 
  // const note: Note = {
  //   id: "1",
  //   title: "Sample Note",
  //   alias: "sample-note",
  //   description: "This is a sample note for editing.",
  // };
  const note = useAppSelector(selectNote(noteId ?? -1));

  // initializes form state and validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEditNoteFormData>({
    defaultValues: {
      title: "",
      alias: "",
      description: "",
    },
  });

  console.log("parentNodeId:", parentId, "siblingNodeId:", siblingId, "noteId:", noteId, "note:", note);

  // Prevent multiple resets (important when store updates frequently)
  const hasInitialized = useRef(false);

  // populate form when editing
  useEffect(() => {
    if (mode !== "edit") { return; }
    if (!note) { return; }
    if (hasInitialized.current) return;

    reset({
      title: note.title,
      alias: note.alias,
      description: note.description,
    });

    hasInitialized.current = true;

  }, [mode, note, reset]);

  return (
    <View style={{ /*gap: 16*/}}>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextInput
            label="Title"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.title}
          />
        )}
      />

      <Controller
        control={control}
        name="alias"
        rules={{ required: "Alias is required" }}
        render={({ field }) => (
          <TextInput
            label="Alias"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.alias}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextInput
            label="Description"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.description}
            multiline
          />
        )}
      />

      <Button 
        mode="contained" 
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}>
        {mode === "add" ? "Create Note" : "Save Changes"}
      </Button>
    </View>
  );

};

export default AddEditNoteForm;

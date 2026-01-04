import React, { useEffect } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

        // title: "Topic 2-2",
        // alias: "2-2",
        // description: "",

export type Note = {
  id: string;
  title: string;
  alias: string;
  description: string;
};

type AddNoteFormData = {
  title: string;
  alias: string;
  description: string;
};

export type AddNoteFormProps = {
  mode: "add" | "edit" | undefined;
  parentId?: number;
  siblingId?: number;
  note?: Note; // required in edit mode
  onSubmit: (data: AddNoteFormData) => void;
};

const AddEditNoteForm = ({ 
  mode = "add", 
  note, 
  parentId,
  siblingId,
  onSubmit 
}: AddNoteFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddNoteFormData>({
    defaultValues: {
      title: "",
      alias: "",
      description: "",
    },
  });

  console.log("parentNodeId:", parentId, "siblingNodeId:", siblingId, "note:", note);

  // populate form when editing
  useEffect(() => {
    if (mode === "edit" && note) {
      reset({
        title: note.title,
        alias: note.alias,
        description: note.description,
      });
    }
  }, [mode, note, reset]);

  console.log("AddNoteForm mode:", mode);

  // const onSubmit = (data: AddNoteFormData) => {
  //   if (mode === "add") {
  //     console.log("Adding note:", data);
  //     // createNote(data)
  //   } else {
  //     console.log("Editing note:", data);
  //     // updateNote(data)
  //   }
  // };

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

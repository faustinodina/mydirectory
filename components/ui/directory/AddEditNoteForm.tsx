import React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";

        // title: "Topic 2-2",
        // alias: "2-2",
        // description: "",

type AddNoteFormData = {
  title: string;
  alias: string;
  description: string;
};

type AddNoteFormProps = {
  mode?: "add" | "edit";
};

const AddEditNoteForm = ({ mode }: AddNoteFormProps) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNoteFormData>();

  console.log("AddNoteForm mode:", mode);

  return (
     <>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, value, onBlur } }) => (
          <>
          <TextInput
            label="Title"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.title}
          />
          <TextInput
            label="Alias"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.alias}
          />
          <TextInput
            label="Description"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.description}
          />
          </>
        )}
      />

      <Button mode="contained" onPress={handleSubmit(console.log)}>
        Save
      </Button>
    </>
  );

};

export default AddEditNoteForm;

import { Stack } from "expo-router";
import AddNoteForm from "@/components/ui/directory/AddNoteForm";
import React from "react";

const AddNoteModal = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Add Note" }} />
      <AddNoteForm />
    </>
  );

};

export default AddNoteModal;

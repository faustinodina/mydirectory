import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";
import { useLocalSearchParams, Stack } from "expo-router";

export default function AddNoteScreen() {
  const { mode } = useLocalSearchParams<{ mode?: "add" | "edit" }>();

  const isEdit = mode === "edit";

  return (
    <>
      <Stack.Screen
        options={{ title: isEdit ? "Edit Note" : "Add Note" }}
      />
      <AddEditNoteForm mode={mode} />
    </>
  );
}

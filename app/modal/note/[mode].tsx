import AddNoteForm from "@/components/ui/directory/AddNoteForm";
import { useLocalSearchParams, Stack } from "expo-router";

export default function AddNoteScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();

  const isEdit = mode === "edit";

  return (
    <>
      <Stack.Screen
        options={{ title: isEdit ? "Edit Note" : "Add Note" }}
      />
      <AddNoteForm mode={mode} />
    </>
  );
}

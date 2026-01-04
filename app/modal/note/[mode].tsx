import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";
import { parseNumberParam } from "@/lib/helpers";
import { useLocalSearchParams, Stack } from "expo-router";

export default function AddNoteScreen() {
  
  const { mode, parentId, siblingId } = useLocalSearchParams<{ 
    mode?: "add" | "edit" | undefined,
    parentId?: string,
    siblingId?: string,
  }>();

  const parentIdNum = parseNumberParam(parentId);
  const siblingIdNum = parseNumberParam(siblingId);

  const isEdit = mode === "edit";

  return (
    <>
      <Stack.Screen
        options={{ title: isEdit ? "Edit Note" : "Add Note" }}
      />
      <AddEditNoteForm 
        mode={mode} 
        parentId={parentIdNum} 
        siblingId={siblingIdNum}
        onSubmit={(data) => {
          console.log("Submitted data:", data);
        }}
       />
    </>
  );
}

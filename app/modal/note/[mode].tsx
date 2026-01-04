import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";
import { parseNumberParam } from "@/lib/helpers";
import { useLocalSearchParams, Stack } from "expo-router";

export default function AddNoteScreen() {
  
  const { mode, parentId, siblingId, id } = useLocalSearchParams<{ 
    mode?: "add" | "edit" | undefined,
    parentId?: string,
    siblingId?: string,
    id?: string,
  }>();

  const parentIdNum = parseNumberParam(parentId);
  const siblingIdNum = parseNumberParam(siblingId);
  const nodeIdNum = parseNumberParam(id);

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
        noteId={nodeIdNum}
        onSubmit={(data) => {
          console.log("Submitted data:", data);
        }}
       />
    </>
  );
}

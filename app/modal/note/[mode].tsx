import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";
import { parseNumberParam } from "@/lib/helpers";
import { useAppDispatch } from "@/store/hooks";
import { updateNoteThunk } from "@/store/slices/notes/notes-thunks";
import { treeListSlice } from "@/store/slices/tree-list";
import { useLocalSearchParams, Stack, router } from "expo-router";

export default function AddNoteScreen() {

  const dispatch = useAppDispatch();
  
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

  const onEditSubmit = (data: { title: string; alias: string; description: string }) => {
    // handle edit note submission logic here
    console.log("Edit Note Submitted:", data);

    dispatch(updateNoteThunk({
      id: nodeIdNum,
      data: data
    }));

    router.back();
  }
  const onAddSubmit = (data: { title: string; alias: string; description: string }) => {
    // handle add note submission logic here
    console.log("Add Note Submitted:", data);

    dispatch(treeListSlice.actions.addNode({
      nodeId: 0, // Replace with actual new node ID
      treeViewType: "notes", // Replace with actual tree view type
    }));
  }
  const onSubmit = mode === "edit" ? onEditSubmit : onAddSubmit;

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
        onSubmit={onSubmit}
       />
    </>
  );
}

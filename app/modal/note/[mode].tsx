import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";
import { parseNumberParam } from "@/lib/helpers";
import { addNoteDialogSubmitted } from "@/store/actions/dialogActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateNoteThunk } from "@/store/slices/notes/notes-thunks";
import { treeListSlice } from "@/store/slices/tree-list";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { selectNextNodeId } from "@/store/slices/tree-list/tree-list-selectors";

export default function AddNoteScreen() {

  const dispatch = useAppDispatch();

  const nextNodeId = useAppSelector(selectNextNodeId);

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

    // dispatch(treeListSlice.actions.addNode({
    //   newNodeId: 0, 
    //   treeViewType: "main", // Replace with actual tree view type
    //   position: {
    //     parentId: parentIdNum!,
    //     siblingId: siblingIdNum,
    //   }
    // }));

    // pass all the form data: extra reducers will mutate the state
    dispatch(addNoteDialogSubmitted({
      newNodeId: nextNodeId, 
      treeViewType: "main", // Replace with actual tree view type
      position: {
        parentId: parentIdNum!,
        siblingId: siblingIdNum,
      },
      title: data.title,
      alias: data.alias,
      description: data.description,
    }));

    router.back();
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

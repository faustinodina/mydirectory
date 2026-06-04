import log from "@/config/log-conf";
import AddEditNoteForm from "@/components/ui/directory/AddEditNoteForm";

const logger = log.extend('NoteModal');
import { parseNumberParam } from "@/lib/helpers";
import { addNoteDialogSubmitted, editNoteDialogSubmitted } from "@/store/actions/dialogActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { selectNextNodeId } from "@/store/slices/tree-list/tree-list-selectors";
import { ViewKeysRegistry } from "@/store/slices/notes/notes-types";

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
    logger.info('Note edited', { nodeId: nodeIdNum, title: data.title });
    dispatch(editNoteDialogSubmitted({
      treeViewType: ViewKeysRegistry.Main,
      noteId: nodeIdNum!,
      name: data.title,
      alias: data.alias,
      description: data.description,
    }));

    router.back();
  }
  const onAddSubmit = (data: { title: string; alias: string; description: string }) => {
    logger.info('Note added', { parentId: parentIdNum, siblingId: siblingIdNum, title: data.title });
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

import React from "react";
import Note from "@/components/ui/Note";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import { useLocalSearchParams } from "expo-router";

const NoteScreen = () => {
  
  const { nodeId } = useLocalSearchParams<{ nodeId: string }>();  
  
  return (
    // <SelectedNote nodeId={parseInt(nodeId)} />
    <Note nodeId={parseInt(nodeId)} />
  );
};

export default NoteScreen;
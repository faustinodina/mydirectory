import React, { useCallback } from "react";
import { useIsFocused, useLocalSearchParams } from "expo-router";
import Note from "@/components/ui/Note";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";

const NoteScreen = () => {

  const { nodeId } = useLocalSearchParams<{ nodeId: string }>();
  const isFocused = useIsFocused();

  return (
    <Note nodeId={parseInt(nodeId)} isFocused={isFocused} />
  );
};

export default NoteScreen;
import React from "react";
import Note from "./Note";
import { selectSelectedNodeId } from "@/store/slices/tree-list/tree-list-selectors";

import { useAppSelector } from "@/store/hooks";

const SelectedNote = () => {

  const selectedNodeId = useAppSelector(selectSelectedNodeId("main"));

  return (
    <Note nodeId={selectedNodeId} />
  );
};

export default SelectedNote;

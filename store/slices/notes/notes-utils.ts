import { NO_NodeId } from "../tree-list/tree-list-types";
import { NotesState } from "./notes-types";


export function getInitialStateSample(): NotesState {
  return {
    notesDict: {
      1: {
        id: 1,
        title: "Root Topic",
        alias: "root",
        description: "This is a sample topic for demonstration purposes.",
      },
      2: {
        id: 2,
        title: "Topic One",
        alias: "One",
        description: "This is a sample topic for demonstration purposes.",
      },
      3: {
        id: 3,
        title: "Topic Two",
        alias: "Two",
        description: "",
      },
      4: {
        id: 4,
        title: "Topic Three",
        alias: "Three",
        description: "",
      },
      5: {
        id: 5,
        title: "Topic 2-1",
        alias: "2-1",
        description: "",
      },
      6: {
        id: 6,
        title: "Topic 2-2",
        alias: "2-2",
        description: "",
      },
    },
  };  
}

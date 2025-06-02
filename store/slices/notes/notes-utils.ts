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
        contentGuid: "00000000-0000-0000-0000-000000000000",
      },
      2: {
        id: 2,
        title: "Topic One",
        alias: "One",
        description: "This is a sample topic for demonstration purposes.",
        contentGuid: `1a0ea0f9-771a-4aee-bf55-e93dd13ac2eb`,
      },
      3: {
        id: 3,
        title: "Topic Two",
        alias: "Two",
        description: "",
        contentGuid: `ffd0bd71-8756-4fb3-8510-be413a123b37`,
      },
      4: {
        id: 4,
        title: "Topic Three",
        alias: "Three",
        description: "",
        contentGuid: `f54fa192-b9c1-4e3f-ad5a-5285cec6911a`,
      },
      5: {
        id: 5,
        title: "Topic 2-1",
        alias: "2-1",
        description: "",
        contentGuid: `378aef31-30b8-4e11-82c3-01f390db3226`,
      },
      6: {
        id: 6,
        title: "Topic 2-2",
        alias: "2-2",
        description: "",
        contentGuid: `d60754d0-7c47-4e36-b63f-3f35aed983a1`
      },
    },
  };  
}

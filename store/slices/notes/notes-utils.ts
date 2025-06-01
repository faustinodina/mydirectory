import { NO_NodeId } from "../tree-list/tree-list-types";
import { TopicsState } from "./notes-types";


export function getInitialStateSample(): TopicsState {
  return {
    topicsDict: {
      // Sample topic
      1: {
        id: 1,
        name: "Root Topic",
        alias: "root",
        description: "This is a sample topic for demonstration purposes.",
      },
      2: {
        id: 2,
        name: "Topic One",
        alias: "One",
        description: "This is a sample topic for demonstration purposes.",
      },
      3: {
        id: 3,
        name: "Topic Two",
        alias: "Two",
        description: "",
      },
      4: {
        id: 4,
        name: "Topic Three",
        alias: "Three",
        description: "",
      },
      5: {
        id: 5,
        name: "Topic 2-1",
        alias: "2-1",
        description: "",
      },
      6: {
        id: 6,
        name: "Topic 2-2",
        alias: "2-2",
        description: "",
      },
    },
  };  
}

import { TopicsState } from "./topics-types";


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
        id: 1,
        name: "Topic One",
        alias: "One",
        description: "This is a sample topic for demonstration purposes.",
      },
      3: {
        id: 1,
        name: "Topic Two",
        alias: "Two",
        description: "This is a sample topic for demonstration purposes.",
      },
    },
  };  
}

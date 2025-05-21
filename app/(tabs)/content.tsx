import { ThemedText } from "@/app-example/components/ThemedText";
import { ThemedView } from "@/app-example/components/ThemedView";
import React from "react";

const Content = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>CONTENT</ThemedText>
    </ThemedView>
  );
};

export default Content;
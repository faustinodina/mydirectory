import HtmlEditor from "@/components/ui/html-editor";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

//https://github.com/wxik/react-native-rich-editor/blob/master/examples/src/example.tsx
//https://chatgpt.com/share/683b3328-34d0-8013-9fd6-8226aa01e7a6

const Note = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }} >
        <Text>Current Directory:</Text>
        <Text>Some path / subpaths</Text>
      </View>
      <View style={{ flex: 1}}>
        <HtmlEditor />
      </View>
    </View>
  );
};

export default Note;
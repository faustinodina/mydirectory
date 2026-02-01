import HtmlEditor from "@/components/ui/html-editor";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PathBar from "./PathBar";
import * as FileSystem from 'expo-file-system/legacy';

//https://github.com/wxik/react-native-rich-editor/blob/master/examples/src/example.tsx
//https://chatgpt.com/share/683b3328-34d0-8013-9fd6-8226aa01e7a6

export type NoteProps = {
  nodeId?: number; // Optional nodeId to get the path for a specific node
};

const Note = (props: NoteProps) => {

  const [content, setContent] = React.useState("");

  const fileUri = `${FileSystem.documentDirectory}n-${props.nodeId}.html`;
 

  useEffect(() => {

    console.log("File: ", fileUri);

    const fetchNoteContent = async () => {
      // Fetch note content from file name based on nodeId
      const exists = await FileSystem.getInfoAsync(fileUri);
      if (!exists.exists) {
        console.log("File does not exist, creating new note.");
        setContent("<p>This note is empty. Start writing!</p>");
        return;
      } else {
        console.log("File exists, reading content.");
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        setContent(fileContent);
        return;
      }
    };

    fetchNoteContent();

  }, [props.nodeId]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <View style={{ flexDirection: "row" }} >
        <Text>Current Directory:</Text>
        <Text>Some path / subpaths</Text>
      </View> */}
      <PathBar nodeId={props.nodeId}/>
      <View style={{ flex: 1}}>
        <HtmlEditor initialContent={content} />
      </View>
    </View>
  );
};

export default Note;
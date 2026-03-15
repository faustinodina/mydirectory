import HtmlEditor from "@/components/ui/html-editor";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PathBar from "./PathBar";
import { File, Paths } from 'expo-file-system';
import TextEditor from "./txt-editor";

//https://github.com/wxik/react-native-rich-editor/blob/master/examples/src/example.tsx
//https://chatgpt.com/share/683b3328-34d0-8013-9fd6-8226aa01e7a6

export type NoteProps = {
  nodeId?: number; // Optional nodeId to get the path for a specific node
  isFocused?: boolean; // Optional prop to indicate if the note is currently focused
};

const Note = (props: NoteProps) => {

  const [content, setContent] = React.useState("INITIAL CONTENT");

  useEffect(() => {
    const fetchNoteContent = async () => {
      if (props.isFocused) {
        // load content when note becomes focused
        console.log("Load text here!");
        const fileName = `n-${props.nodeId}.html`;
        const file = new File(Paths.document, fileName);
        const fileExists = await file.exists;
        if (!fileExists) {
          console.log(`File ${fileName} does not exist, creating new note.`);
          setContent("This note is empty. Start writing!");
          return;
        } else {
          const fileContent = await file.text();
          setContent(fileContent);
          console.log("Loaded text: ", fileName, fileContent );
          return;
        }
      } else {
        // save content when note becomes unfocused
        const fileName = `n-${props.nodeId}.html`;
        const file = new File(Paths.document, fileName);
        await file.write(content);
        console.log("Saved text: ", fileName, content);
      }
    };
    fetchNoteContent();
  }, [props.isFocused, props.nodeId]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <PathBar nodeId={props.nodeId}/>
      <View style={{ flex: 1}}>
        {/* <HtmlEditor initialContent={content} /> */}
        <TextEditor content={content} onChange={(newContent) => { setContent(newContent); }} />
      </View>
    </View>
  );
};

export default Note;
import React, {useState, useCallback} from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

export type TextEditorProps = {
  initialContent?: string;
  onExiting?: (finalContent: string) => void; // Optional callback when exiting the note
};

const TextEditor = ({initialContent}: TextEditorProps) => {

  const [text, setText] = useState(initialContent);

  return (
    <TextInput 
      style={{ flex: 1, minHeight: 100  }} 
      label="Notes"
      multiline
      value={text}
      onChangeText={setText}
      mode="outlined"
      />  
  );
};

export default TextEditor;

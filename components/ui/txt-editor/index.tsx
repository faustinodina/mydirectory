import React, {useState, useCallback} from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

export type TextEditorProps = {
  content?: string;
  onChange?: (newContent: string) => void; // Optional callback when content changes
  onExiting?: (finalContent: string) => void; // Optional callback when exiting the note
};

const TextEditor = ({content, onChange}: TextEditorProps) => {

  console.log("Redrawing Text Editor with initial content: ", content);

  return (
    <TextInput 
      style={{ flex: 1, minHeight: 100  }} 
      label="Notes"
      multiline
      value={content}
      onChangeText={(newContent) => onChange && onChange(newContent)}
      mode="outlined"
      />  
  );
};

export default TextEditor;

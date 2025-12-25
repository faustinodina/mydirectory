import React from "react";
import { View, StyleSheet, TextStyle, StyleProp } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "@/store/hooks";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import { selectNote } from "@/store/slices/notes/notes-selectors";

export type NamesViewProps = {
  noteId: NodeId,
  //style: StyleProp<TextStyle>
};

// todo: When account has no description, name should be centered vertically, aligned with balance
// todo: balance column should be aligned, no matter how large is the Names view

const NamesView = ({noteId: noteId}: NamesViewProps) => {

  const note = useAppSelector(selectNote(noteId));
  if (!note) { return null; }  // when adding an account the node was added but not yet the account 

  const name = note.alias || note.title;
  const description = note.description;
  const isDescEmpty = !description || description.trim() === "";

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>{name}</Text>
      {!isDescEmpty && <Text variant="titleMedium" style={styles.subtitle}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1, 
    justifyContent: "center",
    minWidth: 0, 

    // borderWidth: 1,
    // borderColor: "red",
  },
  title: {
    // borderWidth: 1,
    // borderColor: "blue",
  },
  subtitle: {
    flexShrink: 1, 
    // borderWidth: 1,
    // borderColor: "green",
  }
});

export default NamesView;
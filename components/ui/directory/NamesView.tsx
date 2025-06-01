import React from "react";
import { View, StyleSheet, TextStyle, StyleProp } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "@/store/hooks";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import { selectNote } from "@/store/slices/notes/notes-selectors";

export type NamesViewProps = {
  noteId: NodeId,
  style: StyleProp<TextStyle>
};

// todo: When account has no description, name should be centered vertically, aligned with balance
// todo: balance column should be aligned, no matter how large is the Names view

const NamesView = ({noteId: noteId, style}: NamesViewProps) => {

  const note = useAppSelector(selectNote(noteId));
  if (!note) { return null; }  // when adding an account the node was added but not yet the account 

  const name = note.alias || note.title;
  const description = note.description;

  return (
    <View style={{...styles.container, ...style as object}}>
      <Text variant="headlineSmall" style={styles.title}>{name}</Text>
      <Text variant="titleMedium" style={styles.subtitle}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {},
  subtitle: {}
});

export default NamesView;
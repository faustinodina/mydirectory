import React from "react";
import { View, StyleSheet, TextStyle, StyleProp } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { useAppSelector } from "@/store/hooks";
import { NodeId } from "@/store/slices/tree-list/tree-list-types";
import { selectTopic } from "@/store/slices/topics/topics-selectors";

export type NamesViewProps = {
  topicId: NodeId,
  style: StyleProp<TextStyle>
};

// todo: When account has no description, name should be centered vertically, aligned with balance
// todo: balance column should be aligned, no matter how large is the Names view

const NamesView = ({topicId: topicId, style}: NamesViewProps) => {

  const topic = useAppSelector(selectTopic(topicId));
  if (!topic) { return null; }  // when adding an account the node was added but not yet the account 

  const name = topic.alias || topic.name;
  const description = topic.description;

  return (
    <View style={{...styles.container, ...style as object}}>
      <Headline style={styles.title}>{name}</Headline>
      <Subheading style={styles.subtitle}>{description}</Subheading>
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
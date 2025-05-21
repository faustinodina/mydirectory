import React from "react";
import { StyleSheet, View } from "react-native";

export type LevelSpacerProps = {
  level: number;
};

const LevelSpacer = ({level}: LevelSpacerProps) => {

  const spaces = [];
  for(let cter = level; cter > 1; cter--) {
    spaces.push(        
      <View key={cter} style={styles.spacer } />
    );
  }

  return(<View style={styles.container}>{ spaces }</View>);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  spacer: {
    width: 30,
  }
});

export default LevelSpacer;

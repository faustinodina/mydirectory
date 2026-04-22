import { getStateFromFile, writeStringToStateFile } from "@/store/persistence";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View, Alert } from "react-native";
import { TextInput, Button, } from "react-native-paper";
import * as Updates from 'expo-updates';

const EditState = () => {
  const { height } = useWindowDimensions();
  const [stateData, setStateData] = useState<string | null>(null);

  useEffect(() => {
    console.log("EditState modal opened");

    const loadData = async () => {
      const data = await getStateFromFile();
      console.log("State data loaded:", data);
      if (data != null) {
        const pretty = JSON.stringify(JSON.parse(data), null, 2);
        setStateData(pretty);
      }
    };

    loadData();

  }, []);

  return (
    <View style={{ height: height - 100,  }}>
      <TextInput
        multiline={true}
        style={{ flex: 1 }}
        contentStyle={{ flex: 1 }}
        value={stateData ?? "No state data found"}
        onChangeText={setStateData}
      />
      <Button 
        mode="contained" 
        onPress={async () => {
          console.log("State data to save:", stateData);
          writeStringToStateFile(stateData ?? "");
          Alert.alert("State saved successfully. The app will restart to apply changes.");
          await Updates.reloadAsync();
        }}>Save State</Button>
    </View>
  );
}

export default EditState;

import { getStateFromFile } from "@/store/persistence";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button, } from "react-native-paper";

const EditState = () => {

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
    <View style={{ flex: 1, borderWidth: 1, borderColor: "red", padding: 10 }}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: "blue" }}>
        <TextInput
          multiline={true}
          scrollEnabled={true}
          value={stateData ?? "No state data found"}
          style={{ flex: 1, textAlignVertical: "top", borderWidth: 1, borderColor: "green", padding: 10 }}
          onChangeText={setStateData}
        />
      </View>
      <Button onPress={() => {
        console.log("State data to save:", stateData);
        }}
        >Save State</Button>
    </View>
  );
}

export default EditState;

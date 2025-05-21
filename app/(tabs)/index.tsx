import { ThemedText } from '@/app-example/components/ThemedText';
import { ThemedView } from '@/app-example/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment } from '@/store/slices/counter/counter-slice';
import { useRouter } from 'expo-router';
import React from "react";
import { Button } from "react-native";

const Index = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>INDEX</ThemedText>
      <ThemedText style={{ fontSize: 24 }}>Count: {count}</ThemedText>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="GoTo Dir" onPress={() => router.push("/docs")} />

    </ThemedView>
  );
};

export default Index;
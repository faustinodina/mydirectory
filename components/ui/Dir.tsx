import { ThemedText } from '@/app-example/components/ThemedText';
import { listFilesRecursive } from '@/utils/lib';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

const Dir = () => {

  // return (
  //   <ThemedText>Directory Component</ThemedText>
  // );
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      const data = await listFilesRecursive();
      setFiles(data);
    };

    loadFiles();
  }, []);

  return (
    <ScrollView>
      {files.map((file, index) => (
        <ThemedText key={index}>
          {file.relativeUri} - {file.size} bytes
        </ThemedText>
      ))}
    </ScrollView>
  );
};

export default Dir;
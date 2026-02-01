import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, Text } from 'react-native';
import { generateHtml } from './template';

type HtmlEditorProps = {
  initialContent?: string;
};

export default function HtmlEditor({ initialContent }: HtmlEditorProps) {
  const webViewRef = useRef<WebView>(null);
  const [editorContent, setEditorContent] = useState(initialContent || '');

  const onMessage = (event: { nativeEvent: { data: string; }; }) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === 'text-change') {
      setEditorContent(data.content);
    }
  };

  const setInitialContent = () => {
    const command = JSON.stringify({ command: 'setContent', content: '<p><strong>Hello</strong> from React Native!</p>' });
    webViewRef.current?.injectJavaScript(`document.dispatchEvent(new MessageEvent('message', { data: '${command}' }));`);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: generateHtml() }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <Button title="Set Initial Content" onPress={setInitialContent} />
      <Text numberOfLines={2} style={{ padding: 10 }}>Live Content: {editorContent}</Text>
    </View>
  );
}

import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

export default function HtmlEditorScreen() {
  const onMessage = (event: { nativeEvent: { data: string; }; }) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === 'text-change') {
      console.log('Editor content:', data.content);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  </head>
  <body>
    <div id="editor" style="height: 100vh;"></div>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script>
      const editor = new Quill('#editor', { theme: 'snow' });
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'editor-loaded' }));

      editor.on('text-change', () => {
        const content = editor.root.innerHTML;
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'text-change', content }));
      });
    </script>
  </body>
</html>
`;

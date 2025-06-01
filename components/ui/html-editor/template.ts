export const generateHtml = (initialContent = '') => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <style>
      /*
      body, #editor { margin: 0; padding: 0; height: 100%; }
      #editor { background: white; }
      */
      body {
        margin: 0;
        padding: 0;
        font-size: 16px; /* You can increase this */
      }
      #editor {
        height: 100vh;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div id="toolbar">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
      </select>
      <button class="ql-link"></button>
      <button class="ql-image"></button>
    </div>
    <div id="editor">${initialContent}</div>

    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script>
      const editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow'
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({
        event: 'editor-loaded',
        content: editor.root.innerHTML
      }));

      editor.on('text-change', () => {
        const content = editor.root.innerHTML;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          event: 'text-change',
          content
        }));
      });

      document.addEventListener("message", function(event) {
        const message = JSON.parse(event.data);
        if (message.command === "setContent") {
          editor.root.innerHTML = message.content;
        }
      });
    </script>
  </body>
</html>
`;

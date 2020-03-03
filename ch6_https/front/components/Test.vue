<template>
  <div id="top" style="background-color:white">
    <!-- Text Editor -->
    <TuiEditor mode="markdown" preview-style="vertical" height="300px" />

    <!-- Markdown Viewer -->
    <TuiEditorViewer :value="content" />
  </div>
</template>

<script>
export default {
  data: {
    content: "Hello World!"
  }
};
</script>

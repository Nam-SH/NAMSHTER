<template>
  <div>
    <div id="component" style="width: 300px; height: 400px;">
      <no-ssr>
        <file-pond
          name="image"
          ref="pond"
          label-idle="Drop files here..."
          allow-multiple="true"
          v-bind:server="myServer"
          v-bind:files="myFiles"
          v-on:init="handleFilePondInit"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create component
const FilePond = vueFilePond(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

export default {
  components: {
    FilePond
  },
  data() {
    return {
      // fake server to simulate loading a 'local' server file and processing a file
      myServer: {
        url: "http://localhost:3085",
        process: (fieldName, file, metadata, load) => {
          method: "POST";
          withCredentials: false;
        },
        load: (source, load) => {
          // simulates loading a file from the server
          fetch(source)
            .then(res => res.blob())
            .then(load);
        }
      },
      myFiles: [],
      filename: ""
    };
  },
  methods: {
    handleFilePondInit: function() {
      // FilePond instance methods are available on `this.$refs.pond`

      /* eslint-disable */
      console.log("FilePond has initialized");
    }
  },
  mounted() {
    console.log(this.filename);
  }
};
</script>

<template>
  <v-row justify="center">
    <v-btn class="ml-auto" aria-label="camera" @click.stop="dialog = true">
      <i class="fas fa-camera"></i>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card height="600px">
        <div>
          <p class="error">{{ error }}</p>
          <p class="decode-result">
            <b>{{ result }}</b>
          </p>
          <qrcode-stream style="width:100px;height:100px" @decode="onDecode" @init="onInit" />
          <qrcode-drop-zone></qrcode-drop-zone>
        </div>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn aria-label="go" color="white darken-1" text @click="dialog = false">보러가기</v-btn>
        <v-btn aria-label="cancle" color="white darken-1" text @click="dialog = false">닫기</v-btn>
      </v-card-actions>
    </v-dialog>
  </v-row>
</template>

<script>
import { QrcodeStream, QrcodeDropZone } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream, QrcodeDropZone },

  data() {
    return {
      result: "",
      error: "",
      dialog: false
    };
  },

  methods: {
    onDecode(result) {
      this.result = result;

      var expUrl = /^http[s]?\:\/\//i;
      if (expUrl.test(this.result)) {
        return window.open(this.result);
      } else if (this.result.id) {
        return this.$store
          .dispatch("users/loadOther", {
            userId: result.id
          })
          .then(() => {});
      }
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>

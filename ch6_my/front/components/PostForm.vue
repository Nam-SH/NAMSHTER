<template>
  <v-card style="margin-bottom: 20px;">
    <v-container>
      <v-form ref="form" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="무슨 일 있었음?;;"
          :error="error"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          @input="onChangeTextarea"
        />
        <v-alert
          v-if="alert"
          v-model="alert"
          border="left"
          close-text="Close Alert"
          color="deep-purple accent-4"
          dark
          dismissible
        />
        <v-btn type="submit" color="blue" absolute right>제출</v-btn>
        <!-- 이미지데이터 추가 -->
        <input
          ref="imageInput"
          type="file"
          multiple
          hidden
          @change="onChangeImages"
        />
        <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
        <div>
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <img
              :src="`http://localhost:3085/${p}`"
              :alt="p"
              style="width: 200px"
            />
            <div>
              <button type="button" @click="onRemoveImage(i)">삭제</button>
            </div>
          </div>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hideDetails: true,
      successMessages: "",
      success: false,
      content: "",
      error: false,
      alert: false
    };
  },
  computed: {
    ...mapState("users", ["me"]),
    ...mapState("posts", ["imagePaths"])
  },
  methods: {
    onChangeTextarea(value) {
      if (!value.trim()) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.hideDetails = true;
      this.success = false;
      this.successMessages = "";
    },
    async onSubmitForm() {
      if (!this.content.trim()) {
        alert("게시글 입력해여죠;;");
        return;
      }
      await this.$store
        .dispatch("posts/add", { content: this.content })
        .then(() => {
          this.$store.dispatch("users/loadUser");
          this.content = "";
          this.hideDetails = false;
          this.success = true;
          this.error = false;
          this.successMessages = "게시글 등록을 성공했습니다요";
          // this.$router.push(`/post/${this.$store.state.posts.mainPosts[0].id}`);
        })
        .then(() => {
          return this.$axios
            .post(
              "https://fcm.googleapis.com/fcm/send",
              {
                notification: {
                  title: "글이 작성되었습니다.",
                  body: "어떤 글을 썼을까요?"
                },
                to:
                  "f97h81g9nr9IDcfgd5ZPmG:APA91bEzDLTnRsLT3J8o4H8zAVdL-1zdjc4fkZoBRVKetfba1ke6XYDREXqwSffUUdH5EYjM81KvzY8iVma8w3kF6kACMqEBELJCLDC6l0-yVrnO40DDcaWHjs671uvG26yYhPiZ8eTG"
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "key=AAAAQdqazAE:APA91bEsgOlbL5r3Z2NSItZoYdjJ4lAAz2CIFGZuiFgMrOpv1QcdNYhIse_3naet4_jU1jJlQ59DFzJvlDnFanCE_T8eN7y-UuZ59bN6dFDjV3JuKsnMQyDakc5XYSG1KRt1j2svitpk"
                }
              }
            )
            .then(res => {
              console.log("아아아아아", res);
            });
        });
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f);
        // { image: [file1, file2 ...] } 의 모양이 만들어진다.
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    onRemoveImage(index) {
      this.$store.commit("posts/removeImagePath", index);
    }
  }
};
</script>

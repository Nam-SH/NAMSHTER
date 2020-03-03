<template>
  <v-card class="my-5">
    <v-container>
      <v-form ref="form" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="title"
            :counter="20"
            color="teal"
            label="제목"
            dense
            autofocus
            outlined
          ></v-text-field>
          <client-only>
            <TuiEditor
              mode="markdown"
              v-model="content"
              preview-style="vertical"
              height="300px"
            />
          </client-only>
          <v-btn class="mx-2" absolute right @click.prevent="clear"
            >내용 클리어</v-btn
          >
          <v-btn type="submit" color="blue" absolute right>제출</v-btn>
          <input
            ref="imageInput"
            type="file"
            multiple
            hidden
            @change="onChangeImages"
          />
          <v-btn type="button" @click.prevent="onClickImageUpload"
            >이미지 업로드</v-btn
          >
          <br />
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <div>
              <img
                :src="`${srcAddress}/postimage/${p}`"
                :alt="p"
                style="width: 200px"
              />
            </div>
            <v-btn text type="button" @click.prevent="onRemoveImage(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    onPostForm: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    title: "",
    content: ""
  }),
  methods: {
    clear() {
      this.content = "";
    },
    async onSubmitForm() {
      if (!this.title.trim() || !this.content.trim()) {
        alert("빈 값은 안 돼요;;");
        return;
      }
      if (this.title.length > 20) {
        alert("제목은 20자 이하에요;;");
        return;
      }
      if (this.content.length > 300) {
        alert("내용은 300자 이하에요;;");
        return;
      }
      await this.$store
        .dispatch("groups/add", {
          title: this.title,
          content: this.content,
          groupId: this.$route.params.id
        })
        .then(async () => {
          this.onPostForm();
          this.title = "";
          this.content = "";
        });
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f);
      });
      this.$store.dispatch("groups/uploadImages", imageFormData);
    },
    onRemoveImage(index) {
      this.$store.commit("groups/removeImagePath", index);
    }
  },
  computed: {
    imagePaths() {
      return this.$store.state.groups.imagePaths;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  }
};
</script>

<style scoped></style>

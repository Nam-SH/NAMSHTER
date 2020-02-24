<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 basil--text">회원정보 수정</h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="name in editField" :key="name">{{ name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="name in editField" :key="name">
          <v-card color="basil" flat>
            <v-container>
              <v-form v-if="tab === 3" @submit.prevent="onSubmitForm">
                <v-file-input
                  v-model="files"
                  label="File input"
                  prepend-icon="mdi-camera"
                  @change="onChangeImages"
                ></v-file-input>
                <div>
                  <v-row rows="12" md="2">
                    <v-col cols="12" md="2"></v-col>
                    <v-col cols="12" md="5">변경 전</v-col>
                    <v-col cols="12" md="5">변경 후</v-col>
                    <v-col cols="12" md="2"></v-col>
                  </v-row>
                  <v-row rows="12" md="10">
                    <v-col cols="12" md="2"></v-col>
                    <v-col cols="12" md="5">
                      <v-card width="250px" min-height="250px" max-height="300px" outlined>
                        <img
                          :src="`http://localhost:3085/profile/${defaultSrc}`"
                          style="width: 60%;height: 60%"
                        />
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-card width="250px" min-height="250px" max-height="300px" outlined>
                        <img
                          v-if="imagePaths && imagePaths.length > 0"
                          :src="`http://localhost:3085/profile/${imagePaths}`"
                          :alt="imagePaths"
                          style="width: 60%;height: 60%"
                        />
                      </v-card>
                      <button type="button" @click="onRemoveImage()">삭제</button>
                    </v-col>
                    <v-col cols="12" md="2"></v-col>
                  </v-row>
                </div>
              </v-form>
              <v-form v-else @submit.prevent="onSubmitForm">
                <v-text-field
                  :label="label[tab]"
                  required
                  v-model="inputData"
                  :error="error"
                  :hide-details="hideDetails"
                  @input="onChangeTextarea"
                />
                <v-btn class="mt-5" dark color="blue" type="submit">수정</v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      inputData: "",
      error: false,
      hideDetails: true,
      tab: 0,
      label: [
        "닉네임 변경하고 싶죠?",
        "이름 변경하고 싶죠?",
        "비밀번호 변경하고 싶죠?",
        "프로필사진 바꾸고 싶죠?"
      ],
      editField: ["닉네임", "이름", "비밀번호", "프로필"],
      defaultSrc: null,

      files: []
    };
  },
  created() {
    this.defaultSrc = this.me.src;
  },
  watch: {
    tab(newVal, oldVal) {
      if (newVal || oldVal) {
        this.inputData = "";
        this.files = [];
        this.$store.commit("users/removeImagePath", {});
        this.defaultSrc = this.me.src;
      }
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    imagePaths() {
      return this.$store.state.users.imagePaths;
    }
  },
  methods: {
    onChangeTab(tab) {
      this.inputData = "";
    },
    onChangeTextarea(value) {
      if (!value.trim()) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.hideDetails = true;
    },
    onSubmitForm() {
      if ((this.tab === 0 || 1) && this.inputData.length > 20) {
        alert("최대 20자만 되요;;");
        return;
      } else if (this.tab === 2 && this.inputData.length < 7) {
        alert("비밀번호는 최소 8자에요;;");
        return;
      }
      if (
        (this.tab === 0 && this.inputData === this.me.nickname) ||
        (this.tab === 1 && this.inputData === this.me.name)
      ) {
        alert("안 바꾼거 아님?;;");
        return;
      }
      if (!this.inputData.trim()) {
        alert("빈 칸은 안 돼요;;");
        return;
      }
      if (this.tab == 0) {
        this.$store.dispatch("users/changeNickname", {
          nickname: this.inputData
        });
      } else if (this.tab == 1) {
        this.$store.dispatch("users/changeName", {
          name: this.inputData
        });
      } else {
        this.$store.dispatch("users/changePassword", {
          password: this.inputData
        });
      }
      this.inputData = "";
      this.hideDetails = false;
      this.error = false;
      return alert("변경이 완료되었습니다.");
    },
    async onChangeImages() {
      try {
        const imageFormData = new FormData();
        imageFormData.append("image", this.files);
        await this.$store.dispatch("users/uploadImages", imageFormData);
      } catch (err) {}
    },
    onRemoveImage() {
      this.$store.commit("users/removeImagePath", {});
    }
  }
};
</script>

<style scoped></style>

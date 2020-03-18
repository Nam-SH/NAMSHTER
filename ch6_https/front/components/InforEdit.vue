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
              <!-- 프로필 이미지 부분 -->
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

                    <v-col cols="12" md="5">
                      <v-chip color="error" outlined pill>변경 전</v-chip>
                    </v-col>

                    <v-col cols="12" md="5">
                      <v-chip color="success" outlined pill>변경 후</v-chip>
                    </v-col>
                    <v-col cols="12" md="2"></v-col>
                  </v-row>
                  <v-row rows="12" md="10">
                    <v-col cols="12" md="2"></v-col>
                    <v-col cols="12" md="5">
                      <div class="box">
                        <img :src="`${srcAddress}/profile/${defaultSrc}`" />
                      </div>
                    </v-col>
                    <v-col cols="12" md="5">
                      <div class="box">
                        <img
                          v-if="imagePaths && imagePaths.length > 0"
                          :src="`${srcAddress}/profile/${imagePaths}`"
                        />
                      </div>
                      <button type="button" @click.prevent="onRemoveImage()">삭제</button>
                    </v-col>
                    <v-col cols="12" md="2"></v-col>
                  </v-row>
                </div>
              </v-form>
              <!--  -->
              <v-form v-else-if="tab === 2" @submit.prevent="onSubmitForm">
                <v-text-field
                  v-model="inputData"
                  label="현재 비밀번호"
                  :type="value1 ? 'password' : 'text'"
                  @click:append="() => (value1 = !value1)"
                  :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off'"
                />
                <v-divider></v-divider>
                <v-text-field
                  v-model="password"
                  label="새로운 비밀번호"
                  :error="error"
                  :hide-details="hideDetails"
                  :type="value2 ? 'password' : 'text'"
                  @click:append="() => (value2 = !value2)"
                  :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
                />

                <v-text-field
                  v-model="passwordCheck"
                  label="새로운 비밀번호 확인"
                  :type="value3 ? 'password' : 'text'"
                  @click:append="() => (value3 = !value3)"
                  :append-icon="value3 ? 'mdi-eye' : 'mdi-eye-off'"
                />
                <v-btn class="mt-5" aria-label="mod" dark color="blue" type="submit">수정</v-btn>
              </v-form>
              <!-- 나머지 -->
              <v-form v-else @submit.prevent="onSubmitForm">
                <v-text-field
                  :label="label[tab]"
                  required
                  v-model="inputData"
                  :error="error"
                  :hide-details="hideDetails"
                  @input="onChangeTextarea"
                />
                <v-btn class="mt-5" aria-label="mod" dark color="blue" type="submit">수정</v-btn>
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
      password: "",
      passwordCheck: "",
      value1: true,
      value2: true,
      value3: true,
      error: false,
      hideDetails: true,
      tab: 0,
      label: ["닉네임 변경하고 싶죠?", "이름 변경하고 싶죠?", "", ""],
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
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
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
      if (!this.inputData.trim()) {
        this.$toast.error("빈 칸은 안 돼요;;", { duration: 2000 });
        return;
      }
      if ((this.tab === 0 || 1) && this.inputData.length > 20) {
        this.$toast.error("최대 20자만 되요;;", { duration: 2000 });
        return;
      } else if (this.tab === 2 && this.password.length < 10) {
        this.$toast.error("비밀번호는 최소 10자에요;;", { duration: 2000 });
        return;
      }
      if (
        (this.tab === 0 && this.inputData === this.me.nickname) ||
        (this.tab === 1 && this.inputData === this.me.name)
      ) {
        this.$toast.error("안 바꾼거 아님?;;", { duration: 2000 });
        return;
      }
      if (this.tab === 2 && this.password !== this.passwordCheck) {
        this.$toast.error("비밀번호가 다른데여;;", { duration: 2000 });
        return;
      }

      if (this.tab == 0) {
        this.$store
          .dispatch("users/changeNickname", {
            nickname: this.inputData
          })
          .then(res => {
            this.inputData = "";
            this.hideDetails = false;
            this.error = false;
          });
      } else if (this.tab == 1) {
        this.$store
          .dispatch("users/changeName", {
            name: this.inputData
          })
          .then(res => {
            this.inputData = "";
            this.hideDetails = false;
            this.error = false;
          });
      } else {
        this.$store
          .dispatch("users/changePassword", {
            oldPassword: this.inputData,
            newPassword: this.password
          })
          .then(res => {
            this.inputData = "";
            this.hideDetails = false;
            this.error = false;
          });
      }
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

<style scoped>
div.box {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline-style: groove;
}
div.box > img {
  max-width: 90%;
  max-height: 90%;
}
</style>

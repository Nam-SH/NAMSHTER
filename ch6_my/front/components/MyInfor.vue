<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 basil--text">회원정보 수정</h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="name in editField" :key="name">
          {{ name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="name in editField" :key="name">
          <v-card color="basil" flat>
            <v-container>
              <v-form @submit.prevent="onSubmitForm">
                <v-text-field
                  :label="label[tab]"
                  required
                  v-model="inputData"
                  :error="error"
                  :hide-details="hideDetails"
                  :success-messages="successMessages"
                  :success="success"
                  @input="onChangeTextarea"
                />
                <br />
                <v-btn dark color="blue" type="submit">수정</v-btn>
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
      successMessages: "",
      success: false,
      tab: null,
      label: [
        "닉네임 변경하고 싶죠?",
        "이름 변경하고 싶죠?",
        "비밀번호 변경하고 싶죠?"
      ],
      editField: ["닉네임", "이름", "비밀번호"]
    };
  },
  watch: {
    tab(newVal, oldVal) {
      if (newVal || oldVal) {
        this.inputData = "";
      }
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
      // this.success = false;
      // this.successMessages = "";
    },
    onSubmitForm() {
      if (this.tab === 0 && this.inputData.length < 7) {
        alert("비밀번호는 최소 8자에요;;");
        return;
      }
      if (this.tab === 1 || (2 && this.inputData.length > 20)) {
        alert("최대 20자만 되요;;");
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
      // this.success = true;
      // this.successMessages = "변경을 성공했습니다요";
    }
  }
};
</script>

<style scoped></style>

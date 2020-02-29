<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <v-form v-model="valid" @submit.prevent="onSubmitForm">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field v-model="email" label="Email" value="dog@dog.com" :rules="emailRules"></v-text-field>
              <p class="caption grey--text text--darken-1">가입하신 이메일을 입력하시오.</p>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <div class="pa-4 text-center">
              <template v-if="loggingInUser">
                <v-img
                  class="mb-4"
                  contain
                  height="70"
                  :src="`${srcAddress}/profile/${loggingInUser.src}`"
                ></v-img>
                <span>{{ loggingInUser.nickname }}</span>
              </template>
              <template v-else>
                <v-img class="mb-4" contain height="80" :src="`${srcAddress}/profile/donut.png`"></v-img>
                <span>anonymous</span>
              </template>
            </div>
            <v-card-text>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
              ></v-text-field>
              <p class="caption grey--text text--darken-1">비밀번호를 입력하시오.</p>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-container>
          <p>
            아직 회원이 아니세요?
            <router-link to="/signup">
              <span>회원가입 하러가기</span>
            </router-link>
          </p>
          <hr class="my-3" style="border: solid 1px black;" />
          <a :href="`${srcAddress}/user/naver`" style="text-decoration: none">
            <div class="main">
              <div class="main_img_naver">
                <p class="content" style="color:white">N</p>
              </div>
              <div class="main_naver">
                <p class="content" style="color:white">NAVER</p>
              </div>
            </div>
          </a>
          <a class :href="`${srcAddress}/user/kakao`" style="text-decoration: none">
            <div class="main mt-2">
              <div class="main_img_kakao">
                <p class="content" style="color:black">K</p>
              </div>
              <div class="main_kakao">
                <p class="content" style="color:black">KAKAO</p>
              </div>
            </div>
          </a>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="step--">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :hidden="step === 2"
            :disabled="!valid"
            color="primary"
            @click="step++;onLoggingInUser()"
          >Next</v-btn>
          <v-btn v-if="step === 2" :disabled="!valid" color="yellow" type="submit">로그인</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      valid: false,
      step: 1,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "빈칸은 ㄴㄴ임",
        v => /.+@.+\..+/.test(v) || "이메일이 아닌 거 같은데여;;"
      ],
      passwordRules: [
        v => !!v || "빈칸은 ㄴㄴ임",
        v => (v && v.length >= 10) || "비밀번호는 최소 10자에여;;"
      ],
      result: "",
      error: ""
    };
  },
  methods: {
    onSubmitForm() {
      this.$store
        .dispatch("users/logIn", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ path: "/" });
          this.email = "";
          this.password = "";
        })
        .catch(err => {
          console.error(err);
          alert("회원가입 실패!!");
        });
    },
    async onLoggingInUser() {
      await this.$store.dispatch("users/loggingInUser", {
        userEmail: encodeURIComponent(this.email)
      });
    }
  },
  computed: {
    ...mapState("users", ["me"]),
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "로그인";
        case 2:
          return "비밀번호";
        default:
          return "로그인";
      }
    },
    loggingInUser() {
      return this.$store.state.users.loggingInUser;
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 50px;
}
.main_img_kakao {
  display: inline-table;
  float: left;
  width: 20%;
  height: 100%;
  background-color: yellow;
  border: 1px solid black;
  font-size: 20px;
}
.main_kakao {
  display: inline-table;
  float: left;
  width: 80%;
  height: 100%;
  background-color: yellow;
  border: 1px solid black;
  font-size: 20px;
}
.main_img_naver {
  display: inline-table;
  float: left;
  width: 20%;
  height: 100%;
  background-color: #1ec800;
  border: 1px solid black;
  font-size: 20px;
}
.main_naver {
  display: inline-table;
  float: left;
  width: 80%;
  height: 100%;
  background-color: #1ec800;
  border: 1px solid black;
  font-size: 20px;
}
.content {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>

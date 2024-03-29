<template>
  <v-container>
    <v-card class="mx-auto" max-width="500px">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>NAMSHTER</span>
        <v-chip class="ma-2" color="secondary">{{ stepName }}</v-chip>
      </v-card-title>
      <v-window v-model="step">
        <v-form v-model="valid" @submit.prevent="valid && step++">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                v-model="email"
                hideDetails
                label="Email"
                value="dog@dog.com"
                :rules="emailRules"
              ></v-text-field>
              <p class="caption grey--text text--darken-1">가입하신 이메일을 입력하시오.</p>
            </v-card-text>
          </v-window-item>
        </v-form>
        <v-form v-model="valid" @submit.prevent="onSubmitForm">
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
          <button ref="submitBtn" hidden :disabled="step===1" type="submit"></button>
        </v-form>
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
        <v-btn aria-label="back" text @click.prevent="step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="next"
          :hidden="step === 2"
          :disabled="!valid"
          color="primary"
          @keyup.enter="step++"
          @click.prevent="step++;onLoggingInUser()"
        >Next</v-btn>
        <v-btn
          aria-label="login"
          v-if="step === 2"
          :disabled="!valid"
          color="yellow"
          @click="onBtn"
        >로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "main",
  data() {
    return {
      valid: false,
      step: 1,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "이메일은 필수인데여;;",
        v => (v && /.+@.+\..+/.test(v)) || "이메일이 아닌 거 같은데여;;"
      ],
      passwordRules: [
        v => !!v || "비밀번호는 필수인데여;;",
        v => (v && v.length >= 10) || "비밀번호는 최소 10자에여;;"
      ]
    };
  },
  methods: {
    onSubmitForm() {
      this.$store.dispatch("users/logIn", {
        email: this.email,
        password: this.password
      });
    },
    async onLoggingInUser() {
      await this.$store.dispatch("users/loggingInUser", {
        userEmail: encodeURIComponent(this.email)
      });
    },
    onBtn() {
      this.$refs.submitBtn.click();
    }
  },
  computed: {
    ...mapState("users", ["me"]),
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    },
    stepName() {
      switch (this.step) {
        case 1:
          return "이메일";
        case 2:
          return "비밀번호";
        default:
          return "로그인";
      }
    },
    loggingInUser() {
      return this.$store.state.users.loggingInUser;
    },
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    me(value, oldValue) {
      if (value) {
        this.$router.push({
          path: "/"
        });
      }
    }
  },
  middleware: "anonymous"
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 40px;
}
.main_img_kakao {
  display: inline-table;
  float: left;
  width: 20%;
  height: 100%;
  background-color: yellow;
  font-size: 20px;
}
.main_kakao {
  display: inline-table;
  float: left;
  width: 80%;
  height: 100%;
  background-color: yellow;
  font-size: 20px;
}
.main_img_naver {
  display: inline-table;
  float: left;
  width: 20%;
  height: 100%;
  background-color: #1ec800;
  font-size: 20px;
}
.main_naver {
  display: inline-table;
  float: left;
  width: 80%;
  height: 100%;
  background-color: #1ec800;
  font-size: 20px;
}
.content {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>

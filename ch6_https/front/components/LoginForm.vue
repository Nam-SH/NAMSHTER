<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field label="이메일" type="email" required v-model="email" :rules="emailRules" />
          <v-text-field
            label="비밀번호"
            type="password"
            required
            v-model="password"
            :rules="passwordRules"
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
    <v-card>
      <hr />
      <h3>로컬용</h3>
      <div class="mx-auto">
        <a style="inline-block" :href="`${srcAddress}/user/naver`">
          <img class="mt-1" src="../static/naver.png" alt style="width:200px;height:50px" />
        </a>
        <a :href="`${srcAddress}/user/kakao`">
          <img class="mt-1" src="../static/kakao.png" alt style="width:200px;height:50px" />
        </a>
      </div>
      <hr />
      <!-- <h3>배포용</h3>
      <div class="mx-auto">
        <a href="https://api.namshter.com/user/naver">
          <img class="mx-auto mt-1" src="@/static/naver.png" alt style="width:200px;height:50px" />
        </a>
        <a href="https://api.namshter.com/user/kakao">
          <img class="mx-auto mt-1" src="@/static/kakao.png" alt style="width:200px;height:50px" />
        </a>
      </div>-->
    </v-card>
  </v-container>
  <!-- 로그인 후 -->
  <v-container v-else>
    <v-card>
      <v-container>
        <v-row class="mx-3">
          <v-tooltip right color="rgba(255, 255, 255, 0)">
            <template v-slot:activator="{ on }">
              <i v-if="me.isAdmin" class="fas fa-user-lock" v-on="on"></i>
              <v-avatar v-if="social" :color="socialColor" size="25" v-on="on">
                <span class="black--text" style="font-size:20px">{{ socialName }}</span>
              </v-avatar>
              <span v-on="on">{{ me.nickname }}({{ me.name }})</span>
            </template>
            <!-- :src="`http://localhost:3085/profile/${me.src}`" -->
            <v-img
              :src="`${srcAddress}/profile/${me.src}`"
              min-height="200px"
              max-height="300px"
              width="200px"
            ></v-img>
          </v-tooltip>로그인이 되었습니다.
          <v-btn to="/qrcode">
            <i class="fas fa-camera ml-auto"></i>
          </v-btn>
        </v-row>
        <hr class="my-2" />
        <v-btn class="mb-3" @click="onLogOut">로그아웃</v-btn>
        <!-- 내 글 통계 -->
        <user-activity :user="me" />
        <!--  -->
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import UserActivity from "@/components/UserActivity.vue";

export default {
  components: {
    UserActivity
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "이메일이 아닌 거 같은데여;;"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 10) || "비밀번호는 최소 10자에여;;"
      ],
      socialName: "",
      socialColor: "",
      //
      result: "",
      error: ""
    };
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/logIn", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({ path: "/" });
          })
          .catch(err => {
            console.log(err);
            alert("회원가입 실패!!");
          });
      }
    },
    onLogOut() {
      this.$store.dispatch("users/logOut");
      this.email = "";
      this.password = "";
    }
  },
  computed: {
    ...mapState("users", ["me"]),
    social() {
      if (this.me && this.me.snsId && this.me.provider) {
        if (this.me.provider === "kakao") {
          return (this.socialName = "K"), (this.socialColor = "yellow");
        }
        return (this.socialName = "N"), (this.socialColor = "green");
      }
      return false;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://www.api.namshter.com"
        : "http://localhost:3085";
    }
  }
};
</script>

<style scoped></style>

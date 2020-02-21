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
      {{ $moment("2020-02-21T07:17:01.963Z").format('YY/MM/DD') }}
      <hr />
      <h3>로컬용</h3>
      <div class="mx-auto">
        <a style="inline-block" href="http://localhost:3085/user/naver">
          <img class="mt-1" src="../static/naver.png" alt style="width:200px;height:50px" />
        </a>
        <a href="http://localhost:3085/user/kakao">
          <img class="mt-1" src="../static/kakao.png" alt style="width:200px;height:50px" />
        </a>
      </div>
      <hr />
      <h3>배포용</h3>
      <div class="mx-auto">
        <a href="http://api.namshter.com/user/naver">
          <img class="mx-auto mt-1" src="@/static/naver.png" alt style="width:200px;height:50px" />
        </a>
        <a href="http://api.namshter.com/user/kakao">
          <img class="mx-auto mt-1" src="@/static/kakao.png" alt style="width:200px;height:50px" />
        </a>
      </div>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        <i v-if="me.isAdmin" class="fas fa-user-lock"></i>
        <v-avatar v-if="social" :color="socialColor" size="25">
          <span class="black--text" style="font-size:20px">{{ socialName }}</span>
        </v-avatar>
        <br />
        <span>{{ me.nickname }}({{ me.name }}) 로그인이 되었습니다.</span>
        <hr />
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <!-- 내 글 통계 -->
        <my-activity :me="me" />
        <!--  -->
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import MyActivity from "@/components/MyActivity.vue";

export default {
  components: {
    MyActivity
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
      socialColor: ""
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
    }
  }
};
</script>

<style scoped>
</style>
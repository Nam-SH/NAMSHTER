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
    <div class="text-align: center">
      <div class="ma-2" style="position: relative; left: 25%">
        <a href="http://localhost:3085/user/naver">
          <img src="../static/naver.png" alt style="width:50%" />
        </a>
      </div>
      <div class="ma-2" style="position: relative;left: 25%">
        <a href="http://localhost:3085/user/kakao">
          <img src="../static/kakao.png" alt style="width:50%" />
        </a>
      </div>
    </div>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        <i v-if="me.isAdmin" class="fas fa-user-lock"></i>
        <v-avatar v-if="social" :color="socialColor" size="25">
          <span class="black--text" style="font-size:20px">{{ socialName }}</span>
        </v-avatar>
        <span>{{ me.nickname }}({{ me.name }}) 로그인이 되었습니다.</span>
        <hr />
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <v-row>
          <v-col col="6">{{ me.Followings.length }}명을 팔로잉...</v-col>
          <v-col col="6">{{ me.Followers.length }}명이 나를 팔로워...</v-col>
        </v-row>
        <v-row>
          <v-col col="6">{{ me.Posts.length }}개의 글을 작성함...</v-col>
          <v-col col="6">{{ me.Groupjoined.length }}개의 그룹을 가입함...</v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
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

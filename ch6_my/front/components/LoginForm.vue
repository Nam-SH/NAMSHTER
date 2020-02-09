<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            label="이메일"
            type="email"
            required
            v-model="email"
            :rules="emailRules"
          />
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
      <div class="ma-2" style="position: relative; left: 10%;">
        <a href="http://localhost:3085/user/naver">
          <img src="../static/naver.png" alt="" style="width:80%;height:60px" />
        </a>
      </div>
      <div class="ma-2" style="position: relative; left: 10%;">
        <a href="http://localhost:3085/user/kakao">
          <img src="../static/kakao.png" alt="" style="width:80%;height:60px" />
        </a>
      </div>
      <div class="ma-2" style="position: relative; left: 10%;">
        <a href="/">
          <img src="../static/kakao.png" alt="" style="width:80%;height:60px" />
        </a>
      </div>
    </div>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        <i v-if="me.isAdmin" class="fas fa-user-lock"></i>
        <i v-if="me.isAdmin" class="fas fa-user-lock"></i>
        {{ me }}
        {{ me.nickname }}({{ me.name }}) 로그인이 되었습니다.
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <v-row>
          <v-col col="4">{{ me.Followings.length }}명을 팔로잉...</v-col>
          <v-col col="4">{{ me.Followers.length }}명이 나를 팔로워...</v-col>
          <v-col col="4">{{ me.Posts.length }}개의 글을 작성함...</v-col>
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
      ]
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
    ...mapState("users", ["me"])
  }
};
</script>

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
          <v-btn 
            color="green" 
            type="submit"
            :disabled="!valid"
            >로그인
          </v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>

  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }} 로그인이 되었습니다.
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

  export default {  
    data() {
      return {
        valid: false,

        email: "",
        password: "",

        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 10) || '비밀번호는 최소 10자 입니다.',
        ]
      }
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({
            path: '/',
          });
          })
          .catch((err) => {
            console.log(err)
            alert('회원가입 실패!!')
          })
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut')
        this.email = '';
        this.password = '';
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
  }
</script>
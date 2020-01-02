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
      {{ me.nickname }} 로그인이 되었습니다.
      <v-btn @click="onLogOut">로그아웃</v-btn>
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
        ],
      }
    },
    methods: {
      // onSubmitForm() {
      //   if (this.$refs.form.validate()) {
      //     console.log(this.valid)
      //     alert("로그인 시도!")
      //   } else {
      //     alert("폼이 유효하지 않습니다.")
      //   }
      // },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            nickname: '가짜 닉네임'
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
        this.$store.dispatch('users/logOut');
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
  }
</script>
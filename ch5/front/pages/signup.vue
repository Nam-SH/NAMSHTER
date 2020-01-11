<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>회원가입</v-subheader>
        <v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field 
              label="닉네임" 
              type="nickname" 
              required 
              v-model="nickname"
              :rules="nicknameRules"
              :counter="10"
            />
            <v-text-field 
              label="이메일" 
              type="email" 
              required 
              v-model="email"
              :rules="emailRules"
            />
            <v-text-field 
              label="비밀번호" 
              :type="value1 ? 'password' : 'text'"
              @click:append="() => (value1 = !value1)"
              :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off'"
              required 
              v-model="password"
              :rules="passwordRules"
            />
            <v-text-field 
              label="비밀번호 확인" 
              :type="value2 ? 'password' : 'text'"
              @click:append="() => (value2 = !value2)"
              :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
              required 
              v-model="passwordCheck"
              :rules="passwordCheckRules"
            />
            <v-checkbox 
              label="남승현 말을 잘 들을 것을 약속합니다." 
              required 
              v-model="terms1"
              :rules="[v => !!v || 'You must agree to continue!']"
            />
            <v-checkbox 
              label="남승현 말을 정말로 잘 들을 것을 약속합니다." 
              required 
              v-model="terms2"
              :rules="[v => !!v || 'You must agree to continue!']"
            />
            <v-btn
              :disabled="!valid"
              color="blue"
              class="mr-4"
            >유효성 검증
            </v-btn>
            <v-btn colot="green" type="submit">가입완료</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms1: false,
        terms2: false,

        emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+\..+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        nicknameRules: [
        v => !!v || '닉네임은 필수입니다.',
        v => v.length <= 10 || '닉네임의 길이는 10자 이하입니다.',
        ],
        passwordRules: [
        v => !!v || '비밀번호는 필수입니다.',
        v => (v && v.length >= 10) || '비밀번호는 최소 10자 입니다.',
        ],
        passwordCheckRules: [
        v => !!v || '비밀번호 확인은 필수입니다.',
        v => v === this.password || '비밀번호가 일치하지 않습니다.'
        ],
        value1: true,
        value2: true,
      }
    },
    
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    watch: {
      me(value, oldValue) {
        if (value) {
          this.$router.push({
            path: '/'
          })
        }
      }
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            email: this.email,
            nickname: this.nickname,
            password: this.password
          })
        }
      },
    },
    head() {
      return {
        title: '회원가입'
      }
    },
    middleware: 'anonymous'
  }
</script>
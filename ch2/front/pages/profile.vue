<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>내 프로필</v-subheader>    
        <v-form v-model="valid" @submit.prevent="onChangeNickname">
          <v-text-field 
            label="닉네임" 
            required 
            v-model="nickname"
            :rules="nicknameRules"
            />
          <v-btn color="blue" type="submit">수정</v-btn>
        </v-form>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import FollowList from '~/components/FollowList'

  export default {
    components: {
      FollowList,
    },
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력하시옵소서'
        ]
      }
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
        .then(() => {
          this.nickname = ''
        })
      }
    },
    head() {
      return {
        title: '프로필'
      }
    }
  }
</script>
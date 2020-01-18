<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>    
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field 
              label="닉네임" 
              required 
              v-model="nickname"
              :rules="nicknameRules"
            />
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :others="followingList" :remove="unfollow" />
          <v-btn @click="loadFollowings" v-if="hasMoreFollowing" color="blue" style="width: 100%">더보기</v-btn>
          <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :others="followerList" :remove="unfollower" />
          <v-btn @click="loadFollowers" v-if="hasMoreFollower" color="blue" style="width: 100%">더보기</v-btn>
          <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
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

    computed: {
      followerList() {
        return this.$store.state.users.followerList;
      },
      followingList() {
        return this.$store.state.users.followingList;
      },
      hasMoreFollowing() {
        return this.$store.state.users.hasMoreFollowing;
      },
      hasMoreFollower() {
        return this.$store.state.users.hasMoreFollower;
      }
    },
    
    fetch({ store }) {
      return Promise.all([
        console.log('profile, fetch 들어가요~~'),
        store.dispatch('users/loadFollowers', { offset: 0 }),
        store.dispatch('users/loadFollowings', { offset: 0 })
      ])
    },

    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
        .then(() => {
          this.nickname = ''
        })
        .catch((err) => {
          console.error('onChangeNickname :::', err)
        })
      },
      
      unfollower(otherId) {
        this.$store.dispatch('users/unfollower', { otherId })
      },
      unfollow(otherId) {
        this.$store.dispatch('users/unfollow', { otherId })
      },
      loadFollowers() {
        this.$store.dispatch('users/loadFollowers')
      },
      loadFollowings() {
        this.$store.dispatch('users/loadFollowings')
      },
    },
    head() {
      return {
        title: '프로필'
      }
    },
    middleware: 'authenticated'
  }
</script>
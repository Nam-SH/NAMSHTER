<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form @submit.prevent="onSubmitForm">
            <v-text-field
              label="닉네임 변경하고 싶죠?"
              required
              v-model="nickname"
              :error="error"
              :hide-details="hideDetails"
              :success-messages="successMessages"
              :success="success"
              @input="onChangeTextarea"
            />
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card>
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn
            @click="loadFollowings"
            v-if="hasMoreFollowing"
            color="blue"
            style="width: 100%"
          >더 보기</v-btn>
          <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn @click="loadFollowers" v-if="hasMoreFollower" color="blue" style="width: 100%">더 보기</v-btn>
          <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";

export default {
  components: {
    FollowList
  },
  data() {
    return {
      nickname: "",
      error: false,
      hideDetails: true,
      successMessages: "",
      success: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
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
      store.dispatch("users/loadFollowings", { reset: true }),
      store.dispatch("users/loadFollowers", { reset: true })
    ]);
  },
  watch: {
    me(value, oldValue) {
      if (!value) {
        this.$router.push({
          path: "/"
        });
      }
    }
  },
  methods: {
    onChangeTextarea(value) {
      if (!value.trim()) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.hideDetails = true;
      this.success = false;
      this.successMessages = "";
    },
    onSubmitForm() {
      if (!this.nickname.trim()) {
        alert("변경하려면 닉네임을 입력해야죠;;");
        return;
      }
      this.$store
        .dispatch("users/changeNickname", {
          nickname: this.nickname
        })
        .then(() => {
          this.nickname = "";
          this.hideDetails = false;
          this.success = true;
          this.error = false;
          this.successMessages = "게시글 등록을 성공했습니다요";
        });
    },

    removeFollower(userId) {
      this.$store.dispatch("users/unfollower", { userId });
    },
    removeFollowing(userId) {
      this.$store.dispatch("users/unfollow", { userId });
    },
    loadFollowers() {
      this.$store.dispatch("users/loadFollowers", { reset: false });
    },
    loadFollowings() {
      this.$store.dispatch("users/loadFollowings", { offset: 0 });
    }
  },
  head() {
    return {
      title: "프로필"
    };
  },
  middleware: "authenticated"
};
</script>

<template>
  <v-container>
    <!-- 1. 내 정보 수정하기 -->
    <my-infor />

    <!-- 2. 그래프 보여주기 -->
    <v-container>
      <v-btn v-if="calcPost.length > 0" text color="green">내가 이번 주에 쓴 글 상태네요!</v-btn>
      <v-btn v-else @click="howManyPost">나의 상태는?</v-btn>
      <v-card>
        <v-container>
          <v-sparkline
            line-width="2"
            padding="8"
            smooth="10"
            :gradient="gradient"
            :value=" calcPost.length > 0 ? calcPost : calcPostList"
            :labels="labels"
            auto-draw
          />
          <v-divider />
        </v-container>
      </v-card>
    </v-container>

    <!-- 3. 팔로잉, 팔로워 조회하기 -->
    <v-card>
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list :users="followingList" :remove="removeFollowing" />
        <v-btn @click="loadFollowings" v-if="hasMoreFollowing" color="blue" style="width: 100%">더 보기</v-btn>
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
</template>

<script>
import FollowList from "~/components/FollowList";
import MyInfor from "@/components/MyInfor.vue";

export default {
  components: {
    FollowList,
    MyInfor
  },
  data() {
    return {
      // 내가 작성한 이번 주 작성한 글
      gradient: ["blue", "red", "pink"],
      labels: ["월", "화", "수", "목", "금", "토", "일"],
      calcPostList: [2, 6, 3, 1, 7, 4, 2]
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
    },
    calcPost() {
      return this.$store.state.posts.calcPost;
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
    },
    howManyPost() {
      this.$store.dispatch("posts/thisWeekPost");
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

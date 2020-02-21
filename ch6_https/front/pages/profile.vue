<template>
  <v-container>
    <!-- 1. 내 정보 수정하기 -->
    <my-infor />

    <!-- 2. 그래프 보여주기 -->
    <v-container>
      <v-btn
        v-model="isMyPostCalc"
        @click="onGetMyPost"
        :text="isMyPostCalc"
        :color="isMyPostCalc ? 'blue' : 'yellow'"
        >{{ myGraphContent }}
      </v-btn>

      <v-card>
        <v-container>
          <v-sparkline
            line-width="2"
            padding="8"
            smooth="10"
            :gradient="gradient"
            :value="isMyPostCalc ? calcPost : fakeCalcPost"
            auto-draw
            :labels="isMyPostCalc ? labels : fakeLabels"
            label-size="3"
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
        <v-btn
          @click="loadFollowings"
          v-if="hasMoreFollowing"
          color="blue"
          style="width: 100%"
          >더 보기</v-btn
        >
        <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
      </v-container>
    </v-card>
    <v-card>
      <v-container>
        <v-subheader>팔로워</v-subheader>
        <follow-list :users="followerList" :remove="removeFollower" />
        <v-btn
          @click="loadFollowers"
          v-if="hasMoreFollower"
          color="blue"
          style="width: 100%"
          >더 보기</v-btn
        >
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
      gradient: ["blue", "red", "pink", "skyblue"],
      labels: new Array(30),

      fakeLabels: new Array(30),
      fakeCalcPost: new Array(30),
      isMyPostCalc: false
    };
  },
  created() {
    this.labels = new Array(this.calcPost.length);
    for (let i = 0; i <= this.calcPost.length; i++) {
      this.labels[i] = i + 1 + "일";
    }
    for (let i = 0; i < 30; i++) {
      this.fakeCalcPost[i] = this.getRandomInt(5, 30);
      this.fakeLabels[i] = i + 1 + "일";
    }
  },
  computed: {
    myGraphContent() {
      return this.isMyPostCalc
        ? "내가 이번 주에 쓴 글 상태네요!"
        : "나의 상태 보기!!";
    },
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
      store.dispatch("users/loadFollowers", { reset: true }),
      store.dispatch("posts/thisWeekPost")
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
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
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
    },
    onGetMyPost() {
      this.isMyPostCalc = !this.isMyPostCalc;
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

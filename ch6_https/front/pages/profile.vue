<template>
  <v-container>
    <!-- 1. 내 정보 수정하기 -->
    <infor-edit />

    <!-- 2. 내 출첵 히트맵 보여주기 -->
    <v-container>
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-1 basil--text">출석률</h1>
        </v-card-title>
        <v-container>
          <div class="main">
            <div class="main2">
              <div v-for="i in 32" :key="i" class="main3">{{ i == 1 ? '구분' : i - 1 }}</div>
            </div>
            <div v-for="j in 12" :key="j" class="main2">
              <div
                v-for="i in 32"
                :key="i"
                class="main3"
                :style="{background: i == 1 ? 'yellow' : dailyData[j][i - 1] == 1 ? 'gray' : 'white'}"
              >{{ i == 1 ? `${j}월`: '' }}</div>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-container>

    <!-- 3. 그래프 보여주기 -->
    <v-container>
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-1 basil--text">글쓰기 상태</h1>
        </v-card-title>
        <v-container>
          <v-btn
            v-model="isMyPostCalc"
            @click.prevent="onGetMyPost"
            :text="isMyPostCalc"
            :color="isMyPostCalc ? 'blue' : 'yellow'"
          >{{ myGraphContent }}</v-btn>
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
      </v-card>
    </v-container>

    <!-- 4. 팔로잉, 팔로워 조회하기 -->
    <v-container>
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-1 basil--text">나의 팔로우 팔로워</h1>
        </v-card-title>
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
            <v-btn
              @click="loadFollowers"
              v-if="hasMoreFollower"
              color="blue"
              style="width: 100%"
            >더 보기</v-btn>
            <v-btn v-else disabled style="width: 100%">더 보기</v-btn>
          </v-container>
        </v-card>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import FollowList from "~/components/FollowList";
import InforEdit from "@/components/InforEdit.vue";

export default {
  components: {
    FollowList,
    InforEdit
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
        ? "내가 이번 달에 쓴 글 상태네요!"
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
    },
    dailyData() {
      return this.$store.state.users.dailyData;
    }
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch("users/loadFollowings", { reset: true }),
      store.dispatch("users/loadFollowers", { reset: true }),
      store.dispatch("posts/thisWeekPost"),
      store.dispatch("users/dailyCheck")
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
      this.$store.dispatch("users/loadFollowings", { reset: false });
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

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.main2 {
  display: flex;
  width: 100%;
  height: 30px;
  background: yellow;
  text-align: center;
  font-size: 8px;
}
.main3 {
  flex: 1;
  border: 1px solid black;
  font-size: 8px;
  /* background: green; */
}
.main4 {
  flex: 1;
  border: 1px solid black;
  font-size: 8px;
  /* background: green; */
}
</style>
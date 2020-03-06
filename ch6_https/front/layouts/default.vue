<template>
  <v-app style="background-color:#E5EFF8">
    <nav>
      <v-toolbar dark src="https://source.unsplash.com/random" shrink-on-scroll prominent>
        <v-toolbar-title>
          <nuxt-link to="/" style="color: black">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="font-weight-black font-weight-bold"
                  rounded
                  color="blue"
                  x-large
                  v-on="on"
                >NAMSHTER</v-btn>
              </template>
              <span>메인으로</span>
            </v-tooltip>
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip right color="white">
          <template v-slot:activator="{ on }">
            <div class="my-auto ml-5" id="clock" v-on="on">
              <span class="time">{{ time }}</span>
            </div>
          </template>
          <span class="time" style="color:black">{{ date }}</span>
        </v-tooltip>
        <v-spacer />
        <v-toolbar-items mt-5>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" />
            </div>
          </v-form>
          <v-tooltip top v-if="!me">
            <template v-slot:activator="{ on }">
              <v-btn text to="/signup" :style="{ display: 'flex', alignItems: 'center' }" v-on="on">
                <div>회원가입</div>
              </v-btn>
            </template>
            <span>회원가입해요</span>
          </v-tooltip>
          <v-tooltip top v-if="me">
            <template v-slot:activator="{ on }">
              <v-btn
                text
                to="/profile"
                :style="{ display: 'flex', alignItems: 'center' }"
                v-on="on"
              >
                <div>프로필</div>
              </v-btn>
            </template>
            <span>프로필보기</span>
          </v-tooltip>
          <v-tooltip top v-if="me">
            <template v-slot:activator="{ on }">
              <v-btn text to="/groups" :style="{ display: 'flex', alignItems: 'center' }" v-on="on">
                <div>그룹</div>
              </v-btn>
            </template>
            <span>놀러가요</span>
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <!-- 오른쪽 화면 -->
    <v-row v-if="me" no-gutters>
      <v-col cols="12" md="4">
        <login-card />
        <group-go />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
    <v-row v-else>
      <nuxt />
    </v-row>
  </v-app>
</template>

<script>
import LoginCard from "~/components/LoginCard";
import GroupGo from "@/components/GroupGo.vue";

export default {
  components: {
    LoginCard,
    GroupGo
  },
  data() {
    return {
      hashtag: "",
      time: "",
      date: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    onSearchHashtag() {
      if (this.hashtag.trim().length < 1) {
        return;
      }
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`
      }),
        (this.hashtag = "");
    },
    updateTime() {
      const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2) +
        (this.zeroPadding(cd.getHours(), 2) < 12 ? " am" : " pm");

      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic|Noto+Sans+KR|Open+Sans&display=swap");

a {
  display: inline-block;
  text-decoration: none;
}
#clock {
  font-family: "Share Tech Mono", monospace;
  color: orchid;
  color: whitesmoke;
  text-shadow: 0 0 20px red, 0 0 20px rgba(10, 175, 230, 0);
}
.time {
  letter-spacing: 0.05em;
  font-size: 30px;
}
</style>

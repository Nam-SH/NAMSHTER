<template>
  <div>
    <nav>
      <v-toolbar dark src="https://source.unsplash.com/random" shrink-on-scroll prominent>
        <v-toolbar-title>
          <nuxt-link to="/" style="color: black">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="font-weight-black font-weight-bold"
                  aria-label="home"
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
        <v-tooltip right color="rgba(255, 255, 255, 0.4)">
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
          <v-tooltip top v-if="me">
            <template v-slot:activator="{ on }">
              <v-btn
                aria-label="myroom"
                text
                to="/profile"
                :style="{ display: 'flex', alignItems: 'center' }"
                v-on="on"
              >
                <div>마이룸</div>
              </v-btn>
            </template>
            <span>내 정보 보기</span>
          </v-tooltip>
          <v-tooltip top v-if="me">
            <template v-slot:activator="{ on }">
              <v-btn
                aria-label="blog"
                text
                to="/blog"
                :style="{ display: 'flex', alignItems: 'center' }"
                v-on="on"
              >
                <div>블로그</div>
              </v-btn>
            </template>
            <span>블로그 가기</span>
          </v-tooltip>
          <v-tooltip top v-if="me">
            <template v-slot:activator="{ on }">
              <v-btn
                aria-label="group"
                text
                to="/groups"
                :style="{ display: 'flex', alignItems: 'center' }"
                v-on="on"
              >
                <div>그룹</div>
              </v-btn>
            </template>
            <span>놀러가요</span>
          </v-tooltip>
        </v-toolbar-items>
        <!--  -->
        <!--  -->
        <!--  -->
      </v-toolbar>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hashtag: "",
      time: "",
      time2: "",
      date: ""
    };
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
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

      this.time2 =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2);

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
  font-size: 2em;
}
</style>

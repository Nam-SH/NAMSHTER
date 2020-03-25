<template>
  <v-container
    v-if="me"
    style="background-color:black;background-image: url('https://source.unsplash.com/randoms');height:60px"
  >
    <v-row class="mx-3">
      <div class="my-auto">
        <nuxt-link to="/" style="color: black">
          <span style="color:blue">
            <i class="fas fa-home"></i>
          </span>
        </nuxt-link>
      </div>
      <v-spacer />
      <div class="my-auto">
        <div class="my-auto ml-5" id="clock">
          <span>{{ time }}</span>
        </div>
      </div>
      <v-spacer />
      <v-sheet class="my-auto overflow-hidden" style="position: relative;">
        <v-row>
          <v-btn aria-label="drawer" color="rgba(0, 0, 0, 1)" dark @click.stop="drawer = !drawer">
            <i class="fas fa-bars"></i>
          </v-btn>
        </v-row>
      </v-sheet>
      <v-navigation-drawer v-model="drawer" absolute temporary right>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="`${srcAddress}/profile/${me.src}`"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ me.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-container>
            <v-form @submit.prevent="onSearchHashtag">
              <div
                :style="{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center'
                }"
              >
                <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" />
              </div>
            </v-form>
          </v-container>
          <v-container>
            <v-btn aria-label="home" text block color="blue">
              <i class="fas fa-home"></i>
              <span>NAMSHTER</span>
            </v-btn>
          </v-container>
          <v-container>
            <v-btn aria-label="myroom" text to="/profile" block>
              <div>마이룸</div>
            </v-btn>
          </v-container>
          <v-container>
            <v-btn aria-label="blog" text to="/blog" block>
              <div>블로그</div>
            </v-btn>
          </v-container>
          <v-container>
            <v-btn aria-label="group" text to="/groups" block>
              <div>그룹</div>
            </v-btn>
          </v-container>
        </v-list>
      </v-navigation-drawer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      hashtag: "",
      time: "",
      date: ""
    };
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    onSearchHashtag() {
      if (this.hashtag.trim().length < 1) {
        return;
      }
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`
      });
      this.hashtag = "";
    },
    updateTime() {
      const cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2) +
        (this.zeroPadding(cd.getHours(), 2) < 12 ? " am" : " pm");
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
  font-size: 1em;
}
</style>

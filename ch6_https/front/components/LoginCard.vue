<template>
  <v-container v-if="me">
    <v-card>
      <v-container>
        <v-row class="mx-3">
          <v-tooltip right color="rgba(255, 255, 255, 0)">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-icon v-if="me.isAdmin">mdi-account-cog</v-icon>
                <v-avatar v-if="social" :color="socialColor" size="25">
                  <span class="black--text" style="font-size:20px">{{ socialName }}</span>
                </v-avatar>
              </div>
              <span v-on="on">{{ me.nickname }}({{ me.name }})</span>
            </template>
            <div class="box">
              <img :src="`${srcAddress}/profile/${me.src}`" />
            </div>
          </v-tooltip>로그인이 되었습니다.
          <v-btn aria-label="to" to="/qrcode" absolute right text>
            <i class="fas fa-camera ml-auto"></i>
          </v-btn>
        </v-row>
        <hr class="my-2" />
        <v-btn class="mb-3" aria-label="logout" @click.prevent="onLogOut">로그아웃</v-btn>
      </v-container>
    </v-card>
    <v-divider class="my-3"></v-divider>
    <v-card>
      <v-container>
        <user-activity :user="me" />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import UserActivity from "@/components/UserActivity.vue";

export default {
  components: {
    UserActivity
  },
  data() {
    return {
      socialName: "",
      socialColor: ""
    };
  },
  methods: {
    async onLogOut() {
      // this.$router.push({ path: "/main" });
      await this.$store.dispatch("users/logOut");
    }
  },
  computed: {
    ...mapState("users", ["me"]),
    social() {
      if (this.me && this.me.snsId && this.me.provider) {
        if (this.me.provider === "kakao") {
          return (this.socialName = "K"), (this.socialColor = "yellow");
        }
        return (this.socialName = "N"), (this.socialColor = "green");
      }
      return false;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    },
    userDetail() {
      return this.$store.state.users.userDetail;
    }
  }
};
</script>

<style scoped>
div.box {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline-style: groove;
}
div.box > img {
  max-width: 90%;
  max-height: 90%;
}
</style>

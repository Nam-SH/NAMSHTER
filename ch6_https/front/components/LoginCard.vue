<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row class="mx-3">
          <v-tooltip right color="rgba(255, 255, 255, 0)">
            <template v-slot:activator="{ on }">
              <i v-if="me.isAdmin" class="fas fa-user-lock" v-on="on"></i>
              <v-avatar v-if="social" :color="socialColor" size="25" v-on="on">
                <span class="black--text" style="font-size:20px">{{ socialName }}</span>
              </v-avatar>
              <span v-on="on">{{ me.nickname }}({{ me.name }})</span>
            </template>
            <v-img
              :src="`${srcAddress}/profile/${me.src}`"
              min-height="200px"
              max-height="300px"
              width="200px"
            ></v-img>
          </v-tooltip>로그인이 되었습니다.
          <v-btn to="/qrcode" absolute right text>
            <i class="fas fa-camera ml-auto"></i>
          </v-btn>
        </v-row>
        <hr class="my-2" />
        <v-btn class="mb-3" @click.prevent="onLogOut">로그아웃</v-btn>
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
      await this.$store.dispatch("users/logOut");
      this.$router.push({ path: "/main" });
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
    }
  }
};
</script>

<style scoped></style>

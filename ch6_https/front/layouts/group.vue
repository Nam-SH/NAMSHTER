<template>
  <v-app style="background-color:#E5EFF8">
    <default-nav />
    <v-row>
      <v-container>
        <v-container v-if="me">
          <v-card>
            <v-container>
              <v-row class="mx-3" justify="space-between">
                <div>
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
                </div>
                <group-create-form />
              </v-row>
              <hr class="my-2" />
              <v-btn class="mb-3" @click.prevent="onLogOut">로그아웃</v-btn>
            </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-row>
    <v-row>
      <nuxt />
    </v-row>
  </v-app>
</template>

<script>
import DefaultNav from "@/components/DefaultNav.vue";
import GroupActivity from "@/components/GroupActivity.vue";
import GroupCreateForm from "@/components/GroupCreateForm.vue";

export default {
  components: {
    DefaultNav,
    GroupActivity,
    GroupCreateForm
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
    me() {
      return this.$store.state.users.me;
    },
    social() {
      if (this.me && this.me.snsId && this.me.provider) {
        if (this.me.provider === "kakao") {
          this.socialName = "K";
          this.socialColor = "yellow";
          return true;
        }
        this.socialName = "N";
        this.socialColor = "green";
        return true;
      }
      return false;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  middleware: "authenticated"
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

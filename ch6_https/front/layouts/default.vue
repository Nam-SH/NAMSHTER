<template>
  <v-app>
    <nav>
      <v-toolbar dark color="blue">
        <v-toolbar-title>
          <nuxt-link to="/" style="color: black">NAMSHTER</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" />
            </div>
          </v-form>
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn
            v-if="!me"
            text
            nuxt
            to="/signup"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>회원가입</div>
          </v-btn>
          <v-btn v-else text nuxt to="/groups" :style="{ display: 'flex', alignItems: 'center' }">
            <div>그룹</div>
          </v-btn>
          <v-btn text nuxt to="/qrcode" :style="{ display: 'flex', alignItems: 'center' }">
            <div>QRcode</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <!-- <div v-if="!me">
      <v-card class="mx-auto" width="800px" height="200px" outlined style="margin-top:100px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">시계</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="mx-auto" width="800px" height="400px" outlined style="margin-top:50px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">설명</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn>입장하기</v-btn>
      </v-card>
    </div>-->

    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form />
        <group-go />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
import GroupGo from "@/components/GroupGo.vue";

export default {
  components: {
    LoginForm,
    GroupGo
  },
  data() {
    return {
      hashtag: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onSearchHashtag() {
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`
      }),
        (this.hashtag = "");
    }
  }
};
</script>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
}
</style>
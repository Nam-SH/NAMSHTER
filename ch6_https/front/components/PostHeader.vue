<template>
  <v-container class="py-0">
    <v-card-title>
      <h3>
        <template v-if="me">
          <v-tooltip right color="rgba(255, 255, 255, 0)">
            <template v-slot:activator="{ on }">
              <nuxt-link :to="/user/ + post.User.id">
                <span v-if="me.id !== post.User.id" v-on="on">{{ post.User.nickname }}</span>
                <span v-else v-on="on">{{ post.User.nickname }} (나)</span>
              </nuxt-link>
            </template>
            <v-img
              :src="`${srcAddress}/profile/${post.User.src}`"
              min-height="200px"
              max-height="300px"
              width="200px"
            ></v-img>
          </v-tooltip>
        </template>
        <span v-else>{{ post.User.nickname }}</span>
        <v-btn v-if="canFollow" aria-label="follow" @click.prevent="onFollow">팔로우</v-btn>
        <v-btn v-if="canUnFollow" aria-label="unfollow" @click.prevent="onUnFollow">언팔로우</v-btn>
      </h3>
    </v-card-title>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    canFollow() {
      return (
        this.me &&
        this.post.User.id !== this.me.id &&
        !this.me.Followings.find(v => v.id === this.post.User.id)
      );
    },
    canUnFollow() {
      return (
        this.me &&
        this.post.User.id !== this.me.id &&
        this.me.Followings.find(v => v.id === this.post.User.id)
      );
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    onFollow() {
      this.$store.dispatch("users/follow", {
        userId: this.post.User.id
      });
    },
    onUnFollow() {
      this.$store.dispatch("users/unfollow", {
        userId: this.post.User.id
      });
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
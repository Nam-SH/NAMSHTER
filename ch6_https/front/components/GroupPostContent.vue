<template>
  <div>
    <v-card-title>
      <h3>
        <v-tooltip right color="rgba(255, 255, 255, 0)">
          <template v-slot:activator="{ on }">
            <nuxt-link :to="/user/ + groupPost.User.id">
              <span v-if="me.id !== groupPost.User.id" v-on="on">{{ groupPost.User.nickname }}</span>
              <span v-else v-on="on">{{ groupPost.User.nickname }} (나)</span>
            </nuxt-link>
          </template>
          <v-img
            :src="`${srcAddress}/profile/${groupPost.User.src}`"
            min-height="200px"
            max-height="300px"
            width="200px"
          ></v-img>
        </v-tooltip>
      </h3>
    </v-card-title>
    <group-post-images :images="groupPost.GroupPostImages || []" />
    <v-card-text>
      <h3>{{ groupPost.title }}</h3>
      <hr />
      <div>{{ groupPost.content }}</div>
      <br />
      <div>{{ $moment(groupPost.createdAt).fromNow() }}에 작성함...</div>
    </v-card-text>
  </div>
</template>

<script>
import GroupPostImages from "@/components/GroupPostImages.vue";

export default {
  components: {
    GroupPostImages
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    }
  },
  computed: {
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    },
    me() {
      return this.$store.state.users.me;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

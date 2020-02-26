<template>
  <v-card color="rgba( 255, 255, 255, 0.5 )">
    <group-post-card v-for="groupPost in groupPosts" :key="groupPost.id" :groupPost="groupPost" />
  </v-card>
</template>

<script>
import GroupPostCard from "@/components/GroupPostCard.vue";

export default {
  components: {
    GroupPostCard
  },
  props: {
    groupPosts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
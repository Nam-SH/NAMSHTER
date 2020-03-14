<template>
  <v-card color="rgba( 255, 255, 255, 0.5 )">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="groupPost in groupPosts" :key="groupPost.id">
          <group-post-card :groupPost="groupPost" />
        </v-col>
      </v-row>
    </v-container>
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
.images div {
  width: 25%;
  float: left;
  border: 5px solid red;
}

.images img {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
}
</style>
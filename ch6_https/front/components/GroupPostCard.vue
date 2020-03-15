<template>
  <div style="border: 2px solid black; border-radius: 10px; height:400px">
    <v-card style="display:flex;flex-direction:column;height:100%;border-radius: 10px">
      <v-card style="flex:10">
        <div style="display:flex;flex-direction:column;height:100%">
          <div class="mx-3" style="flex:2">
            <div>{{ groupPost.User.nickname }}</div>
            <div>
              <h3>{{ groupPost.title }}</h3>
            </div>
            <hr />
          </div>
          <div class="mx-3" style="flex:5">
            <p class="target">{{ groupPost.content }}</p>
          </div>

          <div style="flex:1">
            <hr />
            <div
              class="mx-3"
              style="font-size:12px;"
            >{{ $moment(groupPost.createdAt).fromNow() }}에 작성함...</div>
          </div>
        </div>
      </v-card>
      <v-card-actions style="flex:1">
        <!-- 좋아요 -->
        <v-btn aria-label="like" text color="orange" @click.prevent="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>
        <group-post-content :groupPost="groupPost" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import GroupPostContent from "@/components/GroupPostContent.vue";

export default {
  components: {
    GroupPostContent
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      return false;
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    }
  },
  methods: {
    onClickHeart() {
      console.log("아직 구현 안 함");
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
p.target {
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.6;
  max-height: 12.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
</style>

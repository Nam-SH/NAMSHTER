<template>
  <div>
    <v-card style="margin-bottom: 20px" shaped>
      <div>
        <client-only>
          <TuiEditorViewer :value="post.content" height="500px" />
        </client-only>
      </div>
      <v-card-actions>
        <v-row class="mx-1" justify="space-between">
          <div>
            <v-btn aria-label="like" text color="orange" @click.prevent="onClickHeart">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-btn aria-label="detail" text color="primary" nuxt-link :to="`/blog/${post.id}`">상세보기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
    liked() {
      return !!(this.post.Likers || []).find(
        v => v.id === (this.me && this.me.id)
      );
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    },
    AvgRank() {
      return this.commentOpened ? this.onAvgRank(this.post.Comments) : pass;
    }
  },
  methods: {
    // 좋아요
    onClickHeart() {
      if (!this.me) {
        this.$toast.error("로그인이 필요해여;;", { duration: 2000 });
        return;
      }
      if (this.liked) {
        return this.$store.dispatch("posts/unlikePost", {
          postId: this.post.id
        });
      }
      return this.$store.dispatch("posts/likePost", {
        postId: this.post.id
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

<template>
  <div>
    <v-card style="margin-bottom: 20px" shaped>
      <div v-if="post.RetweetId && post.Retweet">
        <v-subheader>{{ post.User.nickname }}님이 리트윗했다.</v-subheader>
        <post-header :post="post" />
        <v-card style="margin: 0 20px">
          <post-header :post="post.Retweet" />
          <post-content :post="post.Retweet" :isEditting="isEditting" :onEditPost="onEditPost" />
        </v-card>
        <post-content :post="post" :isEditting="isEditting" :onEditPost="onEditPost" />
      </div>
      <div v-else>
        <post-header :post="post" />
        <post-content :post="post" :isEditting="isEditting" :onEditPost="onEditPost" />
      </div>
      <v-card-actions>
        <v-row class="mx-1" justify="space-between">
          <div>
            <v-btn aria-label="retweet" text color="orange" @click.prevent="onRetweet">
              <v-icon>mdi-twitter-retweet</v-icon>
            </v-btn>
            <v-btn aria-label="like" text color="orange" @click.prevent="onClickHeart">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
            <v-btn aria-label="comment" text color="orange" @click.prevent="onComment">
              <v-icon>mdi-comment-outline</v-icon>
            </v-btn>
          </div>
          <div>
            <div class="text-center">
              <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn aria-label="menu" text color="orange" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, idx) in items" :key="idx" @click="item.func">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- 댓글 창 클릭시 -->
    <template v-if="commentOpened">
      <comment-form :post-id="post.id" style="margin-bottom: 30px" :change="AvgRank" />
      <v-list style="margin-bottom: 20px">
        <div>댓글 수: {{ post.Comments.length }}개</div>
        <div>평점 평균: {{ avgTotal }}점</div>
        <hr />
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="yellow">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-rating :value="c.score" readonly dense small></v-rating>
          <v-list-item-content>
            <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
            <div>
              <span style="vertical-align: middle">{{ c.content }}</span>
              <v-btn text @click="onDeleteComment(c.id)" color="red" absolute right>삭제</v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm.vue";
import PostContent from "@/components/PostContent.vue";
import PostHeader from "@/components/PostHeader.vue";

export default {
  components: {
    CommentForm,
    PostContent,
    PostHeader
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentOpened: false,
      avgTotal: 0,
      commentList: null,
      isEditting: false,
      isInIndex: true,
      items: [
        { title: "수정", func: this.onEditPost },
        { title: "삭제", func: this.onRemovePost }
      ]
    };
  },
  created() {
    if (this.$route.name !== "index") {
      this.isInIndex = false;
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
    },
    nodes() {
      return this.post.content.split(/(#[^\s#]+)/);
    }
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch("posts/remove", {
        postId: this.post.id
      });
    },
    onEditPost() {
      this.isEditting = !this.isEditting;
    },
    async onComment() {
      if (!this.commentOpened) {
        await this.$store.dispatch("posts/loadComments", {
          postId: this.post.id
        });
      }
      this.commentOpened = !this.commentOpened;
    },
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
    },
    // 리트윗
    onRetweet() {
      if (!this.me) {
        return alert("로그인이 필요합니다.");
      }
      this.$store.dispatch("posts/retweet", {
        postId: this.post.id
      });
    },
    onAvgRank(comments) {
      if (!comments.length) return;
      let res = 0;
      for (let one of comments) {
        res += one.score;
      }
      return (this.avgTotal = res / comments.length);
    },
    onDeleteComment(i) {
      return this.$store.dispatch("posts/deleteComment", {
        postId: this.post.id,
        commentId: i
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

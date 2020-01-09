<template>
  <div>
    <v-card style="margin-bottom: 20px">
      <!-- 이미지 캐로제 추가 -->
      <!-- <post-images :images="post.Images || []" /> -->
      
      <!-- 리트윗 아아디가 있는 경우, 아닌경우 -->
      <div v-if="post.RetweetId">
        <v-subheader>{{ post.User.nickname }}님이 리트윗했다. </v-subheader>
        <v-card style="margin: 0 20px">
          <post-content :post="post.Retweet"></post-content>
        </v-card>
      </div>
      <post-content v-else :post="post"></post-content>
      
      <!-- 리트윗을 위해 삭제 -->
      <!-- <v-card-title>
        <h3>
          <nuxt-link :to="/user/ + post.id">
            {{ post.User.nickname }}
          </nuxt-link> 
        </h3>
      </v-card-title>

      <v-card-text>
        <div>
          <nuxt-link :to="/post/ + post.id">
            {{ post.content }}
          </nuxt-link>
        </div>
      </v-card-text> -->

      <v-card-actions>
        <v-btn text color="orange" @click="onRetweet">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>

        <!-- 좋아요 -->
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>

        <!-- 댓글 -->
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>

        <v-menu offset-y open-on-hover >
          <template v-slot:activator="{ on }" >
            <v-btn text color="orange" v-on="on" >
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white" >
            <v-btn cark color="orange" @click="onEditPost" >수정</v-btn>
            <v-btn cark color="red" @click="onRemovePost" >삭제</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>

    <!-- 댓글 창 클릭시 -->
    <template v-if="commentOpened">
      <comment-form :post-id="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="yellow">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
            <v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

  </div>
</template>

<script>

  import CommentForm from '@/components/CommentForm.vue';
  // import PostImages from '@/components/PostImages.vue';
  import PostContent from '@/components/PostContent.vue';

  export default {
    components: {
      CommentForm,
      // PostImages,
      PostContent,
    },
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        commentOpened: false
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      liked() {
        return !!(this.post.Likers || []).find(v => v.id === (this.me && this.me.id));
      },
      heartIcon() {
        return this.liked ? "mdi-heart" : "mdi-heart-outline";
      }
    },
    methods: {
      onRemovePost() {
        this.$store.dispatch('posts/remove', {
          postId: this.post.id
        })
      },
      onEditPost() {
        alert('아직 구현 안함')
      },
      onToggleComment() {
        if (!this.commentOpened) {
          this.$store.dispatch('posts/loadComments', { postId: this.post.id })
        };
        this.commentOpened = !this.commentOpened
      },

      // 좋아요
      onClickHeart () {
        if (!this.me) {
          return alert('로그인이 필요합니다.')
        }
        if (this.liked) {
          return this.$store.dispatch('posts/unlikePost', {
            postId: this.post.id,
          })
        }
        return this.$store.dispatch('posts/likePost', {
          postId: this.post.id,
        })
      },
      
      // 리트윗
      onRetweet() {
        if (!this.me) {
          return alert('로그인이 필요합니다.')
        }
        return this.$store.dispatch('posts/retweet', {
          postId: this.post.id,
        })
      }
    },
  }
</script>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }
</style>
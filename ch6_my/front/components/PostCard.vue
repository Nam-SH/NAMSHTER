<template>
  <div>
    <v-card style="margin-bottom: 20px">
      <div v-if="post.RetweetId && post.Retweet">
        <v-subheader>{{ post.User.nickname }}님이 리트윗했다. </v-subheader>
        <v-card style="margin: 0 20px">
          <post-content :post="post.Retweet" :isEditting="isEditting" />
        </v-card>
      </div>
      <post-content v-else :post="post" :isEditting="isEditting" @onEditPost="onEditPost" />

      <v-btn v-if="fromIndex" text color="primary" nuxt-link :to="`/post/${post.id}`">상세보기</v-btn>

      <v-card-actions>
        <v-btn text color="orange" @click="onRetweet">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>

        <!-- 좋아요 -->
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>

        <!-- 댓글 -->
        <v-btn text color="orange" @click="onComment">
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
    <template v-if="commentOpened" >
      <comment-form :post-id="post.id" style="margin-bottom: 30px" :change="AvgRank" />    
      <v-list style="margin-bottom: 20px">        
        <div> 댓글 수: {{ post.Comments.length }}개 </div>
        <div> 평점 평균: {{ avgTotal }}점 </div>
        <hr>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="yellow">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-rating :value="c.score" readonly dense small></v-rating>
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
  import PostContent from '@/components/PostContent.vue';
  
  export default {
    components: {
      CommentForm,
      PostContent,
    },
    props: {
      post: {
        type: Object,
        required: true
      },
      fromIndex: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        commentOpened: false,
        avgTotal: 0,
        commentList: null,
        isEditting: false,
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
      },
      AvgRank () {
        return this.commentOpened ? this.onAvgRank(this.post.Comments) : pass
      },
    },

    methods: {
      onRemovePost() {
        this.$store.dispatch('posts/remove', {
          postId: this.post.id
        })
      },
      onEditPost() {
        this.isEditting = !this.isEditting
      },
      async onComment() {
        if (!this.commentOpened) {         
          await this.$store.dispatch('posts/loadComments', { postId: this.post.id })
        };
        this.commentOpened = !this.commentOpened
      },
      // 좋아요
      onClickHeart () {
        if (!this.me) {
          return alert('로그인이 필요합니다.')
        };
        if (this.liked) {
          return this.$store.dispatch('posts/unlikePost', {
            postId: this.post.id,
          })
        };
        return this.$store.dispatch('posts/likePost', {
          postId: this.post.id,
        })
      },
      // 리트윗
      onRetweet() {
        if (!this.me) {
          return alert('로그인이 필요합니다.')
        }
        this.$store.dispatch('posts/retweet', {
          postId: this.post.id,
        })
      },
      onAvgRank(comments) {
        if (!comments.length) return
        let res = 0;
        for (let one of comments) {
          res += one.score;
        }
        return this.avgTotal = res/comments.length
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
<template>
  <div>
    <v-card style="margin-bottom: 20px">
      <!-- 이미지 캐로제 추가 -->
      <post-images :images="post.Images || []" />
      
      <v-card-title>
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
      </v-card-text>

      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
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
  import PostImages from '@/components/PostImages.vue';


  export default {
    components: {
      CommentForm,
      PostImages,
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
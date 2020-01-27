<template>
  <v-container v-if="mainPosts">
     <post-card :post="mainPosts[0]" />
  </v-container>
  <div v-else>
    <v-container>
      글이 없는데요
    </v-container>
  </div>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    fetch({ store, params}) {
      return store.dispatch('posts/loadPost', params.id)
    },
    computed: {
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      }
    },
    head() {
      return {
        title: `${this.post.User.nickname}님의 게시글`,
        meta: [{
          hid: 'desc', name: 'description', content: this.post.content,
        }, {
          hid: 'ogtitle', property: 'og:title', content: `${this.post.User.nickname}님의 게시글`,
        }, {
          hid: 'ogdesc', property: 'og:description', content: this.post.content,
        }, {
          hid: 'ogimage', property: 'og:image', content: this.post.Images[0] ? this.post.Images[0].src : 'https://vue.nodebird.com/vue-nodebird.png',
        }, {
          hid: 'ogurl', property: 'og:url', content: `http://localhost:3085/${this.post.id}`,
        }],
      };
    }
  }
</script>
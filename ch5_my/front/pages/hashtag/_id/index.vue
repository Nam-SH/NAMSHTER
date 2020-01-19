<template>
  <v-container>
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    computed: {
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      },
      hasMorePost () {
        return this.$store.state.posts.hasMorePost;
      },
    },
    fetch({ store, params }) {
      return store.dispatch('posts/loadHashtagPosts', {
        hashtag: encodeURIComponent(params.id),
        reset: true,
      });
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {        
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost) {
            const link = document.location.href; 
            const tag = link.split('hashtag/')[1]
            this.$store.dispatch('posts/loadHashtagPosts', {
              hashtag: tag,
              reset: false,
            });
          }
        }
      },
    },
  }
</script>
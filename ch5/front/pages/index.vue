<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
  import PostCard from '~/components/PostCard';
  import PostForm from '@/components/PostForm';
  
  export default {
    components: {
      PostCard,
      PostForm
    },
    
    fetch({ store }) {
      store.dispatch('posts/loadPosts');
    },

    computed: {
      me() {
        return this.$store.state.users.me;
      },
      mainPosts() {
        const mainPosts = this.$store.state.posts.mainPosts;
        console.log('mainPosts', mainPosts)
        return mainPosts
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost;
      },
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
            this.$store.dispatch('posts/loadPosts');
          }
        }
      }
    },
  }
</script>
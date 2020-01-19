<template>
  <v-container v-if="post">
      <post-card :post="post" />
  </v-container>
  <div v-else>
    글이 없는데욬ㅋㅋ;;
  </div>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10))
      }
    },
  }
</script>
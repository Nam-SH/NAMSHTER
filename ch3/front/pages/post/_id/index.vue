<template>
  <v-container v-if="post">
    <post-card :post="post" />
  </v-container>
  <div v-else>
    게시글이 존재하지 않는데요;; 다른 번호 검색 ㄱㄱ
  </div>
</template>

<script>
  import PostCard from '@/components/PostCard.vue';
  
  export default {
    components: {
      PostCard
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10))
      }
    },
    
  }
</script>
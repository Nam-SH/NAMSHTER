<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{ other.nickname }}님은 누굴까요
        <v-row>
          <!-- <v-col cols="4"> {{ other.Followings.length }}명을 팔로잉... </v-col>
          <v-col cols="4"> {{ other.Followers.length }}명이 나를 팔로워... </v-col>
          <v-col cols="4"> {{ other.Posts.length }}개의 글을 작성함... </v-col> -->
        </v-row>
      </v-container>
    </v-card>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
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
      other() {
        return this.$store.state.users.other;
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      },
    },

    fetch({ store, params }) {
      store.dispatch('users/loadOther', {
        userId: params.id,
      });
      return store.dispatch('posts/loadUserPosts', {
        userId: params.id,
        reset: true,
      })
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
      },

    },
  }
</script>
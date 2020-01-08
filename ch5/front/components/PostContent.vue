<template>
  <div>
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
  </div>
</template>

<script>
import PostImages from '@/components/PostImages.vue';

  export default {
    components: {
      PostImages,
    },
    props: {
      post: {
        type: Object,
      }
    },
  }
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
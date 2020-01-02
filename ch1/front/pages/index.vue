<template>
  <!-- <div>
    <nav>
      Hello {{ name }}
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/profile"> profile </nuxt-link>
      <nuxt-link to="/signup"> signup </nuxt-link>
    </nav>
    main page
  </div> -->
  <div>
    <post-card />
    <post-card />
    <post-card />
    <post-card />
    <post-card />
  </div>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard
    }
    // data() {
    //   return {
    //     name: 'Nuxt.js'
    //   }
    // },
    // head () {
    //   return {
    //     title: '메인페이지'
    //   }
    // }
    
  }
</script>

<style scoped>

</style>
<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{ other.nickname }}님은 누굴까요?
        <user-activity :user="other" />
      </v-container>
    </v-card>
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";
import UserActivity from "@/components/UserActivity.vue";

export default {
  components: {
    PostCard,
    UserActivity
  },

  computed: {
    other() {
      return this.$store.state.users.other;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    }
  },

  fetch({ store, params }) {
    return Promise.all([
      store.dispatch("users/loadOther", {
        userId: params.id
      }),
      store.dispatch("posts/loadUserPosts", {
        userId: params.id,
        reset: true
      })
    ]);
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadUserPosts", {
            userId: this.other.id,
            reset: false
          });
        }
      }
    }
  },
  middleware: "authenticated"
};
</script>

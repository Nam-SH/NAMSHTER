<template>
  <div>
    <post-images :images="post.Images || []" />
    <v-card-title>
      <h3>
        <nuxt-link v-if="this.me && this.me.id !== post.User.id" :to="/user/ + post.User.id">
          <span>{{ post.User.nickname }}</span>
        </nuxt-link>
        <span v-else-if="this.me && this.me.id == post.User.id">{{ post.User.nickname }} (나)</span>
        <span v-else>{{ post.User.nickname }}</span>
        <v-btn v-if="canFollow" @click="onFollow">팔로우</v-btn>
        <v-btn v-if="canUnFollow" @click="onUnFollow">언팔로우</v-btn>
      </h3>
    </v-card-title>

    <v-card-text v-if="!isEditting">
      <div>
        <template v-for="(node, i) in nodes">
          <nuxt-link
            v-if="node.startsWith('#')"
            :key="i"
            :to="`/hashtag/${node.slice(1)}`"
            style="color: deepskyblue"
          >{{ node }}</nuxt-link>
          <template v-else>{{ node }}</template>
        </template>
      </div>
      <br />
      <div>{{ $moment(post.createdAt).fromNow() }}</div>
      <div v-if="post.createdAt !== post.updatedAt">(수정됨: {{ $moment(post.updatedAt).fromNow() }})</div>
    </v-card-text>

    <v-card-text v-else>
      <div>
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-textarea v-model="content" outlined auto-grow clearable :hide-details="hideDetails" />
          <v-btn type="submit" color="blue" absolute right>수정</v-btn>
        </v-form>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import PostImages from "@/components/PostImages.vue";

export default {
  components: {
    PostImages
  },
  data() {
    return {
      hideDetails: true,
      content: ""
    };
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    isEditting: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.content = this.post.content;
  },
  computed: {
    nodes() {
      return this.post.content.split(/(#[^\s#]+)/);
    },
    me() {
      return this.$store.state.users.me;
    },
    canFollow() {
      return (
        this.me &&
        this.post.User.id !== this.me.id &&
        !this.me.Followings.find(v => v.id === this.post.User.id)
      );
    },
    canUnFollow() {
      return (
        this.me &&
        this.post.User.id !== this.me.id &&
        this.me.Followings.find(v => v.id === this.post.User.id)
      );
    }
  },
  methods: {
    onFollow() {
      this.$store.dispatch("users/follow", {
        userId: this.post.User.id
      });
    },
    onUnFollow() {
      this.$store.dispatch("users/unfollow", {
        userId: this.post.User.id
      });
    },
    async onSubmitForm() {
      if (!this.content.trim()) {
        alert("게시글 입력해여죠;;");
        return;
      }
      await this.$store
        .dispatch("posts/edit", {
          postId: this.post.id,
          content: this.content
        })
        .then(() => {
          this.$store.dispatch("users/loadUser");
          this.hideDetails = false;
          this.$emit("onEditPost");
        });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

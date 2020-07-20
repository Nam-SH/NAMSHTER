<template>
  <v-container>
    <post-images :images="post.Images || []" />
    <!-- 일반 -->
    <v-container v-if="!isEditting || post.User.id !== me.id" class="pb-0">
      <v-container>
        <span v-for="(node, i) in nodes" :key="i">
          <nuxt-link
            v-if="node.startsWith('#')"
            :to="`/hashtag/${node.slice(1)}`"
            style="color: deepskyblue"
          >{{ node }}</nuxt-link>
          <span v-else>{{ node }}</span>
        </span>
      </v-container>
    </v-container>
    <!-- 수정 -->
    <v-container v-else-if="isEditting && post.User.id === me.id">
      <div>
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-container class="pb-0">
            <v-textarea v-model="content" outlined clearable :hide-details="hideDetails" />
            <v-container>
              <v-row justify="end">
                <v-btn
                  class="mx-1"
                  aria-label="cancle"
                  type="button"
                  color="yellow"
                  @click.prevent="onEditPost"
                >수정 취소</v-btn>
                <v-btn aria-label="mod" type="submit" color="green" dark>수정</v-btn>
              </v-row>
            </v-container>
          </v-container>
        </v-form>
      </div>
    </v-container>
    <!-- 글 작성시간 -->
    <v-divider class="mt-5"></v-divider>
    <v-container class="mb-0 pb-0 mx-3">
      <v-row justify="space-between">
        <div>
          {{ $moment(post.createdAt).fromNow() }}에 작성됨...
          <span
            v-if="post.createdAt !== post.updatedAt"
          >(수정됨: {{ $moment(post.updatedAt).fromNow() }})</span>
        </div>
        <v-btn aria-label="detail" text color="primary" nuxt-link :to="`/post/${post.id}`">상세보기</v-btn>
      </v-row>
    </v-container>
  </v-container>
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
    },
    onEditPost: {
      type: Function,
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
    }
  },
  methods: {
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
          this.onEditPost()
          });
    }
  },
  watch: {
    isEditting(newValue, oldValue) {
      if (!newValue) {
        this.content = this.post.content;
      }
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

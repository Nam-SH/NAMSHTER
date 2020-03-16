<template>
  <div style="border-style: inset">
    <v-container>
      <v-form @submit.prevent="onSubmitCommentForm" width="100%">
        <v-text-field class="mt-0 pt-0" label="댓글" hide-details v-model="comment">
          <v-btn aria-label="comment" type="submit" slot="append" icon small color="primary">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </v-text-field>
      </v-form>
    </v-container>
    <v-container>
      <div v-for="comm in groupPostComments" :key="comm.id">
        <v-row align="center" justify="space-between">
          <div>
            <div v-if="comm.User" style="display:inline-block">
              <v-list-item-avatar class="mr-0" color="grey darken-3">
                <v-img class="elevation-6" :src="`${srcAddress}/profile/${comm.User['src']}`"></v-img>
              </v-list-item-avatar>
              <span style="font-size:0.8em">{{ comm.User['name'] }}({{ comm.User['nickname'] }}) |</span>
            </div>
            <span style="font-size:0.8em">
              <strong>{{ comm.comment }}</strong>
            </span>
          </div>
          <v-btn aria-label="del" @click="onDeleteComment(comm.id)" icon color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    groupPostComments: {
      type: Array,
      required: true
    },
    groupPostId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comment: "",
      isCommentOn: true
    };
  },
  computed: {
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    async onSubmitCommentForm() {
      if (!this.comment.trim()) {
        alert("빈 값은 안 돼요;;");
        return;
      }
      await this.$store
        .dispatch("groups/postCommentAdd", {
          comment: this.comment,
          groupId: this.$route.params.id,
          postId: this.groupPostId
        })
        .then(async () => {
          this.comment = "";
        });
    },
    onDeleteComment(i) {
      return this.$store.dispatch("groups/postCommentDelete", {
        groupId: this.$route.params.id,
        postId: this.groupPostId,
        commentId: i
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
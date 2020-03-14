<template>
  <v-row no-gutters>
    <v-container>
      <v-container style="border: 2px solid black; border-radius: 10px;">
        <v-card>
          <v-card>
            <group-post-content
              :groupPost="groupPost"
              :isEditting="isEditting"
              :onEditting="onEditting"
            />
          </v-card>
          <v-card-actions>
            <!-- 좋아요 -->
            <v-btn aria-label="like" text color="orange" @click.prevent="onClickHeart">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn aria-label="menu" text color="orange" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <div style="background: white">
                <v-btn aria-label="mod" cark color="orange" @click.prevent="onEditting">수정</v-btn>
                <v-btn aria-label="del" cark color="red" @click.prevent="onDelete">삭제</v-btn>
              </div>
            </v-menu>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <v-container>
          <v-row justify="center">
            <v-expansion-panels accordion>
              <v-expansion-panel @click.prevent="onComment">
                <v-expansion-panel-header>
                  <span>
                    <strong>댓글</strong>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-if="isCommentOn">
                  <v-container>
                    <v-form @submit.prevent="onSubmitForm" width="100%">
                      <v-text-field class="mt-0 pt-0" label="댓글" hide-details v-model="comment">
                        <v-btn
                          aria-label="comment"
                          type="submit"
                          slot="append"
                          icon
                          small
                          color="primary"
                        >
                          <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
                      </v-text-field>
                    </v-form>
                  </v-container>
                  <div v-for="comm in groupPost.GroupPostComments" :key="comm.id">
                    <v-row align="center" justify="space-between">
                      <div>
                        <div v-if="comm.User" style="display:inline-block">
                          <v-list-item-avatar class="mr-0" color="grey darken-3">
                            <v-img
                              class="elevation-6"
                              :src="`${srcAddress}/profile/${comm.User['src']}`"
                            ></v-img>
                          </v-list-item-avatar>
                          <span>{{ comm.User['name'] }}({{ comm.User['nickname'] }}) |</span>
                        </div>
                        <span>
                          <strong>{{ comm.comment }}</strong>
                        </span>
                      </div>
                      <v-btn aria-label="del" @click="onDeleteComment(comm.id)" icon color="red">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-row>
                    <v-divider></v-divider>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-container>
    </v-container>
  </v-row>
</template>

<script>
import GroupPostContent from "@/components/GroupPostContent.vue";

export default {
  components: {
    GroupPostContent
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditting: false,
      comment: "",
      isCommentOn: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      return false;
      // return !!(this.post.Likers || []).find(
      //   v => v.id === (this.me && this.me.id)
      // );
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    onClickHeart() {
      console.log("아직 구현 안 함");
    },
    onEditting() {
      this.isEditting = !this.isEditting;
    },
    onDelete() {
      this.$store.dispatch("groups/postDelete", {
        groupId: this.$route.params.id,
        postId: this.groupPost.id
      });
    },
    async onComment() {
      this.isCommentOn = !this.isCommentOn;
      if (this.isCommentOn) {
        await this.$store.dispatch("groups/loadPostComments", {
          groupId: this.$route.params.id,
          postId: this.groupPost.id,
          reset: true
        });
      }
    },
    async onSubmitForm() {
      if (!this.comment.trim()) {
        alert("빈 값은 안 돼요;;");
        return;
      }
      await this.$store
        .dispatch("groups/postCommentAdd", {
          comment: this.comment,
          groupId: this.$route.params.id,
          postId: this.groupPost.id
        })
        .then(async () => {
          this.comment = "";
        });
    },
    onDeleteComment(i) {
      return this.$store.dispatch("groups/postCommentDelete", {
        groupId: this.$route.params.id,
        postId: this.groupPost.id,
        commentId: i
      });
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>

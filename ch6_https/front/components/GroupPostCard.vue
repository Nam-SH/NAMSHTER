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
            <v-btn text color="orange" @click="onClickHeart">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn text color="orange" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <div style="background: white">
                <v-btn cark color="orange" @click.prevent="onEditting">수정</v-btn>
                <v-btn cark color="red" @click.prevent="onDelete">삭제</v-btn>
              </div>
            </v-menu>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <v-card color="#F5F5DC">
          <v-card-text class="pb-0">
            <span>댓글</span>
            <v-btn rounded color="yellow" small right absolute @click="testClick">전체 보기</v-btn>
            <v-divider></v-divider>
            <div v-for="c in groupPost.GroupPostComments" :key="c.id">
              <div class="text--primary">{{ c.User.src }}</div>
              <div class="text--primary">{{ c.User.name }}({{ c.User.nickname }})</div>
              <div class="text--primary">{{ c.comment }}</div>
              <v-btn @click="onDeleteComment(c.id)">삭제</v-btn>
            </div>
          </v-card-text>
          <v-container>
            <v-card-actions class="mt-0 pt-0">
              <v-form @submit.prevent="onSubmitForm" width="100%">
                <v-text-field class="mt-0 pt-0" label="댓글" hide-details v-model="comment">
                  <v-btn type="submit" slot="append" icon small color="primary">
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                </v-text-field>
              </v-form>
            </v-card-actions>
          </v-container>
        </v-card>
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
      comment: ""
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
    testClick() {
      this.$store.dispatch("groups/loadPostComments", {
        groupId: this.$route.params.id,
        postId: this.groupPost.id,
        reset: true
      });
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

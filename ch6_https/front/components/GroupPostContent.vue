<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on" @click="onComment">Click Me</v-btn>
      </template>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-card height="40em" style="display:flex;flex-direction:column">
            <v-card-title style="flex:1">
              <h3>
                <v-tooltip right color="rgba(255, 255, 255, 0)">
                  <template v-slot:activator="{ on }">
                    <nuxt-link :to="/user/ + groupPost.User.id">
                      <span
                        v-if="me.id !== groupPost.User.id"
                        v-on="on"
                      >{{ groupPost.User.nickname }}</span>
                      <span v-else v-on="on">{{ groupPost.User.nickname }} (나)</span>
                    </nuxt-link>
                  </template>
                  <v-img
                    :src="`${srcAddress}/profile/${groupPost.User.src}`"
                    min-height="200px"
                    max-height="300px"
                    width="200px"
                  ></v-img>
                </v-tooltip>
              </h3>
            </v-card-title>
            <group-post-images :images="groupPost.GroupPostImages || []" />
            <v-card-text style="flex:8">
              <div v-if="!isEditting">
                <h3>{{ groupPost.title }}</h3>
                <client-only>
                  <TuiEditorViewer :value="groupPost.content" height="500px" />
                </client-only>
              </div>
              <div v-else>
                <v-text-field
                  v-model="title"
                  :counter="20"
                  color="teal"
                  label="제목"
                  dense
                  autofocus
                  outlined
                ></v-text-field>
                <hr />
                <client-only>
                  <TuiEditor
                    mode="markdown"
                    v-model="content"
                    preview-style="vertical"
                    height="300px"
                  />
                </client-only>
              </div>
            </v-card-text>
            <v-container
              class="my-auto"
              style="flex:1"
            >{{ $moment(groupPost.createdAt).fromNow() }}에 작성함...</v-container>
            <v-card-actions justyfy="space-around">
              <div style="background: white" v-if="groupPost.UserId === me.id && !isEditting">
                <v-btn aria-label="mod" cark @click.prevent="onEditting">수정</v-btn>
                <v-btn aria-label="del" cark @click.prevent="onDelete">삭제</v-btn>
              </div>
              <div v-else-if="groupPost.UserId === me.id && isEditting">
                <v-btn
                  aria-label="cancle"
                  v-if="isEditting"
                  color="red"
                  dark
                  @click.prevent="onEditting"
                >취소</v-btn>
                <v-btn
                  v-if="isEditting"
                  aria-label="mod"
                  color="blue"
                  dark
                  @click.prevent="onSubmitForm"
                >수정</v-btn>
              </div>
              <v-btn class="ml-auto" color="blue darken-1" text @click="dialog = false">닫기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- 댓글 -->
        <v-col cols="12" md="4">
          <v-card height="40em" style="background-color: white;">
            <group-post-comment
              :groupPostComments="groupPost.GroupPostComments"
              :groupPostId="groupPost.id"
              style="height:100%;overflow: auto;"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
import GroupPostImages from "@/components/GroupPostImages.vue";
import GroupPostComment from "@/components/GroupPostComment.vue";

export default {
  components: {
    GroupPostImages,
    GroupPostComment
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: "",
      content: "",
      isEditting: false,
      dialog: false
    };
  },
  created() {
    this.title = this.groupPost.title;
    this.content = this.groupPost.content;
  },
  methods: {
    async onSubmitForm() {
      if (!this.title.trim() || !this.content.trim()) {
        alert("빈 값은 안 돼요;;");
        return;
      }
      if (this.title.length > 20) {
        alert("제목은 20자 이하에요;;");
        return;
      }
      if (this.content.length > 300) {
        alert("내용은 300자 이하에요;;");
        return;
      }
      await this.$store
        .dispatch("groups/postEdit", {
          title: this.title,
          content: this.content,
          groupId: this.$route.params.id,
          postId: this.groupPost.id
        })
        .then(() => {
          this.onEditting();
          this.title = "";
          this.content = "";
        });
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
      await this.$store.dispatch("groups/loadPostComments", {
        groupId: this.$route.params.id,
        postId: this.groupPost.id,
        reset: true
      });
    }
  },
  computed: {
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    },
    me() {
      return this.$store.state.users.me;
    }
  },
  watch: {
    isEditting(newValue, oldValue) {
      if (!newValue) {
        this.title = this.groupPost.title;
        this.content = this.groupPost.content;
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

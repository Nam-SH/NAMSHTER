<template>
  <div>
    <v-card-title>
      <h3>
        <v-tooltip right color="rgba(255, 255, 255, 0)">
          <template v-slot:activator="{ on }">
            <nuxt-link :to="/user/ + groupPost.User.id">
              <span v-if="me.id !== groupPost.User.id" v-on="on">
                {{
                groupPost.User.nickname
                }}
              </span>
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
    <v-card-text>
      <h3 v-if="!isEditting">{{ groupPost.title }}</h3>
      <v-text-field
        v-else
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
        <TuiEditorViewer v-if="!isEditting" :value="groupPost.content" height="500px" />
        <TuiEditor
          v-else
          mode="markdown"
          v-model="content"
          preview-style="vertical"
          height="300px"
        />
      </client-only>
      <br />
      <div style="display: flex;justify-content: space-between;">
        <div class="my-auto">{{ $moment(groupPost.createdAt).fromNow() }}에 작성함...</div>
        <div>
          <v-btn v-if="isEditting" color="red" dark @click.prevent="onEditting">취소</v-btn>
          <v-btn v-if="isEditting" color="blue" dark @click.prevent="onSubmitForm">수정</v-btn>
        </div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import GroupPostImages from "@/components/GroupPostImages.vue";

export default {
  components: {
    GroupPostImages
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    },
    isEditting: {
      type: Boolean,
      required: true
    },
    onEditting: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      title: "",
      content: ""
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

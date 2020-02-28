<template>
  <v-container>
    <v-card class="mx-auto mb-5" max-width="100%">
      <v-card-text>
        <h3>{{ oneGroup.Selectsubject[0].Category.name }}</h3>
        <div v-for="sub of oneGroup.Selectsubject" :key="sub.id">
          <span>{{ sub.name }}</span>
        </div>
        <p class="display-1 text--primary">{{ oneGroup.name }}</p>
        <p>{{ oneGroup.Master.name }}({{ oneGroup.Master.nickname }}) || {{ oneGroup.Master.email }}</p>
        <v-btn @click="onChangeStatus" :disabled="oneGroup.MasterId !== me.id">{{ statusName }}</v-btn>
        <hr class="my-3" />
        <p>{{ oneGroup.Groupmembers.length }}명 / {{ oneGroup.limit }}명</p>
        <v-card
          class="font-weight-black mx-auto"
          height="300px"
          max-height="500px"
        >{{ oneGroup.intro }}</v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="oneGroup && oneGroup.status !== 1"
          block
          color="yellow accent-1"
          @click="onPostForm"
        >글 쓰기</v-btn>
      </v-card-actions>
    </v-card>
    <group-post-form
      v-if="oneGroup && oneGroup.status === 1 && isPostForm"
      :onPostForm="onPostForm"
    />
    <group-all-posts :groupPosts="groupPosts" />
  </v-container>
</template>

<script>
import GroupPostForm from "@/components/GroupPostForm.vue";
import GroupAllPosts from "@/components/GroupAllPosts.vue";

export default {
  components: {
    GroupPostForm,
    GroupAllPosts
  },
  data() {
    return {
      isPostForm: false
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("groups/oneGroupDetail", {
      groupId: params.id
    });
    await store.dispatch("groups/loadGroupPosts", {
      groupId: params.id,
      reset: true
    });
  },

  methods: {
    onChangeStatus() {
      this.$store.dispatch("groups/changeStatus", {
        userId: this.me.id,
        groupId: this.oneGroup.id
      });
      this.$router.go(-1);
    },
    onPostForm() {
      this.isPostForm = !this.isPostForm;
    },
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("groups/loadGroupPosts", { reset: false });
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    oneGroup() {
      return this.$store.state.groups.oneGroup;
    },
    me() {
      return this.$store.state.users.me;
    },
    statusName() {
      return this.oneGroup.status === 0
        ? "준비 중..."
        : this.oneGroup.status === 1
        ? "진행 중"
        : "끝인데요;;";
    },
    groupPosts() {
      return this.$store.state.groups.groupPosts;
    },
    hasMoreGroupPost() {
      return this.$store.state.groups.hasMoreGroupPost;
    }
  },
  watch: {
    me(value, oldValue) {
      if (!value) {
        this.$router.push({
          path: "/"
        });
      }
    }
  },
  middleware: "authenticated"
};
</script>

<style scoped></style>

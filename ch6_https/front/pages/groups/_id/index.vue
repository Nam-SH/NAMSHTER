<template>
  <v-container>
    <v-card class="mx-auto mb-5" max-width="100%">
      <v-card-text>
        <h3>{{ oneGroup.Selectsubject[0].Category.name }}</h3>
        <div v-for="sub of oneGroup.Selectsubject" :key="sub.id">
          <span>{{ sub.name }}</span>
        </div>
        <div style="display: flex;justify-content: space-between">
          <div class="display-1 text--primary" style="display: flex;">
            <p>{{ oneGroup.name }}</p>
            <v-chip v-if="oneGroup && oneGroup.state === 0" class="ma-2" label>준비 중</v-chip>
            <v-chip v-else-if="oneGroup && oneGroup.state === 1" class="ma-2" color="red" outlined>
              <v-icon left>mdi-fire</v-icon>진행 중...
            </v-chip>
            <v-chip v-else class="ma-2" color="teal" text-color="white">
              <v-icon left>mdi-checkbox-marked-circle</v-icon>종료
            </v-chip>
          </div>
          <v-btn
            aria-label="sign"
            :disabled="oneGroup.MasterId === me.id"
            color="yellow"
            @click.prevent="groupUserInOut"
          >{{ isSignIn }}</v-btn>
        </div>
        <p>
          {{ oneGroup.Master.name }}({{ oneGroup.Master.nickname }}) ||
          {{ oneGroup.Master.email }}
        </p>
        <v-row class="mx-1" justify="space-between">
          <v-btn
            v-if="oneGroup.MasterId === me.id"
            aria-label="name"
            @click.prevent="onChangeState"
          >{{ stateName }}</v-btn>
          <div v-if="oneGroup.MasterId === me.id && oneGroup.state !== 2">
            <div>
              <v-btn aria-label="mod" @click.stop="onEdit" right dark color="blue">수정</v-btn>
              <group-edit-form
                hidden
                :oneGroup="oneGroup"
                :onEdit="onEdit"
                :isEditting="isEditting"
              />
              <div class="mb-4" style="display:inline-block">
                <v-btn aria-label="del" color="primary" @click.prevent="alert = !alert">삭제</v-btn>
              </div>
              <v-alert :value="alert" color="orange" transition="scroll-y-reverse-transition" dark>
                정말로 삭제하실 생각임??
                <v-btn aria-label="del" @click.prevent="onDeleteGroup" dark color="red">삭제</v-btn>
              </v-alert>
            </div>
          </div>
        </v-row>
        <hr class="my-3" />
        <p>{{ oneGroup.Groupmembers.length }}명 / {{ oneGroup.limit }}명</p>
        <v-card class="font-weight-black mx-auto" height="300px" max-height="500px">
          <v-container>{{ oneGroup.intro }}</v-container>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn
          aria-label="post"
          :disabled="(oneGroup && oneGroup.state !== 1) || !isMember"
          block
          color="yellow accent-1"
          @click.prevent="onPostForm"
        >글 쓰기</v-btn>
      </v-card-actions>
    </v-card>
    <group-post-form
      v-if="oneGroup && oneGroup.state === 1 && isPostForm"
      :onPostForm="onPostForm"
    />
    <group-all-posts v-if="isMember" :groupPosts="groupPosts" />
    <div v-else>가나다라마바사</div>
  </v-container>
</template>

<script>
import GroupPostForm from "@/components/GroupPostForm.vue";
import GroupAllPosts from "@/components/GroupAllPosts.vue";
import GroupEditForm from "@/components/GroupEditForm.vue";

export default {
  layout: "group",
  components: {
    GroupPostForm,
    GroupAllPosts,
    GroupEditForm
  },
  data() {
    return {
      isPostForm: false,
      isMember: false,
      alert: false,
      isEditting: false
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
    onChangeState() {
      if (this.oneGroup.state === 2) {
        return;
      }
      this.$store.dispatch("groups/changeState", {
        userId: this.me.id,
        groupId: this.oneGroup.id
      });
    },
    onPostForm() {
      this.isPostForm = !this.isPostForm;
    },
    onEdit() {
      this.isEditting = !this.isEditting;
    },
    onDeleteGroup() {
      this.$store.dispatch("groups/groupDelete", {
        groupId: this.oneGroup.id
      });
    },
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMoreGroupPost) {
          this.$store.dispatch("groups/loadGroupPosts", { reset: false });
        }
      }
    },
    groupUserInOut() {
      this.$store.dispatch("groups/groupUserInOut", {
        userId: this.me.id,
        groupId: this.oneGroup.id
      });
    }
  },
  computed: {
    oneGroup() {
      return this.$store.state.groups.oneGroup;
    },
    me() {
      return this.$store.state.users.me;
    },
    stateName() {
      return this.oneGroup.state === 0
        ? "준비 중..."
        : this.oneGroup.state === 1
        ? "진행 중"
        : "끝인데요;;";
    },
    groupPosts() {
      return this.$store.state.groups.groupPosts;
    },
    hasMoreGroupPost() {
      return this.$store.state.groups.hasMoreGroupPost;
    },
    isSignIn() {
      if (this.oneGroup.Groupmembers.length + 1 > this.oneGroup.limit) {
        this.$toast.error("가입 인원을 초과했는데여;; 가입 못해여;;");
        return;
      }
      if (this.me && this.oneGroup.Groupmembers.find(v => v.id == this.me.id)) {
        this.isMember = true;
        return "탈퇴하기";
      } else {
        this.isMember = false;
        return "가입하기";
      }
    }
  },
  // mounted() {
  //   window.addEventListener("scroll", this.onScroll);
  // },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.onScroll);
  // },
  watch: {
    me(value, oldValue) {
      if (!value) {
        this.$router.push({
          path: "/main"
        });
      }
    }
  },
  middleware: "authenticated"
};
</script>

<style scoped></style>

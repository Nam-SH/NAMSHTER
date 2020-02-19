<template>
  <v-container>
    <v-card class="mx-auto" max-width="100%">
      <v-card-text>
        <div>{{ onegroup.Groupsubjects[0].Category.name }} - {{ onegroup.Groupsubjects[0].name }}</div>
        <p class="display-1 text--primary">{{ onegroup.name }}</p>
        <p>
          {{ onegroup.Master.name }}({{ onegroup.Master.nickname }}) //
          {{ onegroup.Master.email }}
        </p>
        <v-btn @click="onChangeStatus">{{ statusName }}</v-btn>
        <hr />
        <p>{{ onegroup.Groupmembers.length }}명 / {{ onegroup.limit }}명</p>
        <div class="text--primary">{{ onegroup.intro }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">글 쓰기</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch("groups/oneGroupDetail", {
      groupId: params.id
    });
  },
  methods: {
    onChangeStatus() {
      this.$store.dispatch("groups/changeStatus", {
        userId: this.me.id,
        groupId: this.onegroup.id
      });
      this.$router.go(-1);
    }
  },
  computed: {
    onegroup() {
      return this.$store.state.groups.onegroup;
    },
    me() {
      return this.$store.state.users.me;
    },
    statusName() {
      return this.onegroup.status === 0
        ? "준비 중..."
        : this.onegroup.status === 1
        ? "진행 중"
        : "끝인데요";
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

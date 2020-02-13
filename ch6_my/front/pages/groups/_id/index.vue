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
  fetch({ store, params }) {
    store.dispatch("groups/oneGroupDetail", {
      groupId: params.id
    });
  },
  computed: {
    onegroup() {
      return this.$store.state.groups.onegroup;
    }
  },
  middleware: "authenticated"
};
</script>

<style scoped></style>

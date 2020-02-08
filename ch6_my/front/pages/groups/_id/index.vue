<template>
  <v-card>{{ onegroup }}</v-card>
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

<template>
  <div>
    여기는 그룹에 관한 상세정보페이지입니다.
  </div>
</template>

<script>
export default {
  fetch({ store, params }) {
    store.dispatch("groups/oneGroupDetail", {
      groupId: params.id
    });
  },
  computed: {
    name() {
      return this.$store.state.groups.onegroup;
    }
  }
};
</script>

<style scoped></style>

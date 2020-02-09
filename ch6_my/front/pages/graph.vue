<template>
  <v-container fluid>
    <v-sparkline
      :gradient="gradient"
      line-width="2"
      padding="8"
      smooth="10"
      :value="value"
      :labels="labels"
      auto-draw
    ></v-sparkline>

    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    gradient: ["blue", "red", "pink"],
    // 내가 작성한 이번 주 작성한 글
    value: [1, 4, 1, 8, 2, 9, 0],
    labels: ["월", "화", "수", "목", "금", "토", "일"]
  })
};
</script>

<style scoped>
</style>
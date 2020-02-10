<template>
  <v-container>
    <v-card>
      <v-container>
        <v-sparkline
          line-width="2"
          padding="8"
          smooth="10"
          :gradient="gradient"
          :value="calcPost"
          :labels="labels"
          auto-draw
        />
        <v-divider />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    calcPost: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 내가 작성한 이번 주 작성한 글
      gradient: ["blue", "red", "pink"],
      labels: ["월", "화", "수", "목", "금", "토", "일"]
    };
  }
};
</script>

<style scoped></style>

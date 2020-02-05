<template>
  <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(value, i) in grouplist" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{ value }} 리스트</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true
    },
    grouplist: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
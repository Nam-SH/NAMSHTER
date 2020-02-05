<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="flex-wrap;">
      <v-col cols="4" v-for="(group, i) in grouplist" :key="i">
        <v-card class="pa-2" height="300px" outlined tile>{{ group }}</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    grouplist: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
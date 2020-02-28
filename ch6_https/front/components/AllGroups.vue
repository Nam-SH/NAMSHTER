<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="flex-wrap;">
      <v-col cols="12" sm="12" md="12" lg="6" xl="6" v-for="(group, i) in grouplist" :key="i">
        <one-group :group="group" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OneGroup from "@/components/OneGroup.vue";

export default {
  components: {
    OneGroup
  },
  props: {
    grouplist: {
      type: Array,
      required: true
    }
  },
  computed: {}
};
</script>

<style scoped></style>

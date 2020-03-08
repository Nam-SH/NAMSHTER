<template>
  <v-app style="background-color:#E5EFF8">
    <default-nav />
    <!-- 오른쪽 화면 -->
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-card />
        <group-go />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginCard from "~/components/LoginCard";
import GroupGo from "@/components/GroupGo.vue";
import DefaultNav from "@/components/DefaultNav.vue";

export default {
  components: {
    LoginCard,
    GroupGo,
    DefaultNav
  },
  middleware: "authenticated"
};
</script>

<style scoped>
</style>

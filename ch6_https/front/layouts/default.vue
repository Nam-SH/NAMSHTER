<template>
  <v-app style="background-color:#E5EFF8">
    <default-mobile-nav class="hidden_upper_960" />
    <default-nav class="hidden_under_960" />
    <!-- 오른쪽 화면 -->
    <v-row no-gutters>
      <v-col cols="12" lg="4">
        <login-card />
        <group-go />
      </v-col>
      <v-col cols="12" lg="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginCard from "~/components/LoginCard";
import GroupGo from "@/components/GroupGo.vue";
import DefaultNav from "@/components/DefaultNav.vue";
import DefaultMobileNav from "@/components/DefaultMobileNav.vue";

export default {
  components: {
    LoginCard,
    GroupGo,
    DefaultNav,
    DefaultMobileNav
  },
  middleware: "authenticated"
};
</script>

<style scoped>
@media screen and (min-width: 961px) {
  .hidden_upper_960 {
    display: none;
  }
}
@media screen and (max-width: 960px) {
  .hidden_under_960 {
    display: none;
  }
}
</style>

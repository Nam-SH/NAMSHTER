<template>
  <v-container>
    <v-container>
      <v-card>
        <v-container>
          <group-activity />
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card color="#F5F5F5">
        <v-layout style="display: flex">
          <v-container style="flex:1">
            <my-groups :grouplist="myGrouplistBefore" :isState="false" />
          </v-container>
          <v-container style="flex:1">
            <my-groups :grouplist="myGrouplistDoing" :isState="true" />
          </v-container>
        </v-layout>
      </v-card>
    </v-container>
    <br />
    <v-bottom-navigation v-model="navNum" shift>
      <v-btn aria-label="nav" v-for="(item, i) in items" :key="i">
        <span>{{ item.name }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <all-groups
      :grouplist="navNum==0 ? allGroups : navNum == 1 ? beforeGroups : navNum == 2 ? doingGroups : doneGroups"
    />
  </v-container>
</template>

<script>
import MyGroups from "@/components/MyGroups.vue";
import AllGroups from "@/components/AllGroups.vue";
import GroupActivity from "@/components/GroupActivity.vue";

export default {
  layout: "group",
  components: {
    MyGroups,
    AllGroups,
    GroupActivity
  },
  data() {
    return {
      navNum: 0,
      items: [
        { name: "All", icon: "mdi-television-play" },
        { name: "before", icon: "mdi-heart" },
        { name: "doing...", icon: "mdi-book" },
        { name: "done", icon: "mdi-image" }
      ]
    };
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch("groups/myGrouplistBefore"),
      store.dispatch("groups/myGrouplistDoing"),
      store.dispatch("groups/loadAllGroups"),
      store.dispatch("groups/loadBeforeGroups"),
      store.dispatch("groups/loadDoingGroups"),
      store.dispatch("groups/loadDoneGroups"),
      store.dispatch("users/userDetail")
    ]);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    allGroups() {
      return this.$store.state.groups.allGroups;
    },
    beforeGroups() {
      return this.$store.state.groups.beforeGroups;
    },
    doingGroups() {
      return this.$store.state.groups.doingGroups;
    },
    doneGroups() {
      return this.$store.state.groups.doneGroups;
    },

    myGrouplistBefore() {
      return this.$store.state.groups.myGrouplistBefore;
    },
    myGrouplistDoing() {
      return this.$store.state.groups.myGrouplistDoing;
    }
  },
  watch: {
    me(value, oldValue) {
      if (!value) {
        this.$router.push({
          path: "/main"
        });
      }
    }
  },
  middleware: "authenticated"
};
</script>

<style scoped></style>

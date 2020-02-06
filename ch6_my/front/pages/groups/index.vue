<template>
  <v-container>
    <v-layout style="display: flex">
      <v-container style="flex:1">
        <my-groups :grouplist="mygrouplist_before" />
      </v-container>
      <v-container style="flex:1">
        <my-groups :grouplist="mygrouplist_doing" />
      </v-container>
    </v-layout>
    <br />
    <v-bottom-navigation v-model="navNum" shift>
      <v-btn v-for="(item, i) in items" :key="i" @click="onLoadGroup(i)">
        <span>{{ item.name }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <all-groups :grouplist="grouplist" />
  </v-container>
</template>

<script>
import MyGroups from "@/components/MyGroups.vue";
import AllGroups from "@/components/AllGroups.vue";

export default {
  components: {
    MyGroups,
    AllGroups
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
      store.dispatch("groups/myGrouplistDoing")
    ]);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    grouplist() {
      // 나중에 if 0과 else만 있음요
      if (!this.navNum) {
        return this.$store.state.groups.allgrouplist;
      } else if (this.navNum === 1) {
        return this.$store.state.groups.grouplist;
      } else if (this.navNum === 2) {
        return this.$store.state.groups.grouplist1;
      } else {
        return this.$store.state.groups.grouplist2;
      }
    },
    mygrouplist_before() {
      return this.$store.state.groups.mygrouplist_before;
    },
    mygrouplist_doing() {
      return this.$store.state.groups.mygrouplist_doing;
    }
  },
  methods: {
    onLoadGroup(navNum) {
      if (navNum == 0) {
        return this.$store.dispatch("groups/loadAllGroups");
      } else {
        this.$store.dispatch("groups/loadGroups", { statue: navNum - 1 });
      }
    }
  }
};
</script>

<style scoped></style>

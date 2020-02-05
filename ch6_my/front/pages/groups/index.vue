<template>
  <v-container>
    <v-layout style="display: flex">
      <v-container style="flex:1">
        <my-groups :colors="colors1" :grouplist="before" />
      </v-container>
      <v-container style="flex:1">
        <my-groups :colors="colors2" :grouplist="doing" />
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
      ],

      // MyGroups 더미데이터
      colors1: ["black", "yellow"],
      colors2: ["pink", "blue", "indigo", "red"],
      before: ["before 1", "before 2"],
      doing: ["doing 1", "doing 2", "doing 3", "doing 4"]
    };
  },
  computed: {
    grouplist() {
      // 나중에 if 0과 else만 있음요
      if (this.navNum === 0) {
        return this.$store.state.groups.allgrouplist;
      } else if (this.navNum === 1) {
        return this.$store.state.groups.grouplist0;
      } else if (this.navNum === 2) {
        return this.$store.state.groups.grouplist1;
      } else {
        return this.$store.state.groups.grouplist2;
      }
    }
  },
  methods: {
    onLoadGroup(navNum) {
      console.log("bottomNav", navNum);
      console.log("카테고리 찍었어염");
      if (navNum == 0) {
        return this.$store.dispatch("groups/loadAllGroup");
      } else {
        this.$store.dispatch("groups/loadGroup", { statue: navNum - 1 });
      }
    }
  }
};
</script>

<style scoped></style>

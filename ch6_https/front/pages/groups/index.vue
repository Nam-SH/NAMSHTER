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
            <my-groups :grouplist="grouplistBefore" :isState="false" />
          </v-container>
          <v-container style="flex:1">
            <my-groups :grouplist="grouplistDoing" :isState="true" />
          </v-container>
        </v-layout>
      </v-card>
    </v-container>
    <br />
    <v-bottom-navigation v-model="navNum" shift>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        @click.prevent="onLoadGroup(i)"
      >
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
      store.dispatch("groups/grouplistBefore", {
        state: "0"
      }),
      store.dispatch("groups/grouplistDoing", {
        state: "1"
      }),
      store.dispatch("groups/loadAllGroups"),
      store.dispatch("users/userDetail")
    ]);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    grouplist() {
      // 나중에 if 0과 else만 있음요
      if (!this.navNum) {
        return this.$store.state.groups.grouplist;
      } else {
        return this.$store.state.groups.grouplist;
      }
    },
    grouplistBefore() {
      return this.$store.state.groups.grouplistBefore;
    },
    grouplistDoing() {
      return this.$store.state.groups.grouplistDoing;
    }
  },
  methods: {
    async onLoadGroup(navNum) {
      if (navNum == 0) {
        await this.$store.dispatch("groups/loadAllGroups");
        return;
      } else {
        await this.$store.dispatch("groups/loadAllGroups", {
          state: navNum - 1
        });
        return;
      }
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

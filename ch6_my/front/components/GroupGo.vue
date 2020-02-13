<template>
  <v-container>
    <v-card>
      <v-app-bar dark color="black">
        <v-toolbar-title>진행 중인 그룹...</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn v-if="isInIndex" text to="/groups">Go Group</v-btn>
          <group-create v-else />
        </v-card-actions>
      </v-app-bar>

      <v-container v-if="grouplist_doing.length > 0">
        <v-row dense>
          <v-col v-for="group in grouplist_doing" :key="group.id" cols="12">
            <v-card dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <span v-for="(val, key, idx) of group.Groupsubjects[0]" :key="idx">
                    <v-card-title v-if="idx ===1" v-text="val" />
                  </span>
                  <v-card-title class="headline" v-text="group.name" />
                  <v-card-subtitle v-text="group.intro" />
                </div>
                <v-avatar class="ma-3" size="125" tile>
                  <v-img></v-img>
                </v-avatar>
              </div>
              <v-btn :to="`/groups/${group.id}`" right>상세히</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-else>
        <v-row dense>
          <v-col cols="12">
            <v-card dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline">그룹이 추가될 예정...</v-card-title>
                  <v-card-subtitle>조금만 기다려주세요...ㅎ</v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="125" tile>
                  <v-img></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import GroupCreate from "@/components/GroupCreate.vue";

export default {
  components: {
    GroupCreate
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    grouplist() {
      return this.$store.state.groups.grouplist;
    },
    grouplist_doing() {
      return this.$store.state.groups.grouplist_doing;
    },
    isInIndex() {
      return this.$route.name === "index" ? true : false;
    }
  }
};
</script>

<style scoped></style>

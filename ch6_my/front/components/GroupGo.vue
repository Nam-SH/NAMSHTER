<template>
  <v-container>
    <v-card>
      <v-app-bar dark color="black">
        <v-toolbar-title>My Group</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn text to="/groups">Go Group</v-btn>
        </v-card-actions>
      </v-app-bar>

      <v-container>
        <v-row dense>
          <!-- 보여주기 컴포넌트 만들기 -->
          <v-col v-for="group in allgrouplist" :key="group.id" cols="12">
            <v-card dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    allgrouplist() {
      return this.$store.state.groups.allgrouplist;
    }
  },
  fetch({ store }) {
    store.dispatch("groups/loadAllGroups");
  },
  data() {
    return {
      hover: false
    };
  }
};
</script>

<style scoped></style>

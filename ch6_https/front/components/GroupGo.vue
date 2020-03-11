<template>
  <v-container>
    <v-card>
      <v-app-bar color="#81F7F3">
        <v-toolbar-title>
          <strong>진행 중인 그룹...</strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-actions>
          <group-create-form v-if="isInGroups" />
          <v-btn
            v-else
            rounded
            to="/groups"
            color="orange"
            :hidden="onRound"
            @click="onRound = !onRound"
            >Go Group</v-btn
          >
          <div v-if="onRound">
            <v-progress-circular
              :size="30"
              indeterminate
              color="red"
            ></v-progress-circular>
          </div>
        </v-card-actions>
      </v-app-bar>
      <v-container v-if="mainGrouplist && mainGrouplist.length > 0">
        <hr />
        <v-row dense>
          <v-col v-for="group in mainGrouplist" :key="group.id" cols="12">
            <v-card color="#E6E6E6">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <span class="font-weight-bold ml-3"
                    >[{{ group.Selectsubject[0].Category.name }}] ||</span
                  >
                  <span v-for="sub in group.Selectsubject" :key="sub.id">
                    <span>{{ sub.name }}</span>
                  </span>
                  <v-card-title class="headline" v-text="group.name" />
                  <v-card-subtitle v-text="group.intro" />
                </div>
                <v-avatar class="ma-3 my-auto" size="125" tile>
                  <v-img :src="`${srcAddress}/groupimage/${group.src}`"></v-img>
                </v-avatar>
              </div>
              <v-btn :to="`/groups/${group.id}`" block color="#CEE3F6"
                >상세히</v-btn
              >
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
                  <v-card-title class="headline"
                    >그룹이 추가될 예정...</v-card-title
                  >
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
import GroupCreateForm from "@/components/GroupCreateForm.vue";

export default {
  components: {
    GroupCreateForm
  },
  data() {
    return {
      onRound: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainGrouplist() {
      return this.$store.state.groups.mainGrouplist;
    },
    isInGroups() {
      return this.$route.name === "groups" ? true : false;
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  }
};
</script>

<style scoped></style>

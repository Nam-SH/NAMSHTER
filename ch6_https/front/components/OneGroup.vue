<template>
  <v-container>
    <v-card class="d-flex align-content-space-between flex-wrap" color="black" dark height="350px">
      <v-card-title>
        <p class="title">{{ group.name }}</p>
      </v-card-title>
      <v-container>
        <v-card style="height:100px">
          <p>{{ group.intro }}</p>
        </v-card>
        <v-spacer></v-spacer>
        <ul>
          <li>그룹 방장 :: {{ group.Master.name }} ({{ group.Master.nickname }})</li>
          <li>문의 메일 :: {{ group.Master.email }}</li>
          <li>그룹 인원 {{ group.Groupmembers.length }} / {{ group.limit }}</li>
        </ul>
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <!-- <v-img class="elevation-6" :src="group.Master.imgsrc" /> -->
              <img class="elevation-6" src="@/static/donut.png" />
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <v-row style="position:relative;left:30%">
              <v-btn text icon class="ml-3 mr-2">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <group-intro :group="group" />
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import GroupIntro from "@/components/GroupIntro.vue";

export default {
  components: {
    GroupIntro
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    fab: false,
    fling: false,
    tabs: null
  }),
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  }
};
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

div p {
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  line-height: 1em;
  height: 2em;
}
</style>

<template>
  <v-container>
    <v-card class="d-flex align-content-space-between flex-wrap" color="black" dark height="350px">
      <p>{{ group.Groupsubjects[0] }}</p>
      <hr style="color:white" />
      <v-card-title>
        <p class="title">{{ group.name }}</p>
      </v-card-title>
      <v-card-text>그룹 소개 :: {{ group.intro }}</v-card-text>
      <v-container>
        <ul>
          <li>그룹 방장 :: {{ group.Master.name }} ({{ group.Master.nickname }})</li>
          <li>문의 메일 :: {{ group.Master.email }}</li>
          <li>그룹 인원 {{ group.Groupmembers.length }} / {{ group.limit }}</li>
        </ul>
      </v-container>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" :src="group.Master.imgsrc" />
          </v-list-item-avatar>

          <v-row align="center" justify="end">
            <v-btn text>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn
              text
              :groupId="group.id"
              :to="`/groups/${group.id}`"
              style="text-decoration:none"
            >
              <v-icon>mdi-plus</v-icon>
              <strong>들어가기</strong>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
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
</style>

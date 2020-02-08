<template>
  <v-container>
    <v-card class="d-flex align-content-space-between flex-wrap" color="black" dark height="350px">
      <v-card-title>
        <span class="title">{{ group.name }}</span>
      </v-card-title>
      {{ group }}
      <!-- <v-card-text>그룹 소개 :: {{ group.intro }}</v-card-text>
      <p>그룹 방장 :: {{ group.Master.name }} ({{ group.Master.nickname }})</p>
      <p>문의 메일 :: {{ group.Master.email }}</p>
      <p>그룹 인원 {{ group.Groupmember }} / {{ group.limit }}</p>-->

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            />
          </v-list-item-avatar>

          <v-row align="center" justify="end">
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn :groupId="group.id" :to="`/groups/${group.id}`">들어가기</v-btn>
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

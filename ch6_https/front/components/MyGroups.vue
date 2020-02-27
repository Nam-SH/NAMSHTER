<template>
  <v-container outlined>
    <v-row justify="center" align="center">
      <v-chip :color="isState ? 'primary' : 'red'" text-color="white" label>{{ stateName }}</v-chip>
    </v-row>
    <br />
    <v-carousel
      v-if="grouplist && grouplist.length > 0"
      cycle
      height="300"
      show-arrows-on-hover
      progress
      progress-color="blue"
    >
      <v-carousel-item v-for="(group, i) in grouplist" :key="i">
        <v-row class="fill-height" align="center" justify="center">
          <v-container>
            <div>
              <v-card-title>
                <p class="title">
                  <v-badge color="pink" dot>{{ group.name }}</v-badge>
                </p>
              </v-card-title>
              <p>{{ group.intro }}</p>
              <p>그룹 제한:: {{ group.limit }}</p>
            </div>
            <v-btn :groupId="group.id" :to="`/groups/${group.id}`">들어가기</v-btn>
          </v-container>
        </v-row>
        <v-divider></v-divider>
      </v-carousel-item>
    </v-carousel>
    <v-card v-else cycle height="300" progress progress-color="blue">
      <v-container>
        <div>
          <v-card-title>
            <p class="title">그룹이 없어요...</p>
          </v-card-title>
          <p>가입을 하던가...</p>
          <p>그룹을 만들던가...</p>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    grouplist: {
      type: Array,
      required: true
    },
    isState: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    stateName() {
      return this.isState ? "진행 중..." : "시작 전";
    }
  }
};
</script>

<style scoped></style>

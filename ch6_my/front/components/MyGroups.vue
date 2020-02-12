<template>
  <v-container outlined>
    <v-row justify="center" align="center">
      <v-chip :color="isState ? 'red' : 'primary'" text-color="white" label>{{ stateName }}</v-chip>
    </v-row>
    <v-carousel cycle height="300" show-arrows-on-hover progress progress-color="blue">
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
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  props: {
    grouplist: {
      type: Array,
      required: true
    }
  },
  computed: {
    isState() {
      return this.grouplist.length > 0 && this.grouplist[0].status == 0
        ? true
        : false;
    },
    stateName() {
      return this.isState ? "시작 전" : "진행 중...";
    }
  }
};
</script>

<style lang="scss" scoped></style>

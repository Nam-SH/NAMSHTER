<template>
  <v-container outlined>
    <v-row justify="center" align="center">
      <v-chip :color="isState ? 'primary' : 'red'" text-color="white" label>{{ stateName }}</v-chip>
    </v-row>
    <br />
    {{ grouplist }}
    <v-carousel
      v-if="grouplist && grouplist.length > 0"
      cycle
      height="300"
      show-arrows-on-hover
      progress
      progress-color="blue"
    >
      <v-carousel-item v-for="(group, i) in grouplist" :key="i" height="100%">
        <v-row class="fill-height" align="center">
          <v-card height="100%" width="100%">
            <v-container>
              <div>
                <v-card-title>
                  <span>
                    <v-badge color="pink" dot>
                      <strong>{{ group.name }}</strong>
                    </v-badge>
                  </span>
                  <v-spacer></v-spacer>
                  <span style="color:yellow">
                    <i>({{ group.startDate }} ~ {{ group.endDate }})</i>
                  </span>
                </v-card-title>
                <v-container>
                  <div>
                    <p class="target">{{ group.intro }}</p>
                  </div>
                </v-container>
              </div>
              <v-container>
                <div>
                  <span>그룹 인원:: {{ group.Groupmembers.length }}명 / {{ group.limit }}명</span>
                  <v-btn
                    aria-label="go"
                    :groupId="group.id"
                    :to="`/groups/${group.id}`"
                    absolute
                    right
                    color="white"
                    style="color:black"
                  >들어가기</v-btn>
                </div>
              </v-container>
            </v-container>
          </v-card>
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

<style scoped>
.target {
  /* 한 줄 자르기 */
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.8;
  height: 3.6em;
}
</style>

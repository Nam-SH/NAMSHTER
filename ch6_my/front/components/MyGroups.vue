<template>
  <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(group, i) in grouplist" :key="i">
      <v-row class="fill-height" align="center" justify="center">
        <v-container>
          <div>
            <p>그룹아이디:: {{ group.id }}</p>
            <p>그룹이름:: {{ group.name }}</p>
            <p>그룹소개:: {{ group.intro }}</p>
            <p>그룹 제한:: {{ group.limit }}</p>
          </div>
          <v-btn :groupId="group.id" :to="`/groups/${group.id}`"
            >들어가기</v-btn
          >
        </v-container>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    grouplist: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>

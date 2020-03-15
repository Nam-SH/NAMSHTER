<template>
  <div v-if="user">
    <div class="unactive_990">
      <v-row>
        <v-sheet class="mx-auto" elevation="8" style="width: 90%">
          <v-slide-group v-model="model" class="pa-4" active-class="success" show-arrows>
            <v-slide-item v-for="n in 5" :key="n" v-slot:default="{ active, toggle }">
              <v-card
                class="ma-4"
                height="15em"
                width="13em"
                :color="active ? undefined : 'grey lighten-1'"
                @click="toggle"
              >
                <group-activity-content :order="true" :n="n" />
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-row>
    </div>
    <div class="active_990">
      <group-activity-content :order="false" />
    </div>
  </div>
</template>

<script>
import GroupActivityContent from "@/components/GroupActivityContent.vue";

export default {
  components: {
    GroupActivityContent
  },
  data() {
    return {
      model: null
    };
  },
  computed: {
    user() {
      return this.$store.state.users.userDetail;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 990px) {
  .active_990 {
    display: none;
  }
}
@media screen and (min-width: 991px) {
  .unactive_990 {
    display: none;
  }
}
</style>

<template>
  <v-container>
    <v-card color="#F5DA81" height="300px">
      <v-container class="pb-0">
        <v-row class="px-3" justify="space-between" align="center">
          <h3>[{{ group.Selectsubject[0].name }}] {{ group.name }}</h3>
          <span v-if="group.startDate">({{ group.startDate }} ~ {{ group.endDate }})</span>
          <span v-else>(시작 전...)</span>
        </v-row>
      </v-container>
      <v-container>
        <v-card style="height:150px">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-container>
              <p class="target">{{ group.intro }}</p>
            </v-container>
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="`${srcAddress}/groupimage/${group.src}`"></v-img>
              </v-avatar>
            </div>
          </div>
        </v-card>
        <v-spacer class="my-3"></v-spacer>
        <ul>
          <li>그룹 인원 {{ group.Groupmembers.length }} / {{ group.limit }}</li>
        </ul>
        <v-row justify="space-between" align="center">
          <div>
            <v-list-item-avatar class="ma-2" color="grey darken-3">
              <img :src="`${srcAddress}/profile/${group.Master.src}`" />
            </v-list-item-avatar>
            <span>{{ group.Master.name }} ({{ group.Master.nickname }})</span>
          </div>
          <div>
            <v-btn aria-label="like" text icon style="float: left;" @click.prevent="onLikeGroup">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
            <group-intro :group="group" style="float: left;" />
          </div>
        </v-row>
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
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      const target = !!(this.group.GroupLiker || []).find(
        v => v.id === this.me.id
      );
      if (target) {
        return true;
      } else {
        return false;
      }
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    onLikeGroup() {
      if (this.liked) {
        return this.$store.dispatch("groups/groupUnlike", {
          groupId: this.group.id,
          groupState: this.group.state
        });
      } else {
        return this.$store.dispatch("groups/groupLike", {
          groupId: this.group.id,
          groupName: this.group.name,
          groupState: this.group.state
        });
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
  -webkit-line-clamp: 6; /* 라인수 */
  -webkit-box-orient: vertical;
  line-height: 1em;
  height: 6em;
}
p.target {
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.6;
  max-height: 12.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
</style>

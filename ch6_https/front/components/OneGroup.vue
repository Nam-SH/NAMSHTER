<template>
  <v-container>
    <v-card color="#F5DA81" height="350px">
      <v-container class="pb-0">
        <h3>{{ group.name }}</h3>
      </v-container>
      <v-container>
        <v-card style="height:150px">
          <v-container>{{ group.intro }}</v-container>
        </v-card>
        <v-spacer class="my-3"></v-spacer>
        <ul>
          <li>
            그룹 방장 :: {{ group.Master.name }} ({{ group.Master.nickname }})
          </li>
          <li>문의 메일 :: {{ group.Master.email }}</li>
          <li>그룹 인원 {{ group.Groupmembers.length }} / {{ group.limit }}</li>
        </ul>
        <v-row justify="space-between" align="center">
          <div>
            <v-list-item-avatar class="ma-2" color="grey darken-3">
              <img :src="`${srcAddress}/profile/${group.Master.src}`" />
            </v-list-item-avatar>
          </div>
          <div>
            <v-btn text icon style="float: left;">
              <v-icon @click.prevent="onLikeGroup">{{ heartIcon }}</v-icon>
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
  data: () => ({
    fab: false,
    fling: false,
    tabs: null
  }),
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
          groupId: this.group.id
        });
      } else {
        return this.$store.dispatch("groups/groupLike", {
          groupId: this.group.id,
          groupName: this.group.name
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
</style>

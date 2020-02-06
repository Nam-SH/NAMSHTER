<template>
  <v-container>
    <v-card>
      <v-app-bar dark color="black">
        <v-toolbar-title>My Group</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn text to="/groups">Go Group</v-btn>
        </v-card-actions>
      </v-app-bar>

      <v-container>
        <v-row dense>
          <!-- 보여주기 컴포넌트 만들기 -->
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="mygrouplist_doing[i % 2].name"
                  />
                  <v-card-subtitle v-text="mygrouplist_doing[i % 2].intro" />
                </div>
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
              <v-btn :to="`/groups/${mygrouplist_doing[i % 2].id}`" right
                >상세히</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    mygrouplist_doing() {
      return this.$store.state.groups.mygrouplist_doing;
    }
  },
  fetch({ store }) {
    store.dispatch("groups/myGrouplistDoing", {
      userId: this.me.id
    });
  },
  data() {
    return {
      hover: false,
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg"
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        },
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped></style>

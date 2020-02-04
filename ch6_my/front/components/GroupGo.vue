<template>
  <v-card max-width="400" class="mx-auto">
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
                <v-card-title class="headline" v-text="item.title"></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Unlimited music now",
        artist:
          "Listen to your favorite artists and albums whenever and wherever, online and offline."
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Unlimited music now",
        artist:
          "Listen to your favorite artists and albums whenever and wherever, online and offline."
      },
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Unlimited music now",
        artist:
          "Listen to your favorite artists and albums whenever and wherever, online and offline."
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
</style>
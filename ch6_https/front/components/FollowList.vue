<template>
  <v-list>
    <v-col v-for="user in users" :key="user.id" cols="12" md="3" style="display: inline-block">
      <v-list-item>
        <v-list-item-avatar>
          <!-- <span class="white--text headline">{{ user.nickname[0] }}</span> -->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-avatar>
                <img :src="`${srcAddress}/profile/${user.src}`" :alt="user.nickname" v-on="on" />
              </v-avatar>
            </template>
            <ul>
              <li>{{ user.name }}</li>
              <li>{{ user.email }}</li>
            </ul>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-content>
          <nuxt-link :to="`user/${user.id}`" style="text-decoration:none;color:black">
            <v-list-item-title>{{ user.nickname }}</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click.prevent="remove(user.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  computed: {
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  }
};
</script>

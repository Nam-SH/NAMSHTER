<template>
  <!-- <div>
    <nav>
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/profile"> profile </nuxt-link>
      <nuxt-link to="/signup"> signup </nuxt-link>
    </nav>
    profile
  </div>-->
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form>
            <v-text-field label="닉네임" required />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";

export default {
  // layout: 'admin',
  components: {
    FollowList
  }
  // data() {
  //   return {
  //     name: 'Nuxt.js'
  //   }
  // },
  // head () {
  //   return {
  //     title: '프로필'
  //   }
  // }
};
</script>
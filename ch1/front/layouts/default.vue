<template>
  <!-- <div>
    <nav>
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/profile"> profile </nuxt-link>
      <nuxt-link to="/signup"> signup </nuxt-link>
    </nav>
    <nuxt/>
  </div> -->
  <v-app>
    <nav>
      <v-toolbar dark color="blue">
        <v-toolbar-title>
          <nuxt-link to="/">Main</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center' }" />
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup"  :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <!-- 로그인창 -->
        <login-form />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import LoginForm from '~/components/LoginForm';

  export default {
    components: {
      LoginForm,
    }
    
  }
</script>
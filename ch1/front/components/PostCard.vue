<template>
<v-container>
    <v-card style="margin-bottom: 20px">
      <v-image />
      <v-card-text>
        <div>
          <h3> nam </h3>
          <div>안녕하세요. 게시글입니다.</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
  }
</script>
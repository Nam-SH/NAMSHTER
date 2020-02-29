<template>
  <v-row no-gutters>
    <v-container>
      <v-container style="border: 2px solid black; border-radius: 10px;">
        <v-card>
          <v-card>
            <group-post-content :groupPost="groupPost" />
          </v-card>

          <v-card-actions>
            <!-- 좋아요 -->
            <v-btn text color="orange" @click="onClickHeart">
              <v-icon>{{ heartIcon }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn text color="orange" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <div style="background: white">
                <v-btn cark color="orange">수정</v-btn>
                <v-btn cark color="red">삭제</v-btn>
              </div>
            </v-menu>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <v-card color="#F5F5DC">
          <v-card-text class="pb-0">
            <span>실시간 댓글</span>
            <v-btn rounded color="yellow" small right absolute>전체 보기</v-btn>
            <v-divider></v-divider>
            <div class="text--primary">1. well meaning and kindly.</div>
            <div class="text--primary">2. well meaning and kindly.</div>
            <div class="text--primary">3. well meaning and kindly.</div>
            <div class="text--primary">4. well meaning and kindly.</div>
          </v-card-text>
          <v-card-actions class="mt-0 pt-0">
            <v-text-field class="mt-0 pt-0" label="댓글" hide-details>
              <v-btn slot="append" icon small color="primary">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
  </v-row>
</template>

<script>
import GroupPostContent from "@/components/GroupPostContent.vue";

export default {
  components: {
    GroupPostContent
  },
  props: {
    groupPost: {
      type: Object,
      required: true
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      return false;
      // return !!(this.post.Likers || []).find(
      //   v => v.id === (this.me && this.me.id)
      // );
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>

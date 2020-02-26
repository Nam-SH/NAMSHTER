<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-container ref="test">
        <v-card style="margin-bottom: 20px">
          <v-card>
            <group-post-content :groupPost="groupPost" />
          </v-card>

          <v-card-actions>
            <!-- 좋아요 -->
            <v-btn text color="orange">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <!-- 댓글 -->
            <v-btn text color="orange">
              <v-icon>mdi-comment-outline</v-icon>
            </v-btn>

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
      </v-container>
    </v-col>
    <!-- 실시간 댓글 달기 -->
    <v-col cols="12" md="4">
      <v-container>
        <v-card>
          <v-card-text>
            <span>실시간 댓글</span>
            <v-btn rounded color="yellow" small right absolute>전체 보기</v-btn>
            <v-divider></v-divider>
            <div class="text--primary">1. well meaning and kindly.</div>
            <div class="text--primary">2. well meaning and kindly.</div>
            <div class="text--primary">3. well meaning and kindly.</div>
            <div class="text--primary">4. well meaning and kindly.</div>
          </v-card-text>
          <v-card-actions>
            <v-text-field label="댓글" hide-details="auto">
              <v-btn slot="append" icon small color="primary">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-col>
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
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>

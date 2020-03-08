<template>
  <div v-if="user">
    <v-row>
      <!-- 그룹 관련  -->
      <v-col cols="12" md="3">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="250px" class="text-center">
              {{ user.GroupJoined.length }}개의 그룹을 가입함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 v-card--reveal white--text"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.GroupJoined.length > 10
                      ? 10
                      : user.GroupJoined.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}: {{ user.GroupJoined[n - 1].name }}</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 그룹 좋아요 관련 -->
      <v-col cols="12" md="3">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="250px" class="text-center">
              {{ user.LikedGroupPost.length }}개의 그룹을 좋아함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  {{ user.LikedGroupPost }}
                  <!-- <ul
                    class="m-0 text-left"
                    v-for="n in user.Followings.length > 3
                      ? 3
                      : user.Followings.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}: {{ user.Followings[n - 1].nickname }}({{ user.Followings[n - 1].name }})</li>
                  </ul>-->
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 그룹 포스트 관련 -->
      <v-col cols="12" md="3">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="250px" class="text-center">
              {{ user.CreatePost.length }}개의 글을 작성함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.CreatePost.length > 10
                      ? 10
                      : user.CreatePost.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}:<{{ user.CreatePost[n - 1].title }}>({{ $moment(user.CreatePost[n - 1].createdAt).fromNow() }}에 작성함...)</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 글 관련 -->
      <v-col cols="12" md="3">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="250px" class="text-center">
              {{ user.GroupPostComments.length }}개의 댓글을 작성함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n of user.GroupPostComments.length > 10 ? 10 : user.GroupPostComments.length"
                    :key="n - 1"
                  >
                    <li
                      v-if="user.GroupPostComments[n - 1].Group"
                    >{{ n }}:{{ user.GroupPostComments[n - 1].Group.name }}에서 {{ $moment(user.GroupPostComments[n - 1].createdAt).fromNow() }}에 작성함</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.users.userDetail;
    }
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  text-overflow: ellipsis;
}
.target {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6;
  height: 4.8em;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

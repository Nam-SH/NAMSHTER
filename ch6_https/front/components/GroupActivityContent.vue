<template>
  <div>
    <v-row>
      <!-- 그룹 관련  -->
      <v-col v-if="order && n == 1 || !order" cols="12" :md="!order && 4">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="15em" class="text-center">
              {{ user.GroupJoined.length }}개의 그룹을 가입함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 v-card--reveal white--text"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.GroupJoined.length > 9 ? 9 : user.GroupJoined.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번째 - {{ user.GroupJoined[n - 1].state === 0 ? "[준비 중]" : user.GroupJoined[n - 1].state === 1 ? "[진행 중]" : "[완료]" }}: {{ user.GroupJoined[n - 1].name }}</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 그룹 포스트 관련 -->
      <v-col v-if="order && n == 2 || !order" cols="12" :md="!order && 4">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="15em" class="text-center">
              {{ user.CreatePost.length }}개의 글을 작성함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.CreatePost.length > 9 ? 9 : user.CreatePost.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번째 - {{ user.CreatePost[n - 1].title }}에서 ({{ $moment(user.CreatePost[n - 1].createdAt).fromNow() }}에 작성함...)</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 댓글 관련 -->
      <v-col v-if="(order && n == 3) || !order" cols="12" :md="!order && 4">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="15em" class="text-center">
              {{ user.GroupPostComments.length }}개의 댓글을 작성함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n of user.GroupPostComments.length > 9 ? 9 : user.GroupPostComments.length"
                    :key="n - 1"
                  >
                    <li
                      v-if="user.GroupPostComments[n - 1].Group"
                    >{{ n }}번째 - {{ user.GroupPostComments[n - 1].Group.name }}에서 {{ $moment( user.GroupPostComments[n - 1].createdAt ).fromNow() }}에 작성함</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 그룹 좋아요 관련 -->
    </v-row>
    <v-row>
      <v-col v-if="order && n == 4 || !order" cols="12" :md="!order && 6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="15em" class="text-center">
              {{ user.LikedGroup.length }}개의 그룹을 좋아함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out red darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%; color: black"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.LikedGroup.length > 9 ? 9 : user.LikedGroup.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번째 - {{ user.LikedGroup[n - 1].state === 0 ? "[준비 중]" : user.LikedGroup[n - 1].state === 1 ? "[진행 중]" : "[완료]" }}: {{ user.LikedGroup[n - 1].name }}</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 그룹 포스트 좋아요 관련 -->
      <v-col v-if="order && n == 5 || !order" cols="12" :md="!order && 6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="15em" class="text-center">
              {{ user.LikedGroupPost.length }}개의 글을 좋아함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out red darken-3 target v-card--reveal white--text text-start"
                  style="height: 90%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in user.LikedGroupPost.length > 9 ? 9 : user.LikedGroupPost.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번째 - [{{ user.LikedGroupPost[n - 1].title }}]: ({{ $moment(user.LikedGroupPost[n - 1].createdAt).fromNow() }}에 작성함...)</li>
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
  },
  props: {
    order: {
      type: Boolean,
      allowNull: false
    },
    n: {
      type: Number
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
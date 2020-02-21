<template>
  <div>
    <v-row>
      <!-- 팔로우 관련 -->
      <v-col col="6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="100px" class="text-center">
              {{ me.Followings.length }}명을 팔로잉...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 80%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in me.Followings.length > 3 ? 3 : me.Followings.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번: {{ me.Followings[n - 1].nickname }}({{ me.Followings[n - 1].name }})</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
      <!-- 팔로워 관련 -->
      <v-col col="6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="100px" class="text-center">
              {{ me.Followers.length }}명이 나를 팔로워...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 target v-card--reveal white--text text-start"
                  style="height: 80%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in me.Followers.length > 3 ? 3 : me.Followers.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번: {{ me.Followers[n - 1].nickname }}({{ me.Followers[n - 1].name }})</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
        <!--  -->
      </v-col>
    </v-row>
    <v-row>
      <!-- 글 관련 -->
      <v-col col="6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="100px" class="text-center">
              {{ me.Posts.length }}개의 글을 작성함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="target transition-fast-in-fast-out blue darken-3 v-card--reveal white--text"
                  style="max-height: 80%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in me.Posts.length > 3 ? 3 : me.Posts.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번: {{ $moment(me.Posts[n - 1].createdAt).fromNow() }}에 작성함...</li>
                    <!-- <li>{{ n }}번: {{ me.Posts[n - 1].id }} 구현안함</li> -->
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>

      <!-- 그룹 관련  -->
      <v-col col="6">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-card height="100px" class="text-center">
              {{ me.Groupjoined.length }}개의 그룹을 가입함...
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out blue darken-3 v-card--reveal white--text"
                  style="height: 80%;"
                >
                  <ul
                    class="m-0 text-left"
                    v-for="n in me.Groupjoined.length > 3 ? 3 : me.Groupjoined.length"
                    :key="n - 1"
                  >
                    <li>{{ n }}번: {{ me.Groupjoined[n - 1].name }}</li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-hover>
        <!--  -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    me: {
      type: Object,
      required: true
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
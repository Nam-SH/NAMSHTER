<template>
  <div>
    <v-row justify="center">
      <v-btn class="mx-3" aria-label="plus" @click.prevent="dialog = true" text icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="dialog" max-width="550px">
        <v-card>
          <v-row justify="space-between">
            <v-card-title class="ml-5">{{ group.name }}</v-card-title>
            <v-btn
              v-if="!isMaster"
              aria-label="sign"
              class="mr-3"
              color="blue darken-3"
              text
              @click.prevent="groupUserInOut"
            >{{ isSignIn }}</v-btn>
          </v-row>
          <v-card-text>
            현재인원/최대인원: {{ group.Groupmembers.length }}/{{ group.limit }}
            <hr />
            <div>
              <strong>방장 한마디</strong>
              <p>
                안녕하세요 {{ group.Master.name }}입니다.
                <br />같은 목표를 이룹시다!
              </p>
            </div>
            <hr />
            <div>
              <strong>그룹소개</strong>
              <p>{{ group.intro }}</p>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn aria-label="cancle" color="red darken-3" text @click.prevent="dialog = false">취소</v-btn>
            <v-btn aria-label="go" color="blue darken-3" text :to="`/groups/${group.id}`">들어가기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  created() {},
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    isSignIn() {
      return this.me && !!this.group.Groupmembers.find(v => v.id == this.me.id)
        ? "탈퇴하기"
        : "가입하기";
    },
    isMaster() {
      return this.me && this.me.id === this.group.MasterId;
    }
  },
  methods: {
    groupUserInOut() {
      this.$store.dispatch("groups/groupUserInOut", {
        userId: this.me.id,
        groupId: this.group.id
      });
    }
  }
};
</script>

<style scoped>
</style>
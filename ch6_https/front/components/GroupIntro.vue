<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on }" style="width:200px">
        <v-btn text v-on="on" style="text-decoration:none">
          <v-icon>mdi-plus</v-icon>
          <strong>둘러보기</strong>
        </v-btn>
      </template>
      <v-card>
        <v-row>
          <v-card-title class="headline ml-3">{{ group.name }}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!isMaster"
            class="mr-3"
            color="blue darken-3"
            text
            @click="groupUserInOut"
          >{{ isSignIn }}</v-btn>
        </v-row>
        <v-card-text>현재인원/최대인원: {{ group.Groupmembers.length }}/{{ group.limit }}</v-card-text>
        <hr />
        <p class="ml-6">{{ group.intro }}</p>
        <hr />
        <p class="ml-6">
          안녕하세요 {{ group.Master.name }}입니다.
          <br />같은 목표를 이룹시다!
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-3" text @click="dialog = false">취소</v-btn>
          <v-btn color="blue darken-3" text :to="`/groups/${group.id}`">들어가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      dialog: false,
      isMember: false
    };
  },
  created() {},
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    isSignIn() {
      return this.me && !!this.group.Groupmembers.find(v => v.id == this.me.id)
        ? ((this.isMember = false), "탈퇴하기")
        : ((this.isMember = true), "가입하기");
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
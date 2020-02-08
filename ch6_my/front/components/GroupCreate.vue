<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="pink" dark v-on="on">Make Group</v-btn>
        </template>
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-card>
            <v-card-title>
              <span class="headline">그룹 정보</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="groupCategory"
                      :items="['공부', '운동', '취업', '취미']"
                      label="분류"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="groupSubject"
                      :items="['Python', 'JAVA', 'C', 'go', 'Ruby', 'JS', 'HTML', 'CSS', 'Django', 'ML', 'DL']"
                      label="주제"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="groupLimit"
                      :items="['4', '5', '6', '7', '8', '9', '10', '11', '12']"
                      label="제한인원"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="groupName" label="그룹 이름" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="그룹 방장" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="groupIntro"
                      clearable
                      clear-icon="x"
                      label="그룹 소개"
                      counter="300"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
              <v-btn color="blue darken-3" type="submit" @click="dialog = false">만들기</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      groupCategory: null,
      groupSubject: null,
      groupLimit: null,
      groupName: null,
      groupIntro: "다같이 힘내서 해요."
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onSubmitForm() {
      if (
        !this.groupCategory ||
        !this.groupSubject ||
        !this.groupLimit ||
        !this.groupName ||
        !this.groupIntro
      ) {
        alert("빠진 내용이 있잖아요;;");
        return;
      }
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("groups/groupAdd", {
            name: this.groupName,
            intro: this.groupIntro,
            limit: this.groupLimit
          })
          .then(() => {
            this.groupCategory = null;
            this.groupSubject = null;
            this.groupName = null;
            this.groupIntro = null;
            this.groupLimit = null;
          })
          .catch(err => {
            console.error("onSubmitForm :::", err);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
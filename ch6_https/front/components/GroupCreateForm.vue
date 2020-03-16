<template>
  <v-dialog v-model="dialog" persistent max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn aria-label="makegroup" color="pink" dark v-on="on">
        <strong>그룹 만들기</strong>
      </v-btn>
    </template>
    <v-form ref="form" @submit.prevent="onSubmitForm">
      <v-card>
        <v-card-title>
          <span class="headline">그룹 정보</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="groupCategory"
                  :items="['컴퓨터공부', '취업', '운동', '음악', '기타']"
                  label="분류"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete v-model="groupSubject" :items="items" label="주제"></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="groupLimit"
                  :items="['4', '5', '6', '7', '8', '9', '10', '11', '12']"
                  label="제한인원"
                  required
                ></v-select>
              </v-col>
              <v-container>
                <v-text-field v-model="groupName" label="그룹 이름" required></v-text-field>
              </v-container>
              <v-container>
                <v-text-field
                  v-if="me"
                  label="그룹 방장"
                  hide-details
                  readonly
                  :placeholder="this.me.name "
                ></v-text-field>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                    <v-textarea
                      v-model="groupIntro"
                      clearable
                      clear-icon="x"
                      label="그룹 소개"
                      counter="300"
                      rows="10"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-file-input
                      v-model="files"
                      show-size
                      :loading="imageGroupPath ? false : true"
                      hide-details
                      label="File input"
                      prepend-icon="mdi-camera"
                      @change="onChangeImages"
                    ></v-file-input>
                    <br />
                    <strong>그룹이미지</strong>
                    <v-container>
                      <div class="mx-auto" style="width: 180px; height: 180px; overflow: hidden">
                        <img
                          v-if="imageGroupPath"
                          :src="`${srcAddress}/groupimage/${imageGroupPath}`"
                          style="width: 180px; height: auto;"
                        />
                        <v-card v-else height="180px" width="180px">
                          <v-row class="fill-height" align="center" justify="center">
                            <v-icon color="black" size="48" v-text="'mdi-close-circle-outline'"></v-icon>no image...
                          </v-row>
                        </v-card>
                      </div>
                    </v-container>
                    <button
                      v-if="imageGroupPath"
                      style="height:10%"
                      type="button"
                      @click="onRemoveImage()"
                    >삭제</button>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
          <small>*전부 작성해야 되여</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            aria-label="cancle"
            color="blue darken-1"
            type="button"
            text
            @click.prevent="reset"
          >닫기</v-btn>
          <v-btn aria-label="make" color="blue lighten-3" type="submit" @click="dialog = false">만들기</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
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
      groupIntro: "다같이 힘내서 해요.",
      files: []
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    imageGroupPath() {
      return this.$store.state.groups.imageGroupPath;
    },
    items() {
      return this.groupCategory === "컴퓨터공부"
        ? [
            "Python",
            "JAVA",
            "C",
            "go",
            "Django",
            "Vue",
            "HTML",
            "CSS",
            "JS",
            "ML",
            "DL"
          ]
        : this.groupCategory === "취업"
        ? ["한국사", "영어", "컴활", "자소서", "면접"]
        : this.groupCategory === "운동"
        ? [
            "축구",
            "농구",
            "야구",
            "농구",
            "배구",
            "하키",
            "헬스",
            "복싱",
            "레슬링"
          ]
        : this.groupCategory === "음악"
        ? ["성악", "바이올린", "기타", "첼로", "사물놀이", "드럼", "댄스"]
        : ["기타"];
    },
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
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
        this.dialog = true;
        return;
      }
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("groups/groupAdd", {
            name: this.groupName,
            intro: this.groupIntro,
            limit: this.groupLimit,
            subjectName: this.groupSubject
          })
          .then(() => {
            this.groupCategory = null;
            this.groupSubject = null;
            this.groupName = null;
            this.groupIntro = null;
            this.groupLimit = null;
            this.files = [];
          });
      }
    },
    onChangeImages() {
      const imageFormData = new FormData();
      imageFormData.append("image", this.files);
      this.$store.dispatch("groups/uploadGroupImages", imageFormData);
    },
    onRemoveImage() {
      this.$store.commit("groups/removeImagePath", {});
      this.files = [];
    },
    reset() {
      this.files = [];
      this.dialog = false;
      this.groupCategory = null;
      this.groupSubject = null;
      this.groupLimit = null;
      this.groupName = null;
      this.groupIntro = "다같이 힘내서 해요.";
    }
  }
};
</script>

<style scoped>
</style>
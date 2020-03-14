<template>
  <v-row justify="center">
    <v-dialog v-model="isEditting" max-width="600">
      <v-card>
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field v-model="name" label="그룹 이름" required></v-text-field>
            <v-select
              v-model="limit"
              :items="['4', '5', '6', '7', '8', '9', '10', '11', '12']"
              label="제한인원"
              required
            ></v-select>
            <v-textarea v-model="intro" clearable clear-icon="x" label="그룹 소개" counter="300"></v-textarea>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn aria-label="cancle" color="green darken-1" text @click.prevent="onEdit">취소</v-btn>
            <v-btn aria-label="mod" type="submit" color="green darken-1" text>수정</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    onEdit: {
      type: Function,
      required: true
    },
    isEditting: {
      type: Boolean,
      required: true
    },
    oneGroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: null,
      intro: null,
      limit: null
    };
  },
  created() {
    this.name = this.oneGroup.name;
    this.intro = this.oneGroup.intro;
    this.limit = this.oneGroup.limit;
  },
  methods: {
    onSubmitForm() {
      this.$store
        .dispatch("groups/groupEdit", {
          name: this.name,
          intro: this.intro,
          limit: this.limit,
          groupId: this.oneGroup.id
        })
        .then(() => {
          this.onEdit();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
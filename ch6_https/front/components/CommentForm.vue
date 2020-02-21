<template>
    <v-container>
      <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
        <v-rating v-model="score" hover></v-rating> 
        <v-text-field 
          v-model="content"
          filled
          auto-grow
          label="댓글 달아요!"
          :hide-details="hideDetails"
          :success="success"
          :success-messages="successMessages"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="blue" absolute right>댓글 작성</v-btn>
      </v-form>
    </v-container>
</template>

<script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    data() {
      return {
        valid: false,
        hideDetails: true,
        success: false,
        successMessages: '',
        content: '',
        score: 0,
      }
    },
    methods: {
      onChangeTextarea(value) {
        if (value.length) {
          this.hideDetails = true;
          this.success = false;
          this.successMessages = '';
        } 
      },
      onSubmitForm() {
        if (!this.score) {
          alert('스코어 입력해야죠;;')
          return;
        }
        if (!this.content.trim()) {
          alert('내용 입력해야죠;;')
          return;
        }
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/addComment', {
            postId: this.postId,
            content: this.content,
            score: this.score,
          })
          .then(() => {
            this.content = '';
            this.score = 0;
            this.success = true;
            this.successMessages = '댓글이 작성되었어요.'
            this.hideDetails = false;
          })
          .catch((err) => {
            console.error('onSubmitForm :::', err)
            alert('댓글 작성 에러요;;')
          })
        }
      }
    },
  }
</script>
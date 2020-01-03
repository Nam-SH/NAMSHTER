<template>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-text-field 
        v-model="content"
        filled
        auto-grow
        label="댓글 달아요!"
        :hide-details="hideDetails"
        :success-messages="successMessages"
        :success="success"
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
        type: String,
        required: true,
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    data() {
      return {
        valid: '',
        hideDetails: true,
        success: false,
        successMessages: '',
        content: ''
      }
    },
    methods: {
      onChangeTextarea(value) {
        if (value.length) {
          this.hideDetails = true,
          this.success = false,
          this.successMessages = ''
        } 
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/addComment', {
            id: Date.now(),
            postId: this.postId,
            content: this.content,
            User: {
              nickname: this.me.nickname,
              email: this.me.email
            }
          })
          .then(() => {
            this.content = '';
            this.success = true;
            this.successMessages = '댓글이 작성되었어요.'
            this.hideDetails = false;
          })
          .catch(() => {
            alert('댓글 작성 에러요;;')
          })
        }
      }
    },
  }
</script>
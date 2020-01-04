<template>
  <v-card style="margin-bottom: 20px;" >
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea 
        v-model="content"
        outlined
        auto-grow
        clearable
        label="무슨 일이 있었나요?"
        :hide-details="hideDetails"
        :success-messages="successMessages"
        :success="success"
        :rules="[v => !!v || '내용을 입력하세요']"
        @input="onChangeTextarea"
        />
        <!-- :rules="[v => !!v.trim || '내용을 입력하세요']" -->
        <v-btn type="submit" color="blue" absolute right>제출</v-btn>
        <v-btn>이미지 업로드</v-btn>
        <v-btn>동영상 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        valid: false, 

        hideDetails: true,
        successMessages: '',
        success: false,
        
        content: ''
      }
    },
    computed: {
      ...mapState('users', ['me'])
    },
    methods: {
      onChangeTextarea() {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = '';
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/add', {
            content: this.content,
            User: {
              nickname: this.me.nickname,
              email: this.me.email,
            },
            Comments: [],
            Images: [],
            Video: [],
            id: Date.now(),
            createdAt: Date.now(),
          })
          .then(() => {
            this.content = '';
            this.hideDetails = false;
            this.success = true;
            this.successMessages = '게시글 등록 성공!';
          })
        }
      }
    },
  }
</script>
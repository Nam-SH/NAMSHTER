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
        :rules="[v => !!v.trim() || '내용을 입력하세요']"
        @input="onChangeTextarea"
        />
        <!-- :rules="[v => !!v.trim || '내용을 입력하세요']" -->
        <v-btn type="submit" color="blue" absolute right>제출</v-btn>
        
        <!-- 이미지데이터 추가 -->
        <input ref="imageInput" type="file" multiple hidden @change="onChangeImages" >
        <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
        <div>
          <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
            <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px">
            <div>
              <button type="button" @click="onRemoveImage(i)">제거</button>
            </div>
          </div>
        </div>

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
      ...mapState('users', ['me']),
      ...mapState('posts', ['imagePaths'])
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
            createdAt: Date.now(),
          })
          .then(() => {
            this.content = '';
            this.hideDetails = false;
            this.success = true;
            this.successMessages = '게시글 등록 성공!';
          })
        }
      },

      onClickImageUpload() {
        this.$refs.imageInput.click()
      },
      onChangeImages(e) {
        // console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);
          // { image: [file1, file2 ...] } 의 모양이 만들어진다.
        });
        this.$store.dispatch('posts/uploadImages', imageFormData);
      },

      onRemoveImage(index) {
        this.$store.commit('posts/removeImagePath', index);
      }
    },
  }
</script>
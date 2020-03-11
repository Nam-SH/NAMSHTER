import Vue from 'vue';
import throttle from 'lodash.throttle'

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
  calcPost: [],
});

export const mutations = {
  addMainPost(state, payload) {
    this.state.users.me.Posts.unshift({
      id: payload.id,
      createdAt: payload.createdAt
    })

    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },

  removeMainPost(state, payload) {
    let targetIndex = this.state.users.me.Posts.findIndex(v => v.id == payload)
    Vue.delete(this.state.users.me.Posts, targetIndex)
    targetIndex = state.mainPosts.findIndex(v => v.id === payload);
    state.mainPosts.splice(targetIndex, 1);
  },

  editMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[targetIndex].content = payload.content
    state.mainPosts[targetIndex].updatedAt = payload.updateTime
  },

  addComment(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[targetIndex].Comments.unshift(payload)
  },

  deleteComment(state, payload) {
    const targetPostIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    const targetCommentIndex = state.mainPosts[targetPostIndex].Comments.findIndex(v => v.id === payload.commentId);
    Vue.delete(state.mainPosts[targetPostIndex].Comments, targetCommentIndex)
  },

  thisWeekPost(state, payload) {
    const monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDate()
    let calcPost = new Array(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).fill(0)

    if (payload) {
      let howManyPost = []
      for (let val of payload) {
        howManyPost.push(val.substr(8, 2))
      }
      for (let day of howManyPost) {
        calcPost[parseInt(day, 10) - parseInt(monthFirstDay, 10)] += 1;
      }
      return state.calcPost = calcPost
    }

    state.calcPost = []
  },

  // 글 하나 불러오기
  loadPost(state, payload) {
    state.mainPosts = [payload]
  },
  // 글 전체 불러오기
  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data
    } else {
      state.mainPosts = state.mainPosts.concat(payload.data)
    }
    state.hasMorePost = payload.data.length === 10;
  },

  // 댓글 요청하기
  loadComments(state, payload) {
    const targetindex = state.mainPosts.findIndex(v => v.id === payload.postId)
    Vue.set(state.mainPosts[targetindex], 'Comments', payload.data);
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },

  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1)
  },

  // 좋아요
  likePost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    state.mainPosts[targetIndex].Likers.push({
      id: payload.userId,
    })
  },

  // 싫어요
  unlikePost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    const targetUserIndex = state.mainPosts[targetIndex].Likers.findIndex(v => v.id === payload.userId)
    state.mainPosts[targetIndex].Likers.splice(targetUserIndex, 1);
  }
};

export const actions = {

  // 글 작성
  add({
    commit,
    state
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.post('/post', {
        content: payload.content,
        image: state.imagePaths
      }, {
        withCredentials: true
      })
      .then((res) => {
        console.log(' res.data', res.data);

        commit('addMainPost', res.data)
        before.goAway(1500)
        this.$toast.success('포스트 작성 완료', {
          duration: 2000
        })
      })
      .catch((err) => {
        // console.error('add:::', err)
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },

  // 삭제 구현
  remove({
    commit
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.delete(`/post/${payload.postId}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('removeMainPost', res.data)
        before.goAway(1500)
        this.$toast.success('글 삭제 완료', {
          duration: 2000
        })
      })
      .catch((err) => {
        // console.error('remove:::', err)
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },

  edit({
    commit
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.patch(`/post/${payload.postId}`, {
        content: payload.content
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('editMainPost', {
          postId: payload.postId,
          content: res.data.content,
          updateTime: res.data.updateTime
        })
        before.goAway(1500)
        this.$toast.success('글 수정 완료', {
          duration: 2000
        })
      })
      .catch((err) => {
        // console.error('edit :::', err);
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },

  addComment({
    commit
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.post(`/post/${payload.postId}/comment`, {
        content: payload.content,
        score: payload.score,
      }, {
        withCredentials: true
      })
      .then((res) => {
        before.goAway(1500)
        this.$toast.success('댓글 작성 완료', {
          duration: 2000
        })
        commit('addComment', res.data)
      })
      .catch((err) => {
        // console.error('addComment:::', err)
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },
  deleteComment({
    commit
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.delete(`/post/${payload.postId}/comment/${payload.commentId}`, {
        withCredentials: true
      })
      .then((res) => {
        before.goAway(1500)
        this.$toast.success('댓글 삭제 완료', {
          duration: 2000
        })
        commit('deleteComment', {
          postId: payload.postId,
          commentId: res.data
        })
      })
      .catch((err) => {
        // console.error('deleteComment:::', err)
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },

  // 글 한개 불러오기
  async loadPost({
    commit
  }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload}`, {
        withCredentials: true
      })
      commit('loadPost', res.data)
    } catch (err) {
      console.error('loadPost :::', err)
    }
  },

  thisWeekPost({
    commit
  }, payload) {
    return this.$axios.get('/posts/thisweek', {
        withCredentials: true
      })
      .then((res) => {
        commit('thisWeekPost', res.data)
      })
      .catch((err) => {
        console.error('thisWeekPost :::', err);
      })
  },

  // 전체 글 불러오기 - 쓰로틀링 설정
  loadPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false
        });
        return;
      }
    } catch (err) {
      console.error('loadPosts :::', err)
    }
  }, 3000),

  // 유저 글 가져오기
  loadUserPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/user/${payload.userId}/posts?limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1]
        const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadUserPosts :::', err)
    }
  }, 3000),

  // 해시태그 가져오기
  loadHashtagPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1]
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadHashtagPosts :::', err)
    }
  }, 3000),


  // 댓글 요청하기
  loadComments({
    commit
  }, payload) {
    return this.$axios.get(`/post/${payload.postId}/comments`, {
        withCredentials: true
      })
      .then((res) => {
        commit('loadComments', {
          postId: payload.postId,
          data: res.data,
        })
      })
      .catch((err) => {
        console.error('loadComments :::', err)
      });
  },

  // 이미지 업로드
  uploadImages({
    commit
  }, payload) {
    return this.$axios.post('/post/images', payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit('concatImagePaths', res.data);
      })
      .catch((err) => {
        console.error('uploadImages:::', err)
      })
  },

  // 좋아요
  likePost({
    commit
  }, payload) {
    return this.$axios.post(`/post/${payload.postId}/like`, {}, {
        withCredentials: true
      })
      .then((res) => {
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        })
      })
      .catch((err) => {
        console.error('likePost:::', err)
      })
  },

  // 싫어요
  unlikePost({
    commit
  }, payload) {
    return this.$axios.delete(`/post/${payload.postId}/like`, {
        withCredentials: true
      })
      .then((res) => {
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        })
      })
      .catch((err) => {
        console.error('unlikePost:::', err)
      })
  },

  // 리트윗
  retweet({
    commit
  }, payload) {
    let before = this.$toast.show('진행 중...')
    return this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
        withCredentials: true
      })
      .then((res) => {
        commit('addMainPost', res.data)
        before.goAway(1500)
        this.$toast.success('리트윗 완료', {
          duration: 2000
        })
      })
      .catch((err) => {
        // console.error('retweet:::', err)
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  }
}
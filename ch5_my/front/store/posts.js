import Vue from 'vue';
import throttle from 'lodash.throttle'

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },

  removeMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload);
    state.mainPosts.splice(targetIndex, 1);
  },

  editMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);    
    state.mainPosts[targetIndex].content = payload.content
  },

  addComment(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[targetIndex].Comments.unshift(payload)
  },
  
  // 글 하나 불러오기
  loadPost(state, payload) {
    state.mainPosts = [payload]
  },

  // 글 전체 불러오기
  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data  
    }
    else {
      state.mainPosts = state.mainPosts.concat(payload.data)
    }
    state.hasMorePost =  payload.data.length === 10;
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
  add({ commit, state }, payload ) {
    return this.$axios.post('/post', 
      { content : payload.content, 
        image : state.imagePaths },
      { 
        withCredentials: true 
    })
    .then((res) => {
      commit('addMainPost', res.data)
    })
    .catch((err) => {
      console.error('add :::', err)
    })
  },

  // 삭제 구현
  remove({ commit }, payload) {
    return this.$axios.delete(`/post/${payload.postId}`, {
      withCredentials: true
    })
    .then((res) => {
      commit('removeMainPost', payload.postId)
    })
    .catch((err) => {
      console.error('remove :::', err)
    })
  },

  edit({ commit }, payload) {
    return this.$axios.patch(`/post/${payload.postId}`, 
      { content: payload.content }, 
      { withCredentials: true 
    })
    .then((res) => {
      commit('editMainPost', { postId: payload.postId, content: res.data})
    })
    .catch((err) => {
      console.error('edit :::', err);
      
    })
  },

  addComment({ commit }, payload ) {
    return this.$axios.post(`/post/${payload.postId}/comment`, {
      content: payload.content,
      score: payload.score,
    }, { 
      withCredentials: true 
    })
    .then((res) => {
      commit('addComment', res.data)
    })
    .catch((err) => {
      console.error('addComment :::', err)
    })
  },

  // 글 한개 불러오기
  async loadPost({ commit }, payload) {
    try {      
      const res = await this.$axios.get(`/post/${payload}`)      
      commit('loadPost', res.data)
    }
    catch (err) {
      console.error('loadPost :::', err)
    }
  },

  // 쓰로틀링 설정
  loadPosts: throttle( async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?&limit=10`)
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`)
        commit('loadPosts', {
          data: res.data,
          reset: false
        });
        return;
      }
    }
    catch (err) {
      console.error('loadPosts :::', err)
    }
  }, 3000),

  // 다른 사람 글 가져오기
  loadUserPosts: throttle( async function({ commit, state }, payload) {
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
        const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}&limit=10`)
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    }
    catch (err) {
      console.error('loadUserPosts :::', err)
    }
  }, 3000),

  // 해시태그 가져오기
  loadHashtagPosts: throttle( async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?limit=10`)
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1]
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?lastId=${lastPost && lastPost.id}&limit=10`)
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    }
    catch (err) {
      console.error('loadHashtagPosts :::', err)
    }
  }, 3000),


  // 댓글 요청하기
  loadComments({ commit}, payload ) {
    return this.$axios.get(`/post/${payload.postId}/comments`)
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
  uploadImages({ commit }, payload) {
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
  likePost({ commit }, payload) {
    return this.$axios.post(`/post/${payload.postId}/like`, {}, {
      withCredentials: true
    })
    .then((res) => {
      // res.data에는 userId가 들어있다.
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
  unlikePost({ commit }, payload) {
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
  retweet({ commit }, payload) {
    return this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
      withCredentials: true
    })
    .then((res) => {
      // res.data에는 리트윗한 나의 User id, nickname
      // 원본글의 Id와, 글 작성자의 User id, nickname, 글의 image 주소가 들어있다.
      commit('addMainPost', res.data)
    })
    .catch((err) => {
      console.error('retweet:::', err)
      // 작성한 에러메시지
      alert(err.response.data)
    })
  }
}
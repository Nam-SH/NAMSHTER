export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

// const totalPosts = 51;
const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    // 지울 targetId와 같은 id를 mainPosts에서 찾는다.
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(targetIndex, 1);
  },
  editMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.id);
    const targetContent = payload.content
    state.mainPosts.splice(targetIndex, 1, targetContent);
  },

  addComment(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[targetIndex].Comments.unshift(payload)
  },

  loadPosts(state, payload) {
    // const diff = totalPosts - state.mainPosts.length;
    // const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
    //   id: Math.random().toString(),
    //   User: {
    //     id: 1,
    //     nickname: '남승현 리미트'
    //   },
    //   content: 'ㅎㅇ',
    //   Comments: [],
    //   Images: [],
    // }));
    // state.mainPosts = state.mainPosts.concat(fakePosts)
    // state.hasMorePost =  state.mainPosts.length === limit;
    state.mainPosts = state.mainPosts.concat(payload)
    state.hasMorePost =  payload.length === limit;
  },

  // 댓글 요청하기
  loadComments(state, payload) {
    const targetId = state.mainPosts.findIndex(v => v.id === payload.postId)
    console.log(mainPosts[targetId])
    state.mainPosts[targetId].Comments.unshift(payload.payload)
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },

  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1)
  },

  // 좋아요
  likePost(state, payload) {
    // payload에는 userId, postID가 들어있다.
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    return state.mainPosts[targetIndex].Likers.push({
      id: payload.userId,
    })
  },

  // 싫어요
  unlikePost(state, payload) {
    // payload에는 userId, postID가 들어있다.
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    const targetUserIndex = state.mainPosts[targetIndex].Likers.findIndex(v => v.id === payload.userId)
    return state.mainPosts[targetIndex].Likers.splice(targetUserIndex, 1);
  }
};

export const actions = {

  // 글 작성
  add({ commit, state }, payload ) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios.post('/post', 
      { content : payload.content, 
        image : state.imagePaths },
      { 
        withCredentials: true 
    })
    .then((res) => {
      commit('addMainPost', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  // 삭제 구현
  remove({ commit }, payload) {
    this.$axios.delete(`/post/${payload.postId}`, {
      withCredentials: true
    })
    .then((res) => {
      commit('removeMainPost', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  edit({ commit }, payload) {
    commit('editMainPost', payload)
  },

  addComment({ commit }, payload ) {
    this.$axios.post(`/post/${payload.postId}/comment`, {
      content: payload.content
    }, { withCredentials: true 
    })
    .then((res) => {
      commit('addComment', payload)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  // 게시물 요청하기
  // loadPosts({ commit, state }) {
  //   if (state.hasMorePost) {
  //     commit('loadPosts');
  //   }
  // },

  // 게시물 요청하기
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      this.$axios.get(`/posts?offset=${state.mainPosts.length}&limit=10`)
      .then((res) => {
        commit('loadPosts', res.data);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },

  // 댓글 요청하기
  loadComments({ commit}, payload ) {
    this.$axios.get(`/post/${payload.postId}/comments`)
    .then((res) => {
      commit('loadComments', res.data)
    })
    .catch((err) => {
      console.error(err)
    });
  },

  // 이미지 업로드
  uploadImages({ commit }, payload) {
    this.$axios.post('/post/images', payload, {
      withCredentials: true,
    })
    .then((res) => {
      commit('concatImagePaths', res.data);
    })
    .catch((err) => {
      console.error(err)
    })
  },

  // 좋아요
  likePost({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/like`, {}, {
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
      console.error(err)
    })
  },

  // 싫어요
  unlikePost({ commit }, payload) {
    this.$axios.delete(`/post/${payload.postId}/unlike`, {
      withCredentials: true
    })
    .then((res) => {
      commit('unlikePost', {
        userId: res.data.userId,
        postId: payload.postId,
      })
    })
    .catch((err) => {
      console.error(err)
    })
  },

  // 리트윗
  retweet({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
      withCredentials: true
    })
    .then((res) => {
      // res.data에는 리트윗한 나의 User id, nickname
      // 원본글의 Id와, 글 작성자의 User id, nickname, 글의 image 주소가 들어있다.
      commit('addMainPost', res.data)
    })
    .catch((err) => {
      console.error(err)
      // 작성한 에러메시지
      alert(err.response.data)
    })
  }
}
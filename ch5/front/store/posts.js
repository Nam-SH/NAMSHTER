export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

const totalPosts = 51;
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
    const diff = totalPosts - state.mainPosts.length;
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

    state.mainPosts = state.mainPosts.concat(payload)
    state.hasMorePost = diff > limit
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
  }
};

export const actions = {

  // 글 작성
  add({ commit, state }, payload ) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios.post('http://localhost:3085/post', 
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
    this.$axios.delete(`http://localhost:3085/post/${payload.postId}`, {
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
    this.$axios.post(`http://localhost:3085/post/${payload.postId}/comment`, {
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
  loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      this.$axios.get('http://localhost:3085/posts')
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
    this.$axios.get(`http://localhost:3085/post/${payload.postId}/comments`)
    .then((res) => {
      commit('loadComments', res.data)
    })
    .catch((err) => {
      console.error(err)
    });
  },

  // 이미지 업로드
  uploadImages({ commit }, payload) {
    this.$axios.post('http://localhost:3085/post/images', payload, {
      withCredentials: true,
    })
    .then((res) => {
      commit('concatImagePaths', res.data);
    })
    .catch((err) => {
      console.error(err)
    })
  },
}
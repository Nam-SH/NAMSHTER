export const state = () => ({
  // name: 'posts',
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
  // bye(state) {
  //   state.name = 'goodbye posts';
  // }
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, targetId) {
    // 지울 targetId와 같은 id를 mainPosts에서 찾는다.
    const targetIndex = state.mainPosts.findIndex(v => v.id === targetId);
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

  loadPosts(state) {
    const diff = totalPosts - state.mainPosts.length;
    const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      User: {
        id: 1,
        nickname: '남승현 리미트'
      },
      content: 'ㅎㅇ',
      Comments: [],
      Images: [],
    }));
    state.mainPosts = state.mainPosts.concat(fakePosts)
    state.hasMorePost = diff > limit
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },

  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1)
  }
};

export const actions = {
  add({ commit, state }, payload ) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios.post('http://localhost:3085/post', 
      { content : payload.content, imagePaths : state.imagePaths },
      { withCredentials: true 
    })
    .then((res) => {
      commit('addMainPost', res.data)
    })
    .catch((err) => {
      console.error('add:::', err)
    })
  },

  remove({ commit }, targetId) {
    commit('removeMainPost', targetId)
  },

  edit({ commit }, payload) {
    commit('editMainPost', payload)
  },

  addComment({ commit }, payload ) {
    commit('addComment', payload)
  },

  loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  },

  // 이미지 업로드
  uploadImages({ commit }, payload ) {
    this.$axios.post('http://localhost:3085/post/images', payload, {
      withCredentials: true,
    })
    .then((res) => {
      commit('concatImagePaths', res.data);
    })
    .catch((err) => {
      console.error('uploadImages:::', err)
    })
  }
}
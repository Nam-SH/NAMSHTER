export const state = () => ({
  // name: 'posts',
  mainPosts: [],
});

export const mutations = {
  // bye(state) {
  //   state.name = 'goodbye posts';
  // },
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload)
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
  }
};

export const actions = {
  add({ commit }, payload ) {
    // 서버에 게시글 등록 요청 보냄
    commit('addMainPost', payload)
  },

  remove({ commit }, targetId) {
    commit('removeMainPost', targetId)
  },

  edit({ commit }, payload) {
    commit('editMainPost', payload)
  },

  addComment({ commit }, payload ) {
    commit('addComment', payload)
  }
}
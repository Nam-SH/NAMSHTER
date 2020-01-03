export const state = () => ({
  // name: 'posts',
  mainPosts: [],

  hasMorePost: true
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
  // bye(state) {
  //   state.name = 'goodbye posts';
  // }
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
  },

  loadPosts(state) {
    // const fakePosts = Array(limit).fill().map(v => ({
    
    const diff = totalPosts - state.mainPosts.length;
    const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
      User: {
        id: Math.random().toString(),
        nickname: '남승현 리미트'
      },
      content: 'ㅎㅇ',
      Comments: [],
      Images: [],
      Video: [],
    }));
    state.mainPosts = state.mainPosts.concat(fakePosts)
    state.hasMorePost = diff > limit
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
  },

  loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  }
}
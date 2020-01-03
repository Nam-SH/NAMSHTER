export const state = () => ({
  me: null,
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },

  changeNickname(state, payload) {
    state.me.nickname = payload.nickname
  }
}

export const actions = {
  // signUp(context, payload) {
  signUp({ commit }, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    commit('setMe', payload)
  },
  logIn({ commit }, payload) {
    commit('setMe', payload)
  },
  logOut({ commit }) {
    commit('setMe', null)
  },

  changeNickname({ commit }, payload) {
    commit('changeNickname', payload)
  }
}
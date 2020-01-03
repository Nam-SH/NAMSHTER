export const state = () => ({
  me: null,
  followerList: [
    // {
    // id: 1,
    // nickname: '1번'
    // }, {
    // id: 2,
    // nickname: '2번'
    // }, {
    // id: 3,
    // nickname: '3번'
    // }
  ],
  
  followingList: [
    // {
    // id: 4,
    // nickname: '4번'
    // }, {
    // id: 5,
    // nickname: '5번'
    // }, {
    // id: 6,
    // nickname: '6번'
    // }
  ],

  hasMoreFollowing: true,
  hasMoreFollower: true,
});

const totalFollowings = 8;
const totalFollowers = 6;
const limit = 3;

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },

  changeNickname(state, payload) {
    state.me.nickname = payload.nickname
  },

  addFollower(state, payload) {
    state.followerList.push(payload)
  },
  addFollowing(state, payload) {
    state.followingList.push(payload)
  },
  removeFollower(state, payload) {
    const targetIndex = state.followerList.findIndex(v => v.id === payload.id)
    state.followerList.splice(targetIndex, 1)
  },
  removeFollowing(state, payload) {
    const targetIndex = state.followingList.findIndex(v => v.id === payload.id)
    state.followingList.splice(targetIndex, 1)
  },
  
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map( v=> ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000).toString(),
    }))
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = diff > limit;
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v=> ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000).toString(),
    }))
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = diff > limit;
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
  },


  addFollowing({ commit }, payload) {
    commit('addFollowing', payload)
  },
  addFollower({ commit }, payload) {
    commit('addFollower', payload)
  },
  removeFollowing({ commit }, payload) {
    commit('removeFollowing', payload)
  },
  removeFollower({ commit }, payload) {
    commit('removeFollower', payload)
  },


  loadFollowers({ commit, state }) {
    if (state.hasMoreFollower) {
      commit('loadFollowers');
    }
  },
  loadFollowings({ commit, state }) {
    if (state.hasMoreFollowing) {
      commit('loadFollowings');
    }
  }

}
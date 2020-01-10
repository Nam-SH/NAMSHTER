export const state = () => ({
  me: null,
  followerList: [],  
  followingList: [],
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

  // addFollower(state, payload) {
  //   state.followerList.push(payload)
  // },
  // addFollowing(state, payload) {
  //   state.followingList.push(payload)
  // },
  // removeFollower(state, payload) {
  //   const targetIndex = state.followerList.findIndex(v => v.id === payload.userId)
  //   state.followerList.splice(targetIndex, 1)
  // },
  // removeFollowing(state, payload) {
  //   const targetIndex = state.followingList.findIndex(v => v.id === payload.userId)
  //   state.followingList.splice(targetIndex, 1)
  // },
  follower(state, payload) {
    state.me.Followers.push({id: payload.userId})
  },

  following(state, payload) {
    state.me.Followings.push({id: payload.userId})
  },

  unfollower(state, payload) {
    const targetIndex = state.me.Followers.findIndex(v => v.id === payload.userId)
    state.Followers.splice(targetIndex, 1)
  },

  unfollowing(state, payload) {
    const targetIndex = state.me.Followings.findIndex(v => v.id === payload.userId)
    state.me.Followings.splice(targetIndex, 1)
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
  },
}

export const actions = {

  // 사용자정보 가져오기
  async loadUser({ commit }) {
    try {
      const res = await this.$axios.get('/user', { 
        withCredentials: true 
      });
      commit('setMe', res.data)
    }
    catch (err) {
      console.error('loadUser:::', err);
    }
  },

  signUp({ commit }, payload) {
    this.$axios.post('/user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    }, {
      withCredentials: true,
    })
    .then((res)=> {
      commit('setMe', res.data)
    })
    .catch((err) => {
      console.error('signUp:::', err);
    });
  },

  logIn({ commit }, payload) {
    this.$axios.post('/user/login', {
      email: payload.email,
      password: payload.password
    },{
      withCredentials: true
    })
    .then((res) => {
      commit('setMe', res.data);
    })
    .catch((err) => {
      console.error('logIn:::', err)
    })
  },

  logOut({ commit }) {
    this.$axios.post('/user/logout', {}, {
      withCredentials: true,
    })
    .then((res) => {
      commit('setMe', null);
    })
    .catch((err) => {
      console.error('logOut:::', err)
    })
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload)
  },
  // addFollowing({ commit }, payload) {
  //   commit('addFollowing', payload)
  // },
  // addFollower({ commit }, payload) {
  //   commit('addFollower', payload)
  // },
  // removeFollowing({ commit }, payload) {
  //   commit('removeFollowing', payload)
  // },
  // removeFollower({ commit }, payload) {
  //   commit('removeFollower', payload)
  // },

  // 팔로잉, 팔로워
  follow({ commit }, payload) {
    this.$axios.post(`/user/${payload.userId}/follow`, {}, {
      withCredentials: true
    })
    .then((res) => {
      commit('following', {userId: payload.userId})
    })
    .catch((err) => {
      console.error(err);
    })
  },
  unfollow({ commit }, payload) {
    this.$axios.delete(`/user/${payload.userId}/follow`, {
      withCredentials: true
    })
    .then((res) => {
      commit('unfollowing', {userId: payload.userId})
    })
    .catch((err) => {
      console.error(err);
    })
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
  },
}
export const state = () => ({
  me: null,
  followerList: [],  
  followingList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,

  // 남의 정보
  other: null,
});

// const totalFollowings = 8;
// const totalFollowers = 6;
const limit = 3;

export const mutations = {

  setMe(state, payload) {
    state.me = payload;
  },
  // 다른 사용자 정보
  setOther(state, payload) {
    state.other = payload;
  },

  changeNickname(state, payload) {
    state.me.nickname = payload
  },

  // addFollower(state, payload) {
  //   state.followerList.push(payload)
  // },
  // addFollowing(state, payload) {
  //   state.followingList.push(payload)
  // },

  removeFollower(state, payload) {
    let targetIndex = state.me.Followers.findIndex(v => v.id === payload.userId)
    state.me.Followers.splice(targetIndex, 1);
    targetIndex = state.followerList.findIndex(v => v.id === payload.userId);
    state.followerList.splice(targetIndex, 1);
  },
  following(state, payload) {
    state.me.Followings.push({id: payload.userId})
  },
  removeFollowing(state, payload) {
    let targetIndex = state.me.Followings.findIndex(v => v.id === payload.userId)
    state.me.Followings.splice(targetIndex, 1)
    targetIndex = state.followingList.findIndex(v => v.id === payload.userId)
    state.followingList.splice(targetIndex, 1)
  },
 
  // 팔로잉, 팔로워 더미 버전
  // loadFollowers(state) {
  //   const diff = totalFollowers - state.followerList.length
  //   const fakeUsers = Array(diff > limit ? limit : diff).fill().map( v=> ({
  //     id: Math.random().toString(),
  //     nickname: Math.floor(Math.random() * 1000).toString(),
  //   }))
  //   state.followerList = state.followerList.concat(fakeUsers);
  //   state.hasMoreFollower = diff > limit;
  // },
  // loadFollowings(state) {
  //   const diff = totalFollowings - state.followingList.length
  //   const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v=> ({
  //     id: Math.random().toString(),
  //     nickname: Math.floor(Math.random() * 1000).toString(),
  //   }))
  //   state.followingList = state.followingList.concat(fakeUsers);
  //   state.hasMoreFollowing = diff > limit;
  // },

  // 팔로잉 팔로워
  loadFollowers(state, payload) {
    if (payload.offset === 0) {
      state.followerList = payload.data;
    }
    else {
      state.followerList = state.followerList.concat(payload.data);
    }
    state.hasMoreFollower = payload.data.length === limit;
  },
  loadFollowings(state, payload) {
    if (payload.offset === 0) {
      state.followingList = payload.data;
    }
    else {
      state.followingList = state.followingList.concat(payload.data);
    }
    state.hasMoreFollowing = payload.data.length === limit;
  },
}

export const actions = {

  // 사용자정보 가져오기
  async loadUser({ commit }) {
    try {
      const res = await this.$axios.get('/user', { 
        withCredentials: true,
      });
      commit('setMe', res.data)
    }
    catch (err) {
      console.error('loadUser :::', err);
    }
  },

  // 다른 사용자 정보 불러오기
  async loadOther({ commit }, payload) {
    try {
      const res = await this.$axios.get(`/user/${payload.userId}`, {
        withCredentials: true
      });
      commit('setOther', res.data)
    }
    catch (err) {
      console.error('loadOther :::', err)
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
      console.error('signUp :::', err);
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
      console.error('logIn :::', err)
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
      console.error('logOut :::', err)
    })
  },

  changeNickname({ commit }, payload) {
    this.$axios.patch('/user/nickname', { nickname: payload.nickname }, {
      withCredentials: true,
    })
    .then((res) => {
      commit('changeNickname', res.data)
    })
    .catch((err) => {
      console.error('changeNickname :::', err)
    })
  },
  // addFollowing({ commit }, payload) {
  //   commit('addFollowing', payload)
  // },
  // addFollower({ commit }, payload) {
  //   commit('addFollower', payload)
  // },

  // 팔로워, 언팔로워
  follow({ commit }, payload) {
    return this.$axios.post(`/user/${payload.userId}/follow`, {}, {
      withCredentials: true
    })
    .then((res) => {
      commit('following', { userId: payload.userId })
    })
    .catch((err) => {
      console.error('follow :::', err);
    })
  },
  unfollow({ commit }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follow`, {
      withCredentials: true
    })
    .then((res) => {
      commit('removeFollowing', { userId: payload.userId })
    })
    .catch((err) => {
      console.error('unfollow :::', err);
    })
  },

  // 언팔로워
  removeFollower({ commit }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follower`, {
      withCredentials: true
    })
    .then((res) => {
      commit('removefollower', { userId: payload.userId });
    })
    .catch((err) => {
      console.error('unfollower :::', err);
    })
  },

  // 프로필에서 전체 팔로우 팔로잉에서 제거
  // removeFollowing({ commit, dispatch }, payload) {
  //   dispatch('removeFollowing', payload)
  // },
  
  
  // 팔로잉, 팔로워 더미데이터 버전
  // loadFollowers({ commit, state }) {
  //   if (state.hasMoreFollower) {
  //     commit('loadFollowers');
  //   }
  // },
  // loadFollowings({ commit, state }) {
  //   if (state.hasMoreFollowing) {
  //     commit('loadFollowings');
  //   }
  // },

  // 팔로잉, 팔로워 (초기 화면 수정 전)
  // loadFollowers({ commit, state }, payload) {
  //   if (state.hasMoreFollower) {
  //     const offset = state.followerList.length;
  //     return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${offset}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       commit('loadFollowers', {
  //         data: res.data,
  //         offset,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error('loadFollowers :::', err)
  //     });
  //   }
  // },
  // loadFollowings({ commit, state }, payload) {
  //   if (state.hasMoreFollowing) {
  //     const offset = state.followerList.length;
  //     return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${offset}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       commit('loadFollowings', {
  //         data: res.data,
  //         offset,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error('loadFollowers :::', err)
  //     });
  //   }
  // },

  // 팔로잉, 팔로워 (초기 화면 수정 후)
  loadFollowers({ commit, state }, payload) {
    if (!(payload && payload.offset === 0) && !state.hasMoreFollower) {
      return;
    }
    let offset = state.followerList.length;
    if (payload && payload.offset === 0) {
      offset = 0;
    }
    return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${offset}`, {
      withCredentials: true,
      })
      .then((res) => {
        commit('loadFollowers', {
          data: res.data,
          offset,
        });
      })
      .catch((err) => {
        console.error('loadFollowers :::', err)
      });
  },
  
  loadFollowings({ commit, state }, payload) {
    if (!(payload && payload.offset === 0) && !state.hasMoreFollowing) {
      return;
    }
    let offset = state.followingList.length;
    if (payload && payload.offset === 0) {
      offset = 0;
    }
    return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${offset}`, {
      withCredentials: true,
      })
      .then((res) => {
        commit('loadFollowings', {
          data: res.data,
          offset,
        });
      })
      .catch((err) => {
        console.error('loadFollowers :::', err)
      });
    },  
}
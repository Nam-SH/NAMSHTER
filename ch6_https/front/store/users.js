import throttle from 'lodash.throttle'

export const state = () => ({
  me: null,
  userDetail: null,
  followerList: [],
  followingList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,
  other: null,
  loggingInUser: null,
  imagePaths: '',
  dailyData: []
});


export const mutations = {

  setMe(state, payload) {
    state.me = payload;
  },
  // 다른 사용자 정보
  setOther(state, payload) {
    state.other = payload;
  },

  loggingInUser(state, payload) {
    state.loggingInUser = payload
  },

  userDetail(state, payload) {
    state.userDetail = payload
  },

  changeNickname(state, payload) {
    state.me.nickname = payload;
  },
  changeName(state, payload) {
    state.me.name = payload;
  },
  pushImagePaths(state, payload) {
    state.me.src = payload
    state.imagePaths = payload
  },
  removeImagePath(state, payload) {
    state.imagePaths = ''
  },

  dailyCheck(state, payload) {
    state.dailyData = payload
  },

  following(state, payload) {
    state.me.Followings.unshift({
      id: payload.id,
      nickname: payload.nickname,
      name: payload.name,
    })
  },

  unfollow(state, payload) {
    let targetIndex = state.me.Followings.findIndex(v => v.id === payload.userId)
    state.me.Followings.splice(targetIndex, 1)
    targetIndex = state.followingList.findIndex(v => v.id === payload.userId)
    state.followingList.splice(targetIndex, 1)
  },

  unfollower(state, payload) {
    let targetIndex = state.me.Followers.findIndex(v => v.id === payload.userId)
    state.me.Followers.splice(targetIndex, 1);
    targetIndex = state.followerList.findIndex(v => v.id === payload.userId);
    state.followerList.splice(targetIndex, 1);
  },

  // 팔로잉 전체 불러오기
  loadFollowings(state, payload) {
    if (payload.reset) {
      state.followingList = payload.followings;
    } else {
      state.followingList = state.followingList.concat(payload.followings);
    }
    state.hasMoreFollowing = payload.hasMoreFollowing;
  },
  // 팔로워 전체 불러오기
  loadFollowers(state, payload) {
    if (payload.reset) {
      state.followerList = payload.followers;
    } else {
      state.followerList = state.followerList.concat(payload.followers);
    }
    state.hasMoreFollower = payload.hasMoreFollower;
  }
}

export const actions = {

  // 사용자정보 가져오기
  async loadUser({
    commit
  }) {
    try {
      const res = await this.$axios.get('/user', {
        withCredentials: true,
      });
      commit('setMe', res.data)
      return
    } catch (err) {
      // console.error('loadUser :::', err.response.data);
    }
  },

  // 다른 사용자 정보 불러오기
  async loadOther({
    commit
  }, payload) {
    let before = this.$toast && this.$toast.show('진행 중...')
    try {
      const res = await this.$axios.get(`/user/${payload.userId}`, {
        withCredentials: true
      });
      commit('setOther', res.data)
      if (this.$toast) {
        before.goAway(1500)
        this.$toast.success('사용자 정보 불러오기 완료', {
          duration: 2000
        })
      }
    } catch (err) {
      console.error('loadOther :::', err)
      if (this.$toast) {
        before.goAway(1500)
        this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      }
    }
  },

  // 로그인 유저 사진가져오기
  async loggingInUser({
    commit
  }, payload) {
    try {
      const res = await this.$axios.get(`/user/image/${payload.userEmail}`, {
        withCredentials: true
      });
      return commit('loggingInUser', res.data)
    } catch (err) {
      console.error('loadOther :::', err)
    }
  },

  signUp({
    commit,
  }, payload) {
    return this.$axios.post('/user', {
        email: payload.email,
        name: payload.name,
        nickname: payload.nickname,
        password: payload.password,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        commit('setMe', res.data)
        this.$router.push({
          path: "/"
        });
      })
      .catch((err) => {
        // console.error('signUp :::', err.response.data);
        this.$toast && this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      });
  },

  logIn({
    commit,
    state
  }, payload) {
    let before = this.$toast && this.$toast.show('진행 중...')
    return this.$axios.post('/user/login', {
        email: payload.email,
        password: payload.password
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('setMe', res.data);
        this.$router.push('/');
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.show(`Hello ${state.me.name}~~`, {
            duration: 3000
          })
        }
      })
      .catch((err) => {
        // console.error('logIn :::', err.response.data)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },

  logOut({
    commit,
    state
  }) {
    return this.$axios.post('/user/logout', {}, {
        withCredentials: true,
      })
      .then((res) => {
        this.$router.push({
          path: "/main"
        });
        this.$toast && this.$toast.success(`잘 가 ${state.me.nickname}!`, {
          duration: 2000
        })
        commit('setMe', null);
      })
      .catch((err) => {
        // console.error('logOut :::', err)
        this.$toast && this.$toast.error(`${ err.response.data }`, {
          duration: 2000
        })
      })
  },
  userDetail({
    commit,
    state
  }, payload) {
    return this.$axios.get(`/user/${state.me.id}/detail`, {
        withCredentials: true
      })
      .then((res) => {
        commit('userDetail', res.data)
      })
      .catch(err => {
        console.error('userDetail :::', err);
      })
  },

  changeNickname({
    commit
  }, payload) {
    let before = this.$toast && this.$toast.show('변경 중...')
    return this.$axios.patch('/user/nickname', {
        nickname: payload.nickname
      }, {
        withCredentials: true,
      })
      .then((res) => {
        commit('changeNickname', res.data)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.success('닉네임 변경 완료', {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        // console.error('changeNickname :::', err)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },
  changeName({
    commit
  }, payload) {
    let before = this.$toast && this.$toast.show('변경 중...')
    return this.$axios.patch('/user/name', {
        name: payload.name
      }, {
        withCredentials: true,
      })
      .then((res) => {
        commit('changeName', res.data)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.success('이름 변경 완료', {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        // console.error('changename :::', err)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },
  changePassword({
    commit
  }, payload) {
    let before = this.$toast && this.$toast.show('변경 중...')
    return this.$axios.patch('/user/password', {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword
      }, {
        withCredentials: true,
      })
      .then((res) => {
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.success(res.data, {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        // console.error('changePassword :::', err)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },
  // 이미지 업로드
  uploadImages({
    commit
  }, payload) {
    let before = this.$toast && this.$toast.show("변경 중...");
    return this.$axios.patch('/user/images', payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit('pushImagePaths', res.data);
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.success('변경 완료!', {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        // console.error('uploadImages:::', err)
        if (this.$toast) {
          before.goAway(1500)
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },

  dailyCheck({
    commit,
    state
  }, payload) {
    return this.$axios.get(`/user/${state.me.id}/daily`, {
        withCredentials: true
      })
      .then((res) => {
        commit('dailyCheck', res.data)
      })
      .catch((err) => {
        console.error('dailyCheck', err);

      })
  },
  // 팔로워, 언팔로워
  follow({
    commit,
  }, payload) {
    return this.$axios.post(`/user/${payload.userId}/follow`, {}, {
        withCredentials: true
      })
      .then((res) => {
        commit('following', {
          id: res.data.id,
          nickname: res.data.nickname,
          name: res.data.name,
        })
        if (this.$toast) {
          this.$toast.success(`${res.data.nickname}님 팔로우 성공!`, {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        // console.error('follow :::', err);
        if (this.$toast) {
          this.$toast.error(`${ err.response.data }`, {
            duration: 2000
          })
        }
      })
  },

  unfollow({
    commit,
  }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follow`, {
        withCredentials: true
      })
      .then((res) => {
        commit('unfollow', {
          userId: payload.userId
        })
        if (this.$toast) {
          this.$toast.success('언팔로우 성공!', {
            duration: 2000
          })
        }
      })
      .catch((err) => {
        console.error('unfollow :::', err);
      })
  },

  // 언팔로워
  unfollower({
    commit
  }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follower`, {
        withCredentials: true
      })
      .then((res) => {
        commit('unfollower', {
          userId: payload.userId
        });
      })
      .catch((err) => {
        console.error('unfollower :::', err);
      })
  },

  // 팔로잉, 팔로워 (초기 화면 수정 후)
  loadFollowers: throttle(async function ({
    commit,
    state
  }, payload) {
    try {

      if (payload && payload.reset) {
        const res = await this.$axios.get(`/user/${state.me.id}/followers?limit=5`, {
          withCredentials: true
        })
        commit('loadFollowers', {
          followers: res.data.followers,
          hasMoreFollower: res.data.hasMoreFollower,
          reset: true,
        });
        return;
      }
      if (state.hasMoreFollower) {
        const lastFollower = state.followerList[state.followerList.length - 1]
        const res = await this.$axios.get(`/user/${state.me.id}/followers?lastId=${lastFollower && lastFollower.id}&limit=5`, {
          withCredentials: true,
        })
        commit('loadFollowers', {
          followers: res.data.followers,
          hasMoreFollower: res.data.hasMoreFollower,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadFollowers :::', err)
    }
  }, 1000),

  loadFollowings: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/user/${state.me.id}/followings?limit=5`, {
          withCredentials: true
        })
        commit('loadFollowings', {
          followings: res.data.followings,
          hasMoreFollowing: res.data.hasMoreFollowing,
          reset: true,
        });
        return;
      }
      if (state.hasMoreFollowing) {
        const lastFollowing = state.followingList[state.followingList.length - 1]
        const res = await this.$axios.get(`/user/${state.me.id}/followings?lastId=${lastFollowing && lastFollowing.id}&limit=5`, {
          withCredentials: true,
        })
        commit('loadFollowings', {
          followings: res.data.followings,
          hasMoreFollowing: res.data.hasMoreFollowing,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadFollowings :::', err);
    }
  }, 1000)
}
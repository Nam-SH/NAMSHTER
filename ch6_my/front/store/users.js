import throttle from 'lodash.throttle'
import firebase from "@/plugins/sw.js";

export const state = () => ({
  me: null,
  followerList: [],
  followingList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,
  other: null,
});


export const mutations = {

  setMe(state, payload) {
    state.me = payload;
  },
  // 다른 사용자 정보
  setOther(state, payload) {
    state.other = payload;
  },

  changeNickname(state, payload) {
    state.me.nickname = payload;
  },
  changeName(state, payload) {
    state.me.name = payload;
  },

  following(state, payload) {
    state.me.Followings.push({
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
  loadMessage({}, payload) {
    const messageList = {
      userSignUp: {
        title: "회원가입이 되었습니다.",
        body: "빨리 글을 써봐요!"
      },
      userLogIn: {
        title: "로그인이 되었습니다.",
        body: "안녕하세요!"
      },
      userLogOut: {
        title: "로그아웃이 되었습니다.",
        body: "로그인 다시 해주세요"
      },

      userChangeName: {
        title: "로그아웃이 되었습니다.",
        body: "로그인 다시 해주세요"
      },
      userChangeNickname: {
        title: "로그아웃이 되었습니다.",
        body: "로그인 다시 해주세요"
      },
      userChangePassword: {
        title: "로그아웃이 되었습니다.",
        body: "로그인 다시 해주세요"
      },
      userFollow: {
        title: "유저를 팔로우했습니다.",
        body: "어떤 사람을 팔로우 했을까요?"
      },
      userUnfollow: {
        title: "유저의 팔로우를 취소합니다.",
        body: "다른 사람을 팔로우해볼을까요?"
      }
    }
    let key = payload;
    let {
      title,
      body
    } = messageList[key]

    const messaging = firebase.messaging();
    messaging.getToken()
      .then((token) => {
        return this.$axios
          .post(
            "https://fcm.googleapis.com/fcm/send", {
              notification: {
                title: `${title}`,
                body: `${body}`,
                icon: "https://i0.wp.com/quickstickeg.com/wp-content/uploads/2020/02/QUICK-STICK-4.jpg?fit=480%2C564",
                click_action: "https://www.naver.com/"
              },
              to: `${token}`
            }, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "key=AAAAQdqazAE:APA91bEsgOlbL5r3Z2NSItZoYdjJ4lAAz2CIFGZuiFgMrOpv1QcdNYhIse_3naet4_jU1jJlQ59DFzJvlDnFanCE_T8eN7y-UuZ59bN6dFDjV3JuKsnMQyDakc5XYSG1KRt1j2svitpk"
              }
            }
          )
          .then(res => {
            console.log('title::: ', title);
            console.log('body::: ', body);
            console.log("PWA 결과는??", res.data);
          });
      });
  },

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
      // console.error(err);
      // if (err.response.status === 401) {
      //   console.log('로그인해줘요');
      // } else {
      //   console.log('loadUser ::: 아몰랑', );
      // }
    }
  },

  // 다른 사용자 정보 불러오기
  async loadOther({
    commit
  }, payload) {
    try {
      const res = await this.$axios.get(`/user/${payload.userId}`, {
        withCredentials: true
      });
      commit('setOther', res.data)
      return
    } catch (err) {
      console.error('loadOther :::', err)
    }
  },

  signUp({
    commit,
    dispatch
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
        dispatch('loadMessage', 'userSignUp')
      })
      .catch((err) => {
        console.error('signUp :::', err);
      });
  },

  logIn({
    commit,
    dispatch
  }, payload) {
    return this.$axios.post('/user/login', {
        email: payload.email,
        password: payload.password
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('setMe', res.data);
        dispatch('loadMessage', 'userLogIn')
      })
      .catch((err) => {
        console.error('logIn :::', err)
      })
  },

  logOut({
    commit,
    dispatch
  }) {
    return this.$axios.post('/user/logout', {}, {
        withCredentials: true,
      })
      .then((res) => {
        commit('setMe', null);
        dispatch('loadMessage', 'userLogOut')
      })
      .catch((err) => {
        console.error('logOut :::', err)
      })
  },

  changeNickname({
    commit
  }, payload) {
    return this.$axios.patch('/user/nickname', {
        nickname: payload.nickname
      }, {
        withCredentials: true,
      })
      .then((res) => {
        commit('changeNickname', res.data)
        dispatch('loadMessage', 'userChangeNickname')
      })
      .catch((err) => {
        console.error('changeNickname :::', err)
      })
  },

  changeName({
    commit
  }, payload) {
    return this.$axios.patch('/user/name', {
        name: payload.name
      }, {
        withCredentials: true,
      })
      .then((res) => {
        commit('changeName', res.data)
        dispatch('loadMessage', 'userChangeName')
      })
      .catch((err) => {
        console.error('changename :::', err)
      })
  },

  changePassword({
    commit
  }, payload) {
    return this.$axios.patch('/user/password', {
        password: payload.password
      }, {
        withCredentials: true,
      })
      .then((res) => {
        // commit('changePassword', res.data)
        dispatch('loadMessage', 'userChangePassword')
      })
      .catch((err) => {
        console.error('changePassword :::', err)
      })
  },

  // 팔로워, 언팔로워
  follow({
    commit,
    dispatch
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
        dispatch('loadMessage', 'userFollow')
      })
      .catch((err) => {
        console.error('follow :::', err);
      })
  },

  unfollow({
    commit,
    dispatch
  }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follow`, {
        withCredentials: true
      })
      .then((res) => {
        commit('unfollow', {
          userId: payload.userId
        })
        dispatch('loadMessage', 'userUnfollow')
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
        const res = await this.$axios.get(`/user/${state.me.id}/followers?limit=4`, {
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
        const res = await this.$axios.get(`/user/${state.me.id}/followers?lastId=${lastFollower && lastFollower.id}&limit=4`, {
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
        const res = await this.$axios.get(`/user/${state.me.id}/followings?limit=4`, {
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
        const res = await this.$axios.get(`/user/${state.me.id}/followings?lastId=${lastFollowing && lastFollowing.id}&limit=4`, {
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
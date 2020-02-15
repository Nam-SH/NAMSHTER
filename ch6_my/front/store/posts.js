import Vue from 'vue';
import throttle from 'lodash.throttle'
import firebase from 'firebase'

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
  calcPost: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },

  removeMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(targetIndex, 1);
  },

  editMainPost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[targetIndex].content = payload.content
  },

  addComment(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[targetIndex].Comments.unshift(payload)
  },

  // 글 하나 불러오기
  loadPost(state, payload) {
    state.mainPosts = [payload]
  },

  thisWeekPost(state, payload) {
    const currentDay = new Date();
    const theYear = currentDay.getFullYear();
    const theMonth = currentDay.getMonth();
    const theDate = currentDay.getDate();
    const theDayName = currentDay.getDay();
    let resultDay = new Date(theYear, theMonth, theDate + (1 - theDayName));
    let yyyy = resultDay.getFullYear();
    let mm = Number(resultDay.getMonth()) + 1;
    let dd = resultDay.getDate();
    mm = String(mm).length === 1 ? "0" + mm : mm;
    dd = String(dd).length === 1 ? "0" + dd : dd;
    let monDay = yyyy + mm + dd

    if (payload) {
      let howManyPost = []
      for (let val of payload) {
        howManyPost.push(val.substr(0, 10).replace(/-/gi, ''))
      }
      let calcPost = [0, 0, 0, 0, 0, 0, 0]
      for (let day of howManyPost) {
        calcPost[parseInt(day, 10) - parseInt(monDay, 10)] += 1;
      }
      state.calcPost = calcPost
      return
    }
    state.calcPost = []
  },

  // 글 전체 불러오기
  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data
    } else {
      state.mainPosts = state.mainPosts.concat(payload.data)
    }
    state.hasMorePost = payload.data.length === 10;
  },

  // 댓글 요청하기
  loadComments(state, payload) {
    const targetindex = state.mainPosts.findIndex(v => v.id === payload.postId)
    Vue.set(state.mainPosts[targetindex], 'Comments', payload.data);
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },

  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1)
  },

  // 좋아요
  likePost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    state.mainPosts[targetIndex].Likers.push({
      id: payload.userId,
    })
  },

  // 싫어요
  unlikePost(state, payload) {
    const targetIndex = state.mainPosts.findIndex(v => v.id === payload.postId)
    const targetUserIndex = state.mainPosts[targetIndex].Likers.findIndex(v => v.id === payload.userId)
    state.mainPosts[targetIndex].Likers.splice(targetUserIndex, 1);
  }
};


export const actions = {

  // 글 작성
  add({
    commit,
    state
  }, payload) {
    return this.$axios.post('/post', {
        content: payload.content,
        image: state.imagePaths
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('addMainPost', res.data)
        // return this.$axios.post('https://fcm.googleapis.com/fcm/send', {
        //     "notification": {
        //       "title": "dogdog!!!!",
        //       "body": "dogdogdogdo",
        //       "click_action": "http://localhost:3081/`"
        //     },
        //     "to": "fCTaYFTXYYESQh2PQqytTJ:APA91bHQa14HxwaAIzNo642F6RoDUrLsPpPrFEBM-QRCacsyfltFRKJogKN1wnj6YmcmhsiputrqgTFTbZrt1Q0GWS-e3Nxhj8Wpx7bIafODCFwRyQLTc1KymI8PZmNjSjjnwaCktznW"
        //   }, {
        //     "headers": {
        //       "Content-Type": "application/json",
        //       "Authorization": "key=AAAAQdqazAE:APA91bEsgOlbL5r3Z2NSItZoYdjJ4lAAz2CIFGZuiFgMrOpv1QcdNYhIse_3naet4_jU1jJlQ59DFzJvlDnFanCE_T8eN7y-UuZ59bN6dFDjV3JuKsnMQyDakc5XYSG1KRt1j2svitpk"
        //     }
        //   })
        //   .then((res) => {
        //     console.log('아아아아', res.data);
        //   })
      })
      .catch((err) => {
        console.error('add:::', err)
      })
  },

  // 삭제 구현
  remove({
    commit
  }, payload) {
    return this.$axios.delete(`/post/${payload.postId}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('removeMainPost', res.data)
      })
      .catch((err) => {
        console.error('remove:::', err)
      })
  },

  edit({
    commit
  }, payload) {
    return this.$axios.patch(`/post/${payload.postId}`, {
        content: payload.content
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('editMainPost', {
          postId: payload.postId,
          content: res.data
        })
      })
      .catch((err) => {
        console.error('edit :::', err);

      })
  },

  addComment({
    commit
  }, payload) {
    return this.$axios.post(`/post/${payload.postId}/comment`, {
        content: payload.content,
        score: payload.score,
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('addComment', res.data)
      })
      .catch((err) => {
        console.error('addComment:::', err)
      })
  },

  // 글 한개 불러오기
  async loadPost({
    commit
  }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload}`, {
        withCredentials: true
      })
      commit('loadPost', res.data)
    } catch (err) {
      console.error('loadPost :::', err)
    }
  },

  thisWeekPost({
    commit
  }, payload) {
    return this.$axios.get('/posts/thisweek', {
        withCredentials: true
      })
      .then((res) => {
        commit('thisWeekPost', res.data)
      })
      .catch((err) => {
        console.error('thisWeekPost :::', err);
      })
  },

  // 전체 글 불러오기 - 쓰로틀링 설정
  loadPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false
        });
        return;
      }
    } catch (err) {
      console.error('loadPosts :::', err)
    }
  }, 3000),

  // 유저 글 가져오기
  loadUserPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/user/${payload.userId}/posts?limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1]
        const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadUserPosts :::', err)
    }
  }, 3000),

  // 해시태그 가져오기
  loadHashtagPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1]
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?lastId=${lastPost && lastPost.id}&limit=10`, {
          withCredentials: true
        })
        commit('loadPosts', {
          data: res.data,
          reset: false,
        });
        return;
      }
    } catch (err) {
      console.error('loadHashtagPosts :::', err)
    }
  }, 3000),


  // 댓글 요청하기
  loadComments({
    commit
  }, payload) {
    return this.$axios.get(`/post/${payload.postId}/comments`, {
        withCredentials: true
      })
      .then((res) => {
        commit('loadComments', {
          postId: payload.postId,
          data: res.data,
        })
      })
      .catch((err) => {
        console.error('loadComments :::', err)
      });
  },

  // 이미지 업로드
  uploadImages({
    commit
  }, payload) {
    return this.$axios.post('/post/images', payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit('concatImagePaths', res.data);
      })
      .catch((err) => {
        console.error('uploadImages:::', err)
      })
  },

  // 좋아요
  likePost({
    commit
  }, payload) {
    return this.$axios.post(`/post/${payload.postId}/like`, {}, {
        withCredentials: true
      })
      .then((res) => {
        // res.data에는 userId가 들어있다.
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        })
      })
      .catch((err) => {
        console.error('likePost:::', err)
      })
  },

  // 싫어요
  unlikePost({
    commit
  }, payload) {
    return this.$axios.delete(`/post/${payload.postId}/like`, {
        withCredentials: true
      })
      .then((res) => {
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        })
      })
      .catch((err) => {
        console.error('unlikePost:::', err)
      })
  },

  // 리트윗
  retweet({
    commit
  }, payload) {
    return this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
        withCredentials: true
      })
      .then((res) => {
        // res.data에는 리트윗한 나의 User id, nickname
        // 원본글의 Id와, 글 작성자의 User id, nickname, 글의 image 주소가 들어있다.
        commit('addMainPost', res.data)
      })
      .catch((err) => {
        console.error('retweet:::', err)
        // 작성한 에러메시지
        alert(err.response.data)
      })
  }
}
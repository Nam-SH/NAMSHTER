import Vue from 'vue';
import throttle from "lodash.throttle";

export const state = () => ({
  groupPosts: [],
  imagePaths: [],
  hasMoreGroupPost: true,

  grouplistBefore: [],
  grouplistDoing: [],
  grouplistDone: [],
  otherGrouplistBefore: [],
  otherGrouplistDoing: [],
  otherGrouplistDone: [],

  grouplist: [],
  oneGroup: null,

  mainGrouplist: []
});

export const mutations = {
  groupAdd(state, payload) {
    // state.loadGroups.unshift(payload)
    state.grouplistBefore.unshift(payload);
  },
  groupEdit(state, payload) {
    state.oneGroup.name = payload.name
    state.oneGroup.intro = payload.intro
    state.oneGroup.limit = payload.limit
  },
  groupDelete(state, payload) {
    this.$router.push('/groups')
  },

  // 그룹 상태 변경 
  changeState(state, payload) {
    if (payload.nextState === 1) {
      let targetIndex = state.grouplistBefore.findIndex(
        v => v.id === payload.groupId
      );
      state.mainGrouplist.unshift(state.grouplistBefore[targetIndex]);
      state.oneGroup.state = payload.nextState
    } else {
      state.oneGroup.state = payload.nextState
      let targetIndex = state.mainGrouplist.findIndex(
        v => v.id === payload.groupId
      );
      state.mainGrouplist.splice(targetIndex, 1);
    }
  },
  groupUserInOut(state, payload) {
    if (state.oneGroup) {
      const targetIndex = state.oneGroup.Groupmembers.findIndex(v => v.id === payload.userId)
      if (targetIndex !== -1) {
        Vue.delete(state.oneGroup.Groupmembers, targetIndex)
      } else {
        state.oneGroup.Groupmembers.unshift({
          id: payload.userId
        })
      }
      return
    } else {
      const targetGroupIndex = state.grouplist.findIndex(v => v.id === payload.groupId);
      const targetIndex = state.grouplist[targetGroupIndex].Groupmembers.findIndex(v => v.id === payload.userId)
      if (targetIndex !== -1) {
        Vue.delete(state.grouplist[targetGroupIndex].Groupmembers, targetIndex)
        this.$router.push('/groups')
        return
      } else {
        state.grouplist[targetGroupIndex].Groupmembers.unshift({
          id: payload.userId
        })
        this.$router.push(`/groups/${payload.groupId}`)
        return
      }
    }
  },

  // 글 작성관련
  addGroupPost(state, payload) {
    state.groupPosts.unshift(payload);
    state.imagePaths = [];
  },
  editGroupPost(state, payload) {
    const targetIndex = state.groupPosts.findIndex(v => v.id === payload.postId)
    state.groupPosts[targetIndex].title = payload.title
    state.groupPosts[targetIndex].content = payload.content
  },
  deleteGroupPost(state, payload) {
    const targetIndex = state.groupPosts.findIndex(v => v.id === payload.postId)
    Vue.delete(state.groupPosts, targetIndex)
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },

  loadPostComments(state, payload) {
    const targetIndex = state.groupPosts.findIndex(v => v.id === payload.postId)
    if (payload.reset) {
      Vue.set(state.groupPosts[targetIndex], 'GroupPostComments', payload.data)
    } else {
      state.groupPosts[targetIndex].GroupPostComments = state.groupPosts[targetIndex].GroupPostComments.concat(payload.data);
    }
  },

  postCommentAdd(state, payload) {
    const targetPost = state.groupPosts.findIndex(v => v.id === payload.postId)
    state.groupPosts[targetPost].GroupPostComments.unshift(payload.data)
  },

  postCommentDelete(state, payload) {
    const targetPost = state.groupPosts.findIndex(v => v.id === payload.postId)
    const targetComment = state.groupPosts[targetPost].GroupPostComments.findIndex(v => v.id === payload.commentId)
    Vue.delete(state.groupPosts[targetPost].GroupPostComments, targetComment)
  },

  loadGroupPosts(state, payload) {
    if (payload.reset) {
      state.groupPosts = payload.data;
    } else {
      state.groupPosts = state.groupPosts.concat(payload.data);
    }
    state.hasMoreGroupPost = payload.data.length === 10;
  },

  // 그룹 불러오기 관련
  loadGroups(state, payload) {
    state.grouplist = payload;
  },

  loadMainGroups(state, payload) {
    state.mainGrouplist = payload;
  },

  oneGroupDetail(state, payload) {
    state.oneGroup = payload;
  },

  grouplistBefore(state, payload) {
    state.grouplistBefore = payload;
  },
  grouplistDoing(state, payload) {
    state.grouplistDoing = payload;
  },

  otherGrouplistBefore(state, payload) {
    state.otherGrouplistBefore = payload;
  },
  otherGrouplistDoing(state, payload) {
    state.otherGrouplistDoing = payload;
  }
};

export const actions = {
  groupAdd({
    commit
  }, payload) {
    return this.$axios
      .post(
        "/group", {
          name: payload.name,
          intro: payload.intro,
          limit: payload.limit,
          subjectName: payload.subjectName
        }, {
          withCredentials: true
        }
      )
      .then((res) => {
        commit("groupAdd", res.data)
        this.$router.push(`/groups/${res.data.id}`)
      })
      .catch(err => {
        console.error("groupAdd :::", err);
      });
  },
  groupEdit({
    commit
  }, payload) {
    return this.$axios.put(`/group/${payload.groupId}`, {
        name: payload.name,
        intro: payload.intro,
        limit: payload.limit
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('groupEdit', {
          name: payload.name,
          intro: payload.intro,
          limit: payload.limit,
          groupId: res.data
        })
      })
      .catch(err => {
        console.error('groupDelete :::', err);

      })
  },
  groupDelete({
    commit
  }, payload) {
    return this.$axios.delete(`/group/${payload.groupId}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('groupDelete', res.data)
      })
      .catch(err => {
        console.error('groupDelete :::', err);
      })
  },

  // 그룹 포스트 작성
  postAdd({
    commit,
    state
  }, payload) {
    return this.$axios
      .post(
        `/group/${payload.groupId}/post`, {
          title: payload.title,
          content: payload.content,
          image: state.imagePaths
        }, {
          withCredentials: true
        }
      )
      .then(res => {
        commit("addGroupPost", res.data);
      })
      .catch(err => {
        console.error("addGroupPost:::", err);
      });
  },
  // 글 수정
  postEdit({
    commit,
    state
  }, payload) {
    return this.$axios
      .put(
        `/group/${payload.groupId}/post/${payload.postId}`, {
          title: payload.title,
          content: payload.content,
        }, {
          withCredentials: true
        }
      )
      .then(res => {
        commit("editGroupPost", {
          title: res.data.title,
          content: res.data.content,
          postId: payload.postId
        });
      })
      .catch(err => {
        console.error("postEdit :::", err);
      });
  },
  // 포스트 삭제
  postDelete({
    commit
  }, payload) {
    this.$axios.delete(`/group/${payload.groupId}/post/${payload.postId}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('deleteGroupPost', {
          postId: payload.postId
        })
      })
      .catch(err => {
        console.error("postDelete :::", err);
      })
  },

  // 이미지 업로드
  uploadImages({
    commit
  }, payload) {
    return this.$axios
      .post("/group/images", payload, {
        withCredentials: true
      })
      .then(res => {
        commit("concatImagePaths", res.data);
      })
      .catch(err => {
        console.error("uploadImages:::", err);
      });
  },

  loadPostComments: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/group/${payload.groupId}/post/${payload.postId}/comments?&limit=10`, {
            withCredentials: true
          }
        );
        commit("loadPostComments", {
          data: res.data,
          postId: payload.postId,
          reset: true
        });
        return;
      }
      // if (state.hasMoreGroupPostComment) {
      //   const lastPost = state.groupPosts[state.mainPosts.length - 1];
      //   const res = await this.$axios.get(
      //     `/group/${payload.groupId}/posts?lastId=${lastPost &&
      //       lastPost.id}&limit=10`, {
      //       withCredentials: true
      //     }
      //   );

      //   commit("loadPostComments", {
      //     data: res.data,
      //     reset: false
      //   });
      //   return;
      // }
    } catch (err) {
      console.error("loadPosts :::", err);
    }
  }, 3000),


  postCommentAdd({
    commit
  }, payload) {
    this.$axios.post(`/group/${payload.groupId}/post/${payload.postId}/comment`, {
        comment: payload.comment
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('postCommentAdd', {
          postId: payload.postId,
          data: res.data
        })
      })
      .catch(err => {
        console.error("postCommentAdd:::", err);
      })
  },

  postCommentDelete({
    commit
  }, payload) {
    this.$axios.delete(`/group/${payload.groupId}/post/${payload.postId}/comment/${payload.commentId}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('postCommentDelete', {
          postId: payload.postId,
          commentId: res.data
        })
      })
      .catch((err) => {
        console.error("postCommentDelete:::", err);
      })
  },

  // 그룹 관련
  groupUserInOut({
    commit
  }, payload) {
    this.$axios
      .post(
        `/group/${payload.groupId}/userInOut`, {
          userId: payload.userId
        }, {
          withCredentials: true
        }
      )
      .then(res => {
        commit("groupUserInOut", {
          groupId: payload.groupId,
          userId: res.data
        });
      })
      .catch(err => {
        // this.$toast.show(err.response.data ,{ duration : 2000 })
        // this.$toast.success(err.response.data ,{ duration : 2000 })
        this.$toast.error(err.response.data ,{ duration : 2000 })
      });
  },

  changeState({
    commit
  }, payload) {
    this.$axios
      .post(
        `group/${payload.groupId}/changestate`, {
          userId: payload.userId
        }, {
          withCredentials: true
        }
      )
      .then(res => {
        commit("changeState", {
          groupId: payload.groupId,
          nextState: res.data.next
        });
      })
      .catch(err => {
        console.error("changeState :::", err);
      });
  },

  // 전체 글 불러오기 - 쓰로틀링 설정
  loadGroupPosts: throttle(async function ({
    commit,
    state
  }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/group/${payload.groupId}/posts?&limit=10`, {
            withCredentials: true
          }
        );
        commit("loadGroupPosts", {
          data: res.data,
          reset: true
        });
        return;
      }
      if (state.hasMoreGroupPost) {
        const lastPost = state.groupPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(
          `/group/${payload.groupId}/posts?lastId=${lastPost &&
            lastPost.id}&limit=10`, {
            withCredentials: true
          }
        );
        commit("loadGroupPosts", {
          data: res.data,
          reset: false
        });
        return;
      }
    } catch (err) {
      console.error("loadPosts :::", err);
    }
  }, 3000),

  // 아래부터는 그룹 가져오는 것들
  // 쓰로틀링 해야 함
  loadAllGroups({
    commit
  }, payload) {
    return this.$axios
      .get("/groups", {
        withCredentials: true
      })
      .then(res => {
        commit("loadGroups", res.data);
      })
      .catch(err => {
        console.error("loadGroups :::", err);
      });
  },

  // 쓰로틀링 해야 함
  loadGroups({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/${payload.state}?limit=${payload.limit || 0}`, {
        withCredentials: true
      })
      .then(res => {
        commit("loadGroups", res.data);
      })
      .catch(err => {
        console.error("loadGroups :::", err);
      });
  },

  loadMainGroups({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/${payload.state}?limit=${payload.limit}`, {
        withCredentials: true
      })
      .then(res => {
        commit("loadMainGroups", res.data);
      })
      .catch(err => {
        console.error("loadMainGroups :::", err);
      });
  },

  oneGroupDetail({
    commit
  }, payload) {
    return this.$axios
      .get(`/group/${payload.groupId}`, {
        withCredentials: true
      })
      .then(res => {
        commit("oneGroupDetail", res.data);
      })
      .catch(err => {
        console.error("oneGroupDetail :::", err);
      });
  },

  grouplistBefore({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/my/${payload.state}?limit=${payload.limit}`, {
        withCredentials: true
      })
      .then(res => {
        commit("grouplistBefore", res.data);
      })
      .catch(err => {
        console.error("grouplistBefore :::", err);
      });
  },

  grouplistDoing({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/my/${payload.state}?limit=${payload.limit}`, {
        withCredentials: true
      })
      .then(res => {
        commit("grouplistDoing", res.data);
      })
      .catch(err => {
        console.error("grouplistDoing :::", err);
      });
  },

  otherGrouplistBefore({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/${payload.userId}/${payload.state}`, {
        withCredentials: true
      })
      .then(res => {
        commit("otherGrouplistBefore", res.data);
      })
      .catch(err => {
        console.error("otherGrouplistBefore :::", err);
      });
  },

  otherGrouplistDoing({
    commit
  }, payload) {
    return this.$axios
      .get(`/groups/${payload.userId}/${payload.state}`, {
        withCredentials: true
      })
      .then(res => {
        commit("otherGrouplistDoing", res.data);
      })
      .catch(err => {
        console.error("otherGrouplistDoing :::", err);
      });
  }
};
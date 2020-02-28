import Vue from 'vue';
import throttle from "lodash.throttle";

export const state = () => ({
  groupPosts: [],
  imagePaths: [],
  hasMoreGroupPost: true,

  oneGroup: null,

  grouplistBefore: [],
  grouplistDoing: [],
  grouplistDone: [],
  otherGrouplistBefore: [],
  otherGrouplistDoing: [],
  otherGrouplistDone: [],

  grouplist: [],

  mainGrouplist: []
});

export const mutations = {
  groupAdd(state, payload) {
    // state.loadGroups.unshift(payload)
    state.grouplistBefore.unshift(payload);
  },

  changeStatus(state, payload) {
    if (payload.nextStatus === 1) {
      let targetIndex = state.grouplistBefore.findIndex(
        v => v.id === payload.groupId
      );
      state.grouplistBefore[targetIndex].status = payload.nextStatus;
      state.grouplistDoing.unshift(state.grouplistBefore[targetIndex]);
      state.grouplistBefore.splice(targetIndex, 1);
    } else {
      let targetIndex = state.grouplist_doing.findIndex(
        v => v.id === payload.groupId
      );
      state.grouplistDoing[targetIndex].status = payload.nextStatus;
      state.grouplistDone.unshift(state.grouplistDoing[targetIndex]);
      state.grouplistDoing.splice(targetIndex, 1);
    }
  },

  // 글 작성관련
  addGroupPost(state, payload) {
    state.groupPosts.unshift(payload);
    state.imagePaths = [];
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },

  groupUserInOut(state, payload) {
    const targetGroupIndex = state.grouplist.findIndex(
      v => v.id === payload.groupId
    );
    const targetIndex = state.grouplist[targetGroupIndex].Groupmembers.findIndex(v => v.id === payload.userId)
    if (targetIndex !== -1) {
      Vue.delete(state.grouplist[targetGroupIndex].Groupmembers, targetIndex)
      return
    } else {
      state.grouplist[targetGroupIndex].Groupmembers.unshift({
        id: payload.userId
      })
      return
    }
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
      .then(res => {
        commit("groupAdd", res.data);
      })
      .catch(err => {
        console.error("groupAdd :::", err);
      });
  },
  groupEdit({
    commit
  }, payload) {},
  groupDelete({
    commit
  }, payload) {},
  // 그룹 포스트 작성
  add({
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
        console.error("groupUserInOut", err);
      });
  },

  changeStatus({
    commit
  }, payload) {
    this.$axios
      .post(
        `group/${payload.groupId}/changestatus`, {
          userId: payload.userId
        }, {
          withCredentials: true
        }
      )
      .then(res => {
        commit("changeStatus", {
          groupId: payload.groupId,
          nextStatus: res.data
        });
      })
      .catch(err => {
        console.error("changeStatus :::", err);
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
      .get(`/groups/${payload.status}?limit=${payload.limit || 0}`, {
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
      .get(`/groups/${payload.status}?limit=${payload.limit}`, {
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
      .get(`/groups/my/${payload.status}?limit=${payload.limit}`, {
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
      .get(`/groups/my/${payload.status}?limit=${payload.limit}`, {
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
      .get(`/groups/${payload.userId}/${payload.status}`, {
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
      .get(`/groups/${payload.userId}/${payload.status}`, {
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
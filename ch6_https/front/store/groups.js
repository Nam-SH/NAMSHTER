export const state = () => ({
  grouplist_before: [],
  grouplist_doing: [],
  grouplist_done: [],

  othergrouplist_before: [],
  othergrouplist_doing: [],
  othergrouplist_done: [],

  allgrouplist: [],
  grouplist: [],
  maingrouplist: [],

  onegroup: null,

});

export const mutations = {
  groupAdd(state, payload) {
    state.allgrouplist.unshift(payload)
    state.grouplist_before.unshift(payload)
  },

  changeStatus(state, payload) {
    if (payload.nextStatus === 1) {
      let targetIndex = state.grouplist_before.findIndex(v => v.id === payload.groupId);
      state.grouplist_before[targetIndex].status = payload.nextStatus
      state.grouplist_doing.unshift(state.grouplist_before[targetIndex])
      state.grouplist_before.splice(targetIndex, 1)
    } else {
      let targetIndex = state.grouplist_doing.findIndex(v => v.id === payload.groupId);
      state.grouplist_doing[targetIndex].status = payload.nextStatus
      state.grouplist_done.unshift(state.grouplist_doing[targetIndex])
      state.grouplist_doing.splice(targetIndex, 1)
    }
  },

  loadAllGroups(state, payload) {
    state.allgrouplist = payload
  },
  loadGroups(state, payload) {
    state.grouplist = payload
  },
  loadMainGroups(state, payload) {
    state.maingrouplist = payload
  },

  oneGroupDetail(state, payload) {
    state.onegroup = payload
  },

  grouplistBefore(state, payload) {
    state.grouplist_before = payload
  },
  grouplistDoing(state, payload) {
    state.grouplist_doing = payload
  },

  otherGrouplistBefore(state, payload) {
    state.othergrouplist_before = payload
  },
  otherGrouplistDoing(state, payload) {
    state.othergrouplist_doing = payload
  },
};

export const actions = {

  groupAdd({
    commit
  }, payload) {
    return this.$axios.post("/group", {
        name: payload.name,
        intro: payload.intro,
        limit: payload.limit,
        subjectName: payload.subjectName,
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('groupAdd', res.data)
      })
      .catch((err) => {
        console.error('groupAdd :::', err);
      })
  },
  groupEdit({
    commit
  }, payload) {

  },
  groupDelete({
    commit
  }, payload) {

  },

  groupUserInOut({
    commit
  }, payload) {
    this.$axios.post(`/group/${payload.groupId}/userInOut`, {
        userId: payload.userId
      }, {
        withCredentials: true
      })
      .then((res) => {
        console.log('aaaaaaa', res.data);
        // commit('groupUserInOut', res.data)
      })
      .catch((err) => {
        console.error('groupUserInOut', err);
      })
  },

  changeStatus({
    commit
  }, payload) {
    this.$axios.post(`group/${payload.groupId}/changestatus`, {
        userId: payload.userId
      }, {
        withCredentials: true
      })
      .then((res) => {
        commit('changeStatus', {
          groupId: payload.groupId,
          nextStatus: res.data
        })
      })
      .catch((err) => {
        console.error('changeStatus :::', err);
      })
  },

  loadAllGroups({
    commit
  }, payload) {
    return this.$axios.get("/groups", {
        withCredentials: true
      })
      .then((res) => {
        commit('loadAllGroups', res.data)
      })
      .catch((err) => {
        console.error('loadAllGroups :::', err);
      })
  },

  loadGroups({
    commit
  }, payload) {
    return this.$axios.get(`/groups/${payload.status}?limit=${payload.limit || 0}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('loadGroups', res.data)
      })
      .catch((err) => {
        console.error('loadGroups :::', err);
      })
  },

  loadMainGroups({
    commit
  }, payload) {
    return this.$axios.get(`/groups/${payload.status}?limit=${payload.limit}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('loadMainGroups', res.data)
      })
      .catch((err) => {
        console.error('loadMainGroups :::', err);
      })
  },

  oneGroupDetail({
    commit
  }, payload) {
    return this.$axios.get(`/group/${payload.groupId}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('oneGroupDetail', res.data)
      })
      .catch((err) => {
        console.error('oneGroupDetail :::', err);
      })
  },

  grouplistBefore({
    commit
  }, payload) {
    return this.$axios.get(`/groups/my/${payload.status}?limit=${payload.limit}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('grouplistBefore', res.data)
      })
      .catch((err) => {
        console.error('grouplistBefore :::', err);
      })
  },

  grouplistDoing({
    commit
  }, payload) {
    return this.$axios.get(`/groups/my/${payload.status}?limit=${payload.limit}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('grouplistDoing', res.data)
      })
      .catch((err) => {
        console.error('grouplistDoing :::', err);
      })
  },

  otherGrouplistBefore({
    commit
  }, payload) {
    return this.$axios.get(`/groups/${payload.userId}/${payload.status}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('otherGrouplistBefore', res.data)
      })
      .catch((err) => {
        console.error('otherGrouplistBefore :::', err);
      })
  },

  otherGrouplistDoing({
    commit
  }, payload) {
    return this.$axios.get(`/groups/${payload.userId}/${payload.status}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('otherGrouplistDoing', res.data)
      })
      .catch((err) => {
        console.error('otherGrouplistDoing :::', err);
      })
  }
};
export const state = () => ({
  grouplist_before: [],
  grouplist_doing: [],
  grouplist_done: [],

  othergrouplist_before: [],
  othergrouplist_doing: [],
  othergrouplist_done: [],

  allgrouplist: [],
  grouplist: [],

  onegroup: null,

});

export const mutations = {
  loadAllGroups(state, payload) {
    state.allgrouplist = payload
  },
  loadGroups(state, payload) {
    state.grouplist = payload
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
  }
};

export const actions = {
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
    return this.$axios.get(`/groups/${payload.status}`, {
        withCredentials: true
      })
      .then((res) => {
        commit('loadGroup', res.data)
      })
      .catch((err) => {
        console.error('loadGroup :::', err);
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
    return this.$axios.get(`/groups/my/${payload.status}`, {
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
    return this.$axios.get(`/groups/my/${payload.status}`, {
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
        commit('myGrouplistBefore', res.data)
      })
      .catch((err) => {
        console.error('myGrouplistBefore :::', err);
      })
  },

  otherGrouplistDoing({
    commit
  }, payload) {
    return this.$axios.get(`/groups/${payload.userId}/${payload.status}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('myGrouplistDoing', res.data)
      })
      .catch((err) => {
        console.error('myGrouplistDoing :::', err);
      })
  }
};
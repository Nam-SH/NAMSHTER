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
  groupAdd(state, payload) {
    state.allgrouplist.unshift(payload)
    state.grouplist_before.unshift(payload)
  },

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
    state.grouplist_before = state.grouplist_before.concat(payload)
  },
  grouplistDoing(state, payload) {
    state.grouplist_doing = state.grouplist_doing.concat(payload)
  },

  otherGrouplistBefore(state, payload) {
    state.othergrouplist_before = state.othergrouplist_before.concat(payload)
  },
  otherGrouplistDoing(state, payload) {
    state.othergrouplist_doing = state.othergrouplist_doing.concat(payload)
  }
};

export const actions = {

  groupAdd({
    commit
  }, payload) {
    return this.$axios.post("/group", {
        name: payload.name,
        intro: payload.intro,
        limit: payload.limit
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
        commit('loadGroups', res.data)
      })
      .catch((err) => {
        console.error('loadGroups :::', err);
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
export const state = () => ({
  mygrouplist_before: [{
      "id": "1",
      "name": "그룹강아지1111",
      "intro": "그룹멍멍1111 그룹멍멍1111 그룹멍멍1111 그룹멍멍1111",
      "limit": "6",
      "status": "0"
    },
    {
      "id": "2",
      "name": "그룹강아지2222",
      "intro": "그룹멍멍2222 그룹멍멍2222 그룹멍멍2222 그룹멍멍2222",
      "limit": "6",
      "status": "0"
    },
  ],
  mygrouplist_doing: [{
      "id": "3",
      "name": "그룹강아지3333",
      "intro": "그룹멍멍3333 그룹멍멍3333 그룹멍멍3333 그룹멍멍3333",
      "limit": "6",
      "status": "1"
    },
    {
      "id": "4",
      "name": "그룹고양이1111",
      "intro": "그룹야옹1111 그룹야옹1111 그룹야옹1111 그룹야옹1111",
      "limit": "5",
      "status": "1"
    },
  ],
  allgrouplist: [{
      "id": "1",
      "name": "그룹강아지1111",
      "intro": "그룹멍멍1111 그룹멍멍1111 그룹멍멍1111 그룹멍멍1111",
      "limit": "6",
      "status": "0"
    },
    {
      "id": "2",
      "name": "그룹강아지2222",
      "intro": "그룹멍멍2222 그룹멍멍2222 그룹멍멍2222 그룹멍멍2222",
      "limit": "6",
      "status": "0"
    },
    {
      "id": "3",
      "name": "그룹강아지3333",
      "intro": "그룹멍멍3333 그룹멍멍3333 그룹멍멍3333 그룹멍멍3333",
      "limit": "6",
      "status": "1"
    },
    {
      "id": "4",
      "name": "그룹고양이1111",
      "intro": "그룹야옹1111 그룹야옹1111 그룹야옹1111 그룹야옹1111",
      "limit": "5",
      "status": "1"
    },
    {
      "id": "5",
      "name": "그룹고양이22",
      "intro": "그룹야옹2222 그룹야옹2222 그룹야옹2222 그룹야옹2222",
      "limit": "5",
      "status": "1"
    },
    {
      "id": "6",
      "name": "그룹고양이3333",
      "intro": "그룹야옹3333 그룹야옹3333 그룹야옹3333 그룹야옹3333",
      "limit": "5",
      "status": "2"
    },
    {
      "id": "7",
      "name": "그룹고양이4444",
      "intro": "그룹야옹4444 그룹야옹4444 그룹야옹4444 그룹야옹4444",
      "limit": "5",
      "status": "2"
    },
    {
      "id": "8",
      "name": "그룹병아리",
      "intro": "그룹삐약 그룹삐약 그룹삐약 그룹삐약",
      "limit": "4",
      "status": "1"
    }
  ],
  grouplist: [{
    "id": "1",
    "name": "그룹강아지1111",
    "intro": "그룹멍멍1111 그룹멍멍1111 그룹멍멍1111 그룹멍멍1111",
    "limit": "6",
    "status": "0"
  }, {
    "id": "2",
    "name": "그룹강아지2222",
    "intro": "그룹멍멍2222 그룹멍멍2222 그룹멍멍2222 그룹멍멍2222",
    "limit": "6",
    "status": "0"
  }, ],
  grouplist1: [{
      "id": "3",
      "name": "그룹강아지3333",
      "intro": "그룹멍멍3333 그룹멍멍3333 그룹멍멍3333 그룹멍멍3333",
      "limit": "6",
      "status": "1"
    },
    {
      "id": "4",
      "name": "그룹고양이1111",
      "intro": "그룹야옹1111 그룹야옹1111 그룹야옹1111 그룹야옹1111",
      "limit": "5",
      "status": "1"
    }, {
      "id": "8",
      "name": "그룹병아리",
      "intro": "그룹삐약 그룹삐약 그룹삐약 그룹삐약",
      "limit": "4",
      "status": "1"
    }
  ],
  grouplist2: [{
      "id": "6",
      "name": "그룹고양이3333",
      "intro": "그룹야옹3333 그룹야옹3333 그룹야옹3333 그룹야옹3333",
      "limit": "5",
      "status": "2"
    },
    {
      "id": "7",
      "name": "그룹고양이4444",
      "intro": "그룹야옹4444 그룹야옹4444 그룹야옹4444 그룹야옹4444",
      "limit": "5",
      "status": "2"
    },
  ],
  onegroup: null,

});

export const mutations = {
  loadAllGroups(state, payload) {
    state.grouplist = payload
  },
  loadGroups(state, payload) {
    state.grouplist = payload
  },
  oneGroupDetail(state, payload) {
    state.onegroup = payload
  },
  myGrouplistBefore(state, payload) {
    state.mygrouplist_before = payload
  },
  myGrouplistDoing(state, payload) {
    state.mygrouplist_doing = payload
  }
};

export const actions = {
  loadAllGroups({
    commit
  }, payload) {
    // this.$axios.get("/group/loadAllGroup", {
    //     withCredentials: true
    //   })
    //   .then((res) => {
    //     commit('loadAllGroup', payload)
    //   })
    //   .error((err) => {
    //     console.error('loadAllGroup :::', err);
    //   })
  },

  loadGroups({
    commit
  }, payload) {
    // this.$axios.get("/group/loadGroup", {
    //     withCredentials: true
    //   })
    //   .then((res) => {
    //     commit('loadGroup', payload)
    //   })
    //   .error((err) => {
    //     console.error('loadGroup :::', err);
    //   })
  },
  oneGroupDetail({
    commit
  }, payload) {
    // this.$axios.get("/group/oneGroupDetail", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     commit('oneGroupDetail', res.data)
    //   })
    //   .error((err) => {
    //     console.error('oneGroupDetail :::', err);
    //   })
  },
  myGrouplistBefore({
    commit
  }, payload) {
    // this.$axios.get("/group/myGrouplistBefore", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     commit('myGrouplistBefore', res.data)
    //   })
    //   .error((err) => {
    //     console.error('myGrouplistBefore :::', err);
    //   })
  },
  myGrouplistDoing({
    commit
  }, payload) {
    // this.$axios.get("/group/myGrouplistDoing", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     commit('myGrouplistDoing', res.data)
    //   })
    //   .error((err) => {
    //     console.error('myGrouplistDoing :::', err);
    //   })
  }
};
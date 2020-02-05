export const state = () => ({
  allgrouplist: [{
      name: "그룹강아지1111",
      intro: "그룹멍멍1111 그룹멍멍1111 그룹멍멍1111 그룹멍멍1111",
      limit: "6",
      staus: "0"
    },
    {
      name: "그룹강아지2222",
      intro: "그룹멍멍2222 그룹멍멍2222 그룹멍멍2222 그룹멍멍2222",
      limit: "6",
      staus: "0"
    },
    {
      name: "그룹강아지3333",
      intro: "그룹멍멍3333 그룹멍멍3333 그룹멍멍3333 그룹멍멍3333",
      limit: "6",
      staus: "1"
    },
    {
      name: "그룹고양이1111",
      intro: "그룹야옹1111 그룹야옹1111 그룹야옹1111 그룹야옹1111",
      limit: "5",
      staus: "1"
    },
    {
      name: "그룹고양이22",
      intro: "그룹야옹2222 그룹야옹2222 그룹야옹2222 그룹야옹2222",
      limit: "5",
      staus: "1"
    },
    {
      name: "그룹고양이3333",
      intro: "그룹야옹3333 그룹야옹3333 그룹야옹3333 그룹야옹3333",
      limit: "5",
      staus: "2"
    },
    {
      name: "그룹고양이4444",
      intro: "그룹야옹4444 그룹야옹4444 그룹야옹4444 그룹야옹4444",
      limit: "5",
      staus: "2"
    },
    {
      name: "그룹병아리",
      intro: "그룹삐약 그룹삐약 그룹삐약 그룹삐약",
      limit: "4",
      staus: "1"
    }
  ],
  grouplist0: [{
    name: "그룹강아지1111",
    intro: "그룹멍멍1111 그룹멍멍1111 그룹멍멍1111 그룹멍멍1111",
    limit: "6",
    staus: "0"
  }, {
    name: "그룹강아지2222",
    intro: "그룹멍멍2222 그룹멍멍2222 그룹멍멍2222 그룹멍멍2222",
    limit: "6",
    staus: "0"
  }, ],
  grouplist1: [{
      name: "그룹강아지3333",
      intro: "그룹멍멍3333 그룹멍멍3333 그룹멍멍3333 그룹멍멍3333",
      limit: "6",
      staus: "1"
    },
    {
      name: "그룹고양이1111",
      intro: "그룹야옹1111 그룹야옹1111 그룹야옹1111 그룹야옹1111",
      limit: "5",
      staus: "1"
    }, {
      name: "그룹병아리",
      intro: "그룹삐약 그룹삐약 그룹삐약 그룹삐약",
      limit: "4",
      staus: "1"
    }
  ],
  grouplist2: [{
      name: "그룹고양이3333",
      intro: "그룹야옹3333 그룹야옹3333 그룹야옹3333 그룹야옹3333",
      limit: "5",
      staus: "2"
    },
    {
      name: "그룹고양이4444",
      intro: "그룹야옹4444 그룹야옹4444 그룹야옹4444 그룹야옹4444",
      limit: "5",
      staus: "2"
    },
  ],

});

export const mutations = {
  loadAllGroup(state, payload) {
    state.grouplist = payload
  },
  loadGroup(state, payload) {
    state.grouplist = payload
  }
};

export const actions = {
  loadAllGroup({
    commit
  }, payload) {
    // this.$axios.get("/loadAllGroup", {
    //     withCredentials: true
    //   })
    //   .then((res) => {
    //     commit('loadAllGroup', payload)
    //   })
  },

  loadGroup({
    commit
  }, payload) {
    // this.$axios.get("/loadGroup", {
    //     withCredentials: true
    //   })
    //   .then((res) => {
    //     commit('loadGroup', payload)
    //   })
  }
};
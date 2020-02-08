export const state = () => ({

});

export const mutations = {};

export const actions = {
  nuxtServerInit({
    dispatch
  }, {
    req
  }) {
    return Promise.all([dispatch('users/loadUser'), dispatch('groups/loadAllGroups')])
  },

};
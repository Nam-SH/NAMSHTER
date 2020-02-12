export const state = () => ({

});

export const mutations = {};

export const actions = {
  nuxtServerInit({
    dispatch
  }, {
    req
  }) {
    return Promise.all([dispatch('users/loadUser'), dispatch('groups/loadGroups', {
      status: 0,
      limit: 5
    })])
  },

};
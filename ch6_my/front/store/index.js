export const state = () => ({

});

export const mutations = {};

export const actions = {
  nuxtServerInit({
    dispatch
  }, {
    req
  }) {
    return Promise.all([dispatch('users/loadUser'), dispatch('groups/grouplistDoing', {
      status: 1,
      limit: 5
    })])
  },

};
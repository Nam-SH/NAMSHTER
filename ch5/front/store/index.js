export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    return dispatch('users/loadUser');
  },
};
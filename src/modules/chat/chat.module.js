export const GET_HIGHER = 'chat/GET_HIGHER';

import store from '../../store';

const state = {
  shouldGetHigher: false
};

const mutations = {
  [GET_HIGHER](state) {  
    state.shouldGetHigher = !state.shouldGetHigher;
  }
}
const getters = {
  shouldGetHigher: state => state.shouldGetHigher
};

export default {
  state,
  getters,
  mutations
}

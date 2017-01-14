export const ADD_FEELING = 'feeling/ADD_FEELING';
export const ADDING_FEELING = 'feeling/ADDING_FEELING';
export const ADDING_FEELING_ERR = 'feeling/ADDING_FEELING_ERR';

import feelingService from '../../services/feeling.service';
import { mapGetters } from 'vuex';

const state = {
  currFeeling: {},
  isloadingFeeling: false,
  loading: false,
  error: null
}

const mutations = {
  [ADDING_FEELING](state, feeling) {
    state.currFeeling = feeling;
    state.isloadingFeeling = !state.isloadingFeeling;
  },
  [ADDING_FEELING_ERR](state, error) {
    state.error = error;
    state.isloadingFeeling = !state.isloadingFeeling;
  },
}

const actions = {
  addFeeling({ commit, state }, feeling) {
    console.log('feeling module: ', feeling);
    commit(ADDING_FEELING, feeling);
    feelingService.submitFeeling(feeling).then(feeling => {
      commit(ADDING_FEELING, feeling);
    }).catch(err => {
      commit(ADDING_FEELING_ERR, err);
    });
  },
};

const getters = {
  isloadingFeeling: state => state.isloadingFeeling,
}

export default {
  state,
  getters,
  actions,
  mutations
}
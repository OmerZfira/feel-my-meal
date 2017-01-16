export const ADD_FEELING = 'feeling/ADD_FEELING';
export const ADDING_FEELING = 'feeling/ADDING_FEELING';
export const ADDING_FEELING_ERR = 'feeling/ADDING_FEELING_ERR';
export const GET_FEELINGS = 'meal/GET_FEELINGS';
export const GET_FEELINGS_SUCCESS = 'meal/GET_FEELINGS_SUCCESS';
export const GET_FEELINGS_ERROR = 'meal/GET_FEELINGS_ERROR';

import feelingService from '../../services/feeling.service';
import { mapGetters } from 'vuex';

const state = {
  feelings: [],
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
  [GET_FEELINGS]( state ) {
    state.loading = true;
  },
  [GET_FEELINGS_SUCCESS] ( state, feelings ) {
    state.feelings = feelings;
    state.loading = false;
  },
  [GET_FEELINGS_ERROR] ( state, feelings ) {
    state.loading = false;
  }
}

const actions = {
  getFeelings({ commit }) {
    if (state.feelings.length) {
      commit(GET_FEELINGS_SUCCESS, state.feelings);
      return;
    }
    commit(GET_FEELINGS);
    return feelingService.getFeelings().then(feelings => {
      commit(GET_FEELINGS_SUCCESS, feelings);
      return feelings;
    }).catch(err => {
      commit(GET_FEELINGS_ERROR, err);
    });
  },

  addFeeling({ commit, state }, feeling) {
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
  feelings: state => state.feelings,
}

export default {
  state,
  getters,
  actions,
  mutations
}
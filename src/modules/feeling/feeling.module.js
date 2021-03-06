export const ADD_FEELING = 'feeling/ADD_FEELING';
export const ADDING_FEELING = 'feeling/ADDING_FEELING';
export const ADDING_FEELING_ERR = 'feeling/ADDING_FEELING_ERR';
export const GET_FEELINGS_BY_USER = 'feeling/GET_FEELINGS_BY_USER';
export const GET_FEELINGS_BY_USER_SUCCESS = 'feeling/GET_FEELINGS_BY_USER_SUCCESS';
export const GET_FEELINGS_BY_USER_ERROR = 'feeling/GET_FEELINGS_BY_USER_ERROR';
export const CLEAR_FEELINGS_CACHE = 'feeling/CLEAR_FEELINGS_CACHE';

import feelingService from '../../services/feeling.service';
import { mapGetters } from 'vuex';
import toastr from 'toastr';

const state = {
  feelings: [],
  currFeeling: {},
  isloadingFeeling: false,
  loading: false,
  error: null
}

const mutations = {
  [ADDING_FEELING](state, feeling) {
    toastr.options.closeButton = true;
    toastr.success('Great! Your feeling was added!');
    state.currFeeling = feeling;
    state.feelings.push(feeling);
    state.isloadingFeeling = !state.isloadingFeeling;
  },
  [ADDING_FEELING_ERR](state, error) {
    toastr.options.closeButton = true;
    toastr.error('There was a problem to add a feeling.');
    state.error = error;
    state.isloadingFeeling = !state.isloadingFeeling;
  },
  [GET_FEELINGS_BY_USER](state) {
    state.loading = true;
  },
  [GET_FEELINGS_BY_USER_SUCCESS](state, feelings) {
    state.feelings = feelings;
    state.loading = false;
  },
  [GET_FEELINGS_BY_USER_ERROR](state, feelings) {
    state.loading = false;
  },
  [CLEAR_FEELINGS_CACHE](state) {
    state.feelings = [];
  },
}

const actions = {

  addFeeling({ commit, state }, feeling) {
    feelingService.submitFeeling(feeling).then(feeling => {
      commit(ADDING_FEELING, feeling);
    }).catch(err => {
      commit(ADDING_FEELING_ERR, err);
    });
  },

  getFeelingsByUser({ commit, state }, user) {
    if (state.feelings.length) {
      commit(GET_FEELINGS_BY_USER_SUCCESS, state.feelings);
      return state.feelings;
    }
    commit(GET_FEELINGS_BY_USER);
    return feelingService.getFeelingsByUser({ user }).then(feelings => {
      commit(GET_FEELINGS_BY_USER_SUCCESS, feelings);
      return feelings;
    }).catch(err => {
      commit(GET_FEELINGS_BY_USER_ERROR, err);
    });
  },
};

const getters = {
  isloadingFeeling: state => state.isloadingFeeling,
  feelings: state => state.feelings,
}

const setters = {
  isloadingFeeling: state => state.isloadingFeeling,
  feelings: state => state.feelings,
}

export default {
  state,
  setters,
  getters,
  actions,
  mutations
}
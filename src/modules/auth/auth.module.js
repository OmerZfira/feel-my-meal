export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_OUT = 'auth/SIGN_OUT';
export const SAVING_SETTINGS = 'auth/SAVING_SETTINGS';
export const SAVE_SETTINGS = 'auth/SAVE_SETTINGS';
export const SAVE_SETTINGS_ERR = 'auth/SAVE_SETTINGS_ERR';

import store from '../../store';
import authService from '../../services/auth.service';
import toastr from 'toastr';

const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  isLoadingSettings: false
};

const mutations = {
  [SIGN_IN](state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  [SIGN_OUT](state) {
    state.isLoggedIn = false;
  },
  [SAVING_SETTINGS](state) {
    state.isLoadingSettings = true;
  },
  [SAVE_SETTINGS](state, { settings }) {
    state.user.settings = { pushTimer: settings.pushTimer, lang: settings.lang };
    state.isLoadingSettings = !state.isLoadingSettings;
    toastr.options.closeButton = true;
    toastr.success('Your settings were set!');
    localStorage.setItem('user', JSON.stringify(state.user)); // REMOVE THIS WHEN USING REAL SIGNIN
  },
  [SAVE_SETTINGS_ERR](state, error) {
    state.error = error;
    state.isLoadingSettings = !state.isLoadingSettings;
    toastr.options.closeButton = true;
    toastr.error('OOPS.. there was a problem with submmiting your settings');
  },
}

const actions = {
  saveSettings({ commit, state }, updatedUser) {
    commit(SAVING_SETTINGS);
    authService.saveSettings(updatedUser).then(updatedUser => {
      commit(SAVE_SETTINGS, updatedUser);
    }).catch(err => {
      commit(SAVE_SETTINGS_ERR, err);
    });
  },
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user,
  isLoadingSettings: state => state.isLoadingSettings,
};

export default {
  state,
  getters,
  actions,
  mutations
}

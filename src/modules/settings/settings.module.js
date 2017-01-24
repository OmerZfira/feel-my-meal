export const SAVING_SETTINGS = 'settings/SAVING_SETTINGS';
export const SAVE_SETTINGS = 'settings/SAVE_SETTINGS';
export const SAVE_SETTINGS_ERR = 'settings/SAVE_SETTINGS_ERR';

import settingsService from '../../services/settings.service';
import { mapGetters } from 'vuex';
import toastr from 'toastr';
const state = {
  settings: {
    pushTimer: 4,
    lang: null
  },
  isLoadingSettings: false
}

const mutations = {
  [SAVING_SETTINGS](state) {
    console.log('now loading new settings');
    state.isLoadingSettings = true
  },
  [SAVE_SETTINGS](state, {pushTimer, lang}) {
    console.log('result setting in module: ', {pushTimer, lang});
    state.settings = { pushTimer, lang };
    state.isLoadingSettings = !state.isLoadingSettings;
    toastr.options.closeButton = true;
    toastr.success('Your settings were set!');
  },
  [SAVE_SETTINGS_ERR](state, error) {
    toastr.options.closeButton = true;
    toastr.error('OOPS.. there was a problem with submmiting your settings');
    state.error = error;
    state.isLoadingSettings = !state.isLoadingSettings; 
  },
}

const actions = {
  saveSettings({ commit, state }, settings) {
    commit(SAVING_SETTINGS);
    settingsService.saveSettings(settings).then(user => {
      commit(SAVE_SETTINGS, user);
    }).catch(err => {
      commit(SAVE_SETTINGS_ERR, err);
    });
  },
};

const getters = {
  isLoadingSettings: state => state.isLoadingSettings,
  settings: state => state.settings,
}

export default {
  state,
  getters,
  actions,
  mutations
}
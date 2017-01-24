

// import settingsService from '../../services/settings.service';
// import { mapGetters } from 'vuex';

// const state = {
//   settings: {
//     pushTimer: 4,
//     lang: null
//   },
//   isLoadingSettings: false
// }

// const mutations = {
//   [SAVING_SETTINGS](state) {
//     console.log('now loading new settings');
//     state.isLoadingSettings = true
//   },
//   [SAVE_SETTINGS](state, { settings }) {
//     console.log('result setting in module: ', settings);
//     state.settings = { pushTimer: settings.pushTimer, lang: settings.lang };
//     state.isLoadingSettings = !state.isLoadingSettings;
//   },
//   [SAVE_SETTINGS_ERR](state, error) {
//     state.error = error;
//     state.isLoadingSettings = !state.isLoadingSettings;
//   },
// }

// const actions = {
//   saveSettings({ commit, state }, updatedUser) {
//     commit(SAVING_SETTINGS);
//     settingsService.saveSettings(updatedUser).then(updatedUser => {
//       commit(SAVE_SETTINGS, updatedUser);
//     }).catch(err => {
//       commit(SAVE_SETTINGS_ERR, err);
//     });
//   },
// };

// const getters = {
//   isLoadingSettings: state => state.isLoadingSettings,
//   settings: state => state.settings,
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }
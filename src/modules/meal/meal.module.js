export const ADD_MEAL = 'meal/ADD_MEAL';
export const ADDING_MEAL = 'meal/ADDING_MEAL';
export const ADDING_MEAL_ERR = 'meal/ADDING_MEAL_ERR';

import mealService from '../../services/meal.service';
import { mapGetters } from 'vuex';

const state = {
  currMeal: {},
  isloadingMeal: false,
  loading: false,
  error: null
}

const mutations = {
  [ADDING_MEAL](state, meal) {
    state.currMeal = meal;
    state.isloadingMeal = !state.isloadingMeal;
  },
  [ADDING_MEAL_ERR](state, error) {
    state.error = error;
    state.isloadingMeal = !state.isloadingMeal;
  },
}

const actions = {
  addMeal({ commit, state }, meal) {
    commit(ADDING_MEAL, meal);
    mealService.submitMeal(meal).then(meal => {
      commit(ADDING_MEAL, meal);
    }).catch(err => {
      commit(ADDING_MEAL_ERR, err);
    });
  },
};

const getters = {
  isloadingMeal: state => state.isloadingMeal,
}

export default {
  state,
  getters,
  actions,
  mutations
}
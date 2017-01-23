export const ADD_MEAL = 'meal/ADD_MEAL';
export const ADDING_MEAL = 'meal/ADDING_MEAL';
export const ADDING_MEAL_ERR = 'meal/ADDING_MEAL_ERR';
export const GET_MEALS_BY_USER = 'meal/GET_MEALS_BY_USER';
export const GET_MEALS_BY_USER_SUCCESS = 'meal/GET_MEALS_BY_USER_SUCCESS';
export const GET_MEALS_BY_USER_ERROR = 'meal/GET_MEALS_BY_USER_ERROR';


import toastr from 'toastr';
import mealService from '../../services/meal.service';
import { mapGetters } from 'vuex';

const state = {
  latestMeals: [],
  userId: '',
  currMeal: {},
  isloadingMeal: false,
  loading: false,
  error: null
}

const mutations = {
  [ADDING_MEAL](state, meal) {
    toastr.options.closeButton = true;
    toastr.success('Great! Your meal was added!');

    state.currMeal = meal;
    state.latestMeals.push(meal);

    state.isloadingMeal = !state.isloadingMeal;
    
  },
  [ADDING_MEAL_ERR](state, error) {
    toastr.options.closeButton = true;
    toastr.error('There was a problem to add a meal');
    state.error = error;
    state.isloadingMeal = !state.isloadingMeal;
  },


  [GET_MEALS_BY_USER]( state ) {
    state.loading = true;
  },
  [GET_MEALS_BY_USER_SUCCESS] ( state, latestMeals ) {
    state.latestMeals = latestMeals;
    state.loading = false;
  },
  [GET_MEALS_BY_USER_ERROR] ( state, latestMeals ) {
    state.loading = false;
  },

}

const actions = {
  addMeal({ commit, state }, meal) {
    // commit(ADDING_MEAL, meal);
    mealService.submitMeal(meal).then(meal => {
      commit(ADDING_MEAL, meal);
    }).catch(err => {
      commit(ADDING_MEAL_ERR, err);
    });

  },


  getMealsByUser({ commit, state }, user) {
    if (state.latestMeals.length) {
      commit(GET_MEALS_BY_USER_SUCCESS, state.latestMeals);
      return state.latestMeals;
    }
    commit(GET_MEALS_BY_USER);
    
    return mealService.getMealsByUser({user}).then(latestMeals => {
      commit(GET_MEALS_BY_USER_SUCCESS, latestMeals);
      return latestMeals;
    }).catch(err => {
      commit(GET_MEALS_BY_USER_ERROR, err);
    });
  }

};

const getters = {
  isloadingMeal: state => state.isloadingMeal,
  latestMeals: state => state.latestMeals,
  currMeal: state => state.currMeal
  // loading : state => state.loading
  // checkoutPending: state => state.loading,
  // error          : state => state.error,
  // cart( state ) {
  //   return state.items.filter(i => i.quantity);
  // },
  // cartTotal( _, getters ) {
  //   return getters.cart.reduce(( acc, item ) => {
  //     return acc + (parseInt(item.quantity) * item.price);
  //   }, 0);
  // },
  // cartLength( _, getters ) {
  //   return getters.cart.length;
  // }

}

export default {
  state,
  getters,
  actions,
  mutations
}
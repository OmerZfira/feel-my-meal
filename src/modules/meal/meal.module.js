export const ADD_MEAL = 'meal/ADD_MEAL';
export const ADDING_MEAL = 'meal/ADDING_MEAL';
export const ADDING_MEAL_ERR = 'meal/ADDING_MEAL_ERR';
export const GET_MEALS = 'meal/GET_MEALS';
export const GET_MEALS_SUCCESS = 'meal/GET_MEALS_SUCCESS';
export const GET_MEALS_ERROR = 'meal/GET_MEALS_ERROR';
// export const ADD_TO_CART = 'cart/ADD_TO_CART';
// export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
// export const CHECKOUT = 'cart/CHECKOUT';
// export const CHECKOUT_SUCCESS = 'cart/CHECKOUT_SUCCESS';
// export const CHECKOUT_ERROR = 'cart/CHECKOUT_ERROR';


import mealService from '../../services/meal.service';
import { mapGetters } from 'vuex';

const state = {
  meals: [],
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

  [GET_MEALS]( state ) {
    state.loading = true;
  },
  [GET_MEALS_SUCCESS] ( state, meals ) {
    state.meals = meals;
    state.loading = false;
  },
  [GET_MEALS_ERROR] ( state, meals ) {
    state.loading = false;
  },
  // [UPDATE_QUANTITY]( _, { meal, quantity } ) {
  //   meal.quantity = quantity;
  // }

  // [CHECKOUT_SUCCESS]( state ) {
  //   state.items = [];
  //   state.loading = false;
  // },
  // [ADD_TO_CART]( state, item ) {
  //   let itemExists = state.items.indexOf(item) > -1;
  //   if( !itemExists ) {
  //     state.items.push(item);
  //   }
  // },
  // [REMOVE_FROM_CART]( state, item ) {
  //   item.quantity = 0;
  //   state.items.splice(state.items.indexOf(item), 1);
  // },
  // [CHECKOUT]( state ) {
  //   state.loading = true;
  // },
  // [CHECKOUT_SUCCESS]( state ) {
  //   state.items = [];
  //   state.loading = false;
  // },
  // [CHECKOUT_ERROR]( state, error ) {
  //   state.error = error;
  //   state.loading = false;
  // }

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

  getMeals({ commit }) {
    if (state.meals.length) {
      commit(GET_MEALS_SUCCESS, state.meals);
      return;
    }
    commit(GET_MEALS);
    mealService.getMeals().then(meals => {
      commit(GET_MEALS_SUCCESS, meals);
    }).catch(err => {
      commit(GET_MEALS_ERROR, err);
    });
  }
  // checkout( { commit } ) {
  //   commit(CHECKOUT);
  //   mealService.checkout().then(_ => {
  //     commit(CHECKOUT_SUCCESS);
  //     swal({
  //       title: "Busted!!!!",
  //       type : "success",
  //       text : "I took all your money",
  //     });
  //   }).catch(err => {
  //     commit(CHECKOUT_ERROR, err);
  //   });
  // },

};

const getters = {
  isloadingMeal: state => state.isloadingMeal,
  meals: state => state.meals,
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
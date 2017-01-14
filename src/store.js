import Vuex from 'vuex';
import authModule from './modules/auth/auth.module';
import shopModule from './modules/shop/shop.module';
import cartModule from './modules/cart/cart.module';
import mealModule from './modules/meal/meal.module';
import feelingModule from './modules/feeling/feeling.module';

const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  modules: {
    auth : authModule,
    shop: shopModule,
    cart : cartModule,
    meal : mealModule,
    feeling : feelingModule
  },
  strict : !isProduction
})

import Vuex from 'vuex';
import authModule from './modules/auth/auth.module';
import mealModule from './modules/meal/meal.module';
import feelingModule from './modules/feeling/feeling.module';
// import settingsModule from './modules/settings/settings.module';

const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  modules: {
    auth : authModule,
    meal : mealModule,
    feeling : feelingModule,
    // settings : settingsModule,

  },
  strict : !isProduction
})
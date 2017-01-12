import './style.scss';
import './vendor';
import './vue-plugins';

import Vue from 'vue';
import moment from 'moment';
import jquery from 'jquery'
window.jQuery = jQuery;
import store from './store';
import router from './routes';
import MainNav from './components/main-nav';
const app = new Vue({
  router,
  store,
  moment,
  components: {
    MainNav
  }
}).$mount('#app');


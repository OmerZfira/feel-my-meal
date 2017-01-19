import './style.scss';
import './vendor';
import './vue-plugins';
import './sw-init';

import Vue from 'vue';

import moment from 'moment';
import store from './store';
import router from './routes';
import MainNav from './components/main-nav';
import BottomNav from './components/bottom-nav/bottom-nav';
import ModalFeeling from './components/modal-feeling/modal-feeling';

if(process.env.NODE_ENV === 'development'){
  Vue.http.options.root = 'http://localhost:3003';
} else  console.log(process.env.NODE_ENV);
const app = new Vue({
  router,
  store,
  moment,
  components: {
    MainNav,
    BottomNav,
    ModalFeeling,
  },
  data: {
    showModal: false
  },
  mounted() {
    var path = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : 'https://feelmymeal.herokuapp.com';
    if (window.location.href === (path + '/#')) this.showModal = true;
  }
}).$mount('#app');


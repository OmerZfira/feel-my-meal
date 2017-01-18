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
    if (window.location.href === 'http://localhost:8080/#') this.showModal = true;
  }
}).$mount('#app');


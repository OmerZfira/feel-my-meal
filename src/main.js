import './style.scss';
import './vendor';
import './vue-plugins';
import './sw-init';

import Vue from 'vue';
import moment from 'moment';
import store from './store';
import { mapGetters } from 'vuex';
import router from './routes';
import MainNav from './components/main-nav';
import BottomNav from './components/bottom-nav/bottom-nav';
import ModalFeeling from './components/modal-feeling/modal-feeling';
import toastr from 'toastr';

if (process.env.NODE_ENV === 'development') {
	Vue.http.options.root = 'http://localhost:3003';
} else {
	console.log('env: ', process.env.NODE_ENV);
	Vue.http.options.root = 'https://feelmymeal.herokuapp.com/';
}


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
    computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    })
    },
  mounted() {
    let path = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/add-feeling#/' : 'https://coding-academy.net/feelmymeal/#/add-feeling';
    if (window.location.href === (path)) this.showModal = true;
  }
}).$mount('#app');


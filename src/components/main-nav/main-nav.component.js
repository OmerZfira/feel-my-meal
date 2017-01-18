import {mapMutations, mapGetters} from 'vuex';
import authService from '../../services/auth.service';
import {SIGN_OUT} from '../../modules/auth/auth.module';
import {REMOVE_FROM_CART} from '../../modules/cart/cart.module';

export default {
  name    : 'main-nav',
  methods : {
    signout() {
      authService.signout();
      this.$store.commit(SIGN_OUT);
      this.$router.push('/');
    },
    closeMenu() {
      this.$refs.checkbox.checked = false;
    },
    ...mapMutations({
      removeFromCart: REMOVE_FROM_CART
    })
  },
  computed: {

    ...mapGetters([
      'cartLength',
      'cart'
    ]),
    ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        user: 'user'
      }
    ),
  },
}

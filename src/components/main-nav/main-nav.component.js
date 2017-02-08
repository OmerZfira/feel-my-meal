import { mapMutations, mapGetters } from 'vuex';
import authService from '../../services/auth.service';
import { SIGN_OUT } from '../../modules/auth/auth.module';
import { CLEAR_FEELINGS_CACHE } from '../../modules/feeling/feeling.module';
import { CLEAR_MEALS_CACHE } from '../../modules/meal/meal.module';

export default {
  name: 'main-nav',
  data() {
    return {
      checkboxVal: false,
      shouldGetHigher: false
    }
  },
  methods: {
    signout() {
      authService.signout();
      this.$store.commit(SIGN_OUT);
      this.$store.commit(CLEAR_FEELINGS_CACHE);
      this.$store.commit(CLEAR_MEALS_CACHE);
      this.$router.push('/signin');
    },
    closeMenu() {
      this.checkboxVal = false;
    },
    
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      user: 'user'
    }),
    logoSrc() {
      let src = (this.isLoggedIn) ? require('../../assets/img/logo-sporty-transparent.png') : require('../../assets/img/logo.png');
      
      return src
    }
  },
  watch: {
    shouldGetHigher() {
      console.log('changed', this.shouldGetHigher);
    }
  }
}

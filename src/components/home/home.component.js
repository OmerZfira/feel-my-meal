
 import addContact from '../add-contact';
 import addMeal from '../add-meal';
 import clockMeal from '../utils/clock-meal/clock-meal';

 import authService from '../../services/auth.service';
 

export default  {
  data: () => {
    return {

    }
  },
  methods : {
  },
  components: {
    addContact,
    addMeal,
    clockMeal
  },
  created() {
  },
  beforeRouteEnter(to, from, next) {
    authService.redirectToSignin(next);
  }
}
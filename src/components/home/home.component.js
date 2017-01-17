import addContact from '../add-contact';
import addMeal from '../add-meal/add-meal';
import clockMeal from '../utils/clock-meal/clock-meal';

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
    // sw1();
  //   if (!navigator.serviceWorker) console.log('NO SW!');
  //   else {
  //     var x = navigator.serviceWorker.register('../../sw1');
  //     console.log('container: ', navigator.serviceWorker);
  //     console.log('promise: ', x);
  //   }
  }
}
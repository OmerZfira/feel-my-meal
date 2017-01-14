import Vue from 'vue';
import moment from 'moment';
function submitMeal({ foods, userId }) {
    console.log('SUBMITTING NEW MEAL TO SERVER');
    return Vue.http.post('http://localhost:3003/data/meal', { foods, userId, time: Date.now() })
        .then(res => res.json())
        .then(meal => {
            return meal;
            
        });
}

export function getMeals() {
  return Vue.http.get('http://localhost:3003/data/meal')
        .then(res => res.json())
        .then(meal => {
            return meal;   
        });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(generateMeals());
  //   }, 1000);
  // })
}
export function generateMeals() {
  const meals = [{
                    id: '1',
                    title: 'Banana, Apple',
                    start: moment(1484210059985).format(),
                    end: moment(1484223059985).format(),
                    backgroundColor: '2a3744'
                    // allDay: true
                }];
  return meals;
}
export default {
    submitMeal,
    getMeals
}

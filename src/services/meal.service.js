import Vue from 'vue';
import moment from 'moment';

function submitMeal({ foods, userId }) {
    return Vue.http.post('data/meal', { foods, userId, time: Date.now() })
        .then(res => res.json())
        .then(meal => {
            return meal;
            
        });
}


export function getMealsByUser({user}) {
  return Vue.http.post('getMealByUser',user )
        
        .then(res => res.json())
        .then(meal => {
            return meal;   
        });
}

export default {
    submitMeal,
    getMealsByUser
}

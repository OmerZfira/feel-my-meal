import Vue from 'vue';

function submitMeal({ foods, userId }) {
    return Vue.http.post('data/meal', { foods, userId, time: Date.now() })
        .then(res => res.json())
        .then(meal => {
            return meal;
            
        });
}


export function getMealsByUser({user}) {
    console.log('user', user);
    
  return Vue.http.post('getMealByUser', user )
        
        .then(res => res.json())
        .then(meals => {
            return meals;   
        });
}

export default {
    submitMeal,
    getMealsByUser
}

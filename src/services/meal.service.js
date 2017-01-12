import Vue from 'vue';

function submitMeal({ foods, userId }) {
    console.log('SUBMITTING NEW MEAL TO SERVER');
    return Vue.http.post('http://localhost:3003/data/meal', { foods, userId, time: Date.now() })
        .then(res => res.json())
        .then(meal => {
            return meal;
            
        });
}



export default {
    submitMeal
}

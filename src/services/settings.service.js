import Vue from 'vue';
import moment from 'moment';


function submitSettings({ foods, userId }) {
    console.log('SUBMITTING NEW SETTINGS TO SERVER');
    return Vue.http.put('data/meal', { foods, userId, time: Date.now() })
        .then(res => res.json())
        .then(meal => {
            return meal;  
        });
}

export default {
    submitSettings
}

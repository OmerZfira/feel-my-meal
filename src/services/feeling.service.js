import Vue from 'vue';

function submitFeeling({ rating, userId }) {
    return Vue.http.post('http://localhost:3003/data/feeling', { rating, userId, time: Date.now() })
        .then(res => res.json())
        .then(feeling => {
            return feeling;
            
        });
}



export default {
    submitFeeling
}

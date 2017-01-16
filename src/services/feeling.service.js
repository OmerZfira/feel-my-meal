import Vue from 'vue';

function submitFeeling({ rating, userId }) {
    return Vue.http.post('http://localhost:3003/data/feeling', { rating, userId, time: Date.now() })
        .then(res => res.json())
        .then(feeling => {
            return feeling;
            
        });
}
export function getFeelings() {
  return Vue.http.get('http://localhost:3003/data/feeling')
        .then(res => res.json())
        .then(feeling => {
            return feeling;   
        });
}


export default {
    submitFeeling,
    getFeelings
}

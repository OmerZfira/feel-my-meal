import Vue from 'vue';

function submitFeeling({ rating, userId }) {
    return Vue.http.post('data/feeling', { rating, userId, time: Date.now() })
        .then(res => res.json())
        .then(feeling => {
            return feeling;
            
        });
}
export function getFeelingsByUser({user}) {
  return Vue.http.post('getFeelingsByUser',user )
        .then(res => res.json())
        .then(feeling => {
            return feeling;   
        });
}

export default {
    submitFeeling,
    getFeelingsByUser
}

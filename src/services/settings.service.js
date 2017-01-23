import Vue from 'vue';

function saveSettings({ pushTimer, lang, _id }) {
    console.log('SUBMITTING NEW SETTINGS TO SERVER', { pushTimer, lang, _id });
    return Vue.http.put('data/user', { pushTimer, lang, _id })
        .then(res => res.json())
        .then(user => {
            return user;  
        });
}

export default {
    saveSettings
}

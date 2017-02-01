import Vue from 'vue';

/**
 *
 * @param email
 * @param password
 * @returns {Promise}
 */
function signin( {email,password} ) {
  return Vue.http.post('login', {username: email, pass: password} )
    .then(res => res.json())
    .then(({token, user}) => {
      console.log('authservice user:', user);
      setSession(token, user);
      return user;
    })
}

/**
 *
 * @param email
 * @param password
 */

function signup({ email: username, password: pass }) {
    return Vue.http.post('signup', { username , pass , settings: {pushTimer: 4, lang: null}})
        .then(res => res.json())
        .then(user => {
            return user;
        })
        .catch(err =>  {
          console.warn('stat: ', err.status);
          return err.json();
        })
        .then(res => {
          console.warn('err: ', res.error);
        });
}

/**
 *
 * @param token
 */
function setSession( token, user ) {
  console.log('user', JSON.stringify(user));
  
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Remove session
 */
function signout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 *
 * @returns {boolean}
 */
function isLoggedIn() {
  return !!localStorage.getItem('token');
}

/**
 *
 * @returns {promise}
 */
function saveSettings({ settings, _id }) {
    return Vue.http.put('data/user', { settings, _id })
        .then(res => res.json())
        .then(user => {
            return user;  
        });
}

/**
 *
 * @param next
 */
function protectRoute( next ) {
  if( isLoggedIn() ) {
    next();
  } else {
    next(false);
  }
}

function redirectToSignin( next ) {
  if( isLoggedIn() ) {
    next();
  } else {
    next({ name: 'signin' });
  }
}

export default {
  signin,
  signup,
  signout,
  setSession,
  isLoggedIn,
  protectRoute,
  redirectToSignin,
  saveSettings
}

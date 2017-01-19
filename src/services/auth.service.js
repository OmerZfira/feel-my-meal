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
      // console.log('Signedin user:', user);
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
    return Vue.http.post('signup', { username , pass })
        .then(res => res.json())
        .then(user => {
            return user;
        });
}

/**
 *
 * @param token
 */
function setSession( token, user ) {
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
 * @param next
 */
function protectRoute( next ) {
  if( isLoggedIn() ) {
    next();
  } else {
    next(false);
  }
}

export default {
  signin,
  signup,
  signout,
  setSession,
  isLoggedIn,
  protectRoute,
}

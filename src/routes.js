import VueRouter from 'vue-router';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
// import Admin from './components/admin/admin';
// import Users from './components/admin/users';
// import Contacts from './components/admin/contact/contact';
import MyMeals from './components/my-meals';
import Settings from './components/settings/settings';
import MyStatistics from './components/my-statistics/my-statistics.vue';
import Chat from './components/chat';


const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  alias: '/feeling'
// }, {
//   path: '/feeling',
//   name: 'add-feeling',
//   component: Home
}, {
  path: '/signin',
  name: 'signin',
  component: Signin
},
{
  path: '/signup',
  name: 'signup',
  component: Signup
},
{
  path: '/settings',
  name: 'settings',
  component: Settings
},
{
  path: '/my-meals',
  name: 'my-meals',
  component: MyMeals
},
{
  path: '/my-statistics',
  name: 'my-statistics',
  component: MyStatistics
},
{
  path: '/chat',
  name: 'chat',
  component: Chat
},
// {
//   path: '/admin',
//   name: 'admin',
//   component: Admin,
//   children: [
//     {
//       path: 'users',
//       name: 'users',
//       component: Users
//     },
//     {
//       path: 'contacts',
//       name: 'contacts',
//       component: Contacts
//     }
//   ]
// },
 
{ path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes,

  // scrollBehavior (to, from, savedPosition) {
  //        return { x: 0, y: 0 }
  //    }
});

export default router
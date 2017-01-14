import VueRouter from 'vue-router';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import Shop from './components/shop';
import Cart from './components/cart';
import Admin from './components/admin/admin';
import Users from './components/admin/users';
import Contacts from './components/admin/contact/contact';
import MyMeals from './components/my-meals';
import Settings from './components/settings';
import MyStatistics from './components/my-statistics/my-statistics.vue';

const routes = [{
  path: '/',
  name: 'home',
  component: Home
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
  path: '/shop',
  name: 'shop',
  component: Shop
},
{
  path: '/cart',
  name: 'cart',
  component: Cart
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
  path: '/admin',
  name: 'admin',
  component: Admin,
  children: [
    {
      path: 'users',
      name: 'users',
      component: Users
    },
    {
      path: 'contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
},

{ path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
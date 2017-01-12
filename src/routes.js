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
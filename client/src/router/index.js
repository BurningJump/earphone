import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Link from '@/pages/link';
import Board from '@/pages/board';
import GluttonousSnake from '@/pages/GluttonousSnake';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/link',
      name: 'Link',
      component: Link
    },
    {
      path: '/GluttonousSnake',
      name: 'GluttonousSnake',
      component: GluttonousSnake
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    }
  ]
});

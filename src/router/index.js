//importar .vues y ruta
// LOS COMPONENTES NO SE PONEN AQUI SOLO VIEWS

import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import InfoPlayer from "../views/InfoPlayer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/InfoPlayer',
      name: 'InfoPlayer',
      component: InfoPlayer
    }
  ]
});

export default router;

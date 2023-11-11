//importar .vues y ruta
// LOS COMPONENTES NO SE PONEN AQUI SOLO VIEWS

import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/',
      name: 'SignIn',
      component: HomeView
    },
    {
      path: '/',
      name: 'SignUp',
      component: HomeView
    }
  ]
});

export default router;

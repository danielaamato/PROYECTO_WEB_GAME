//importar .vues y ruta
// LOS COMPONENTES NO SE PONEN AQUI SOLO VIEWS

import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import InfoPlayer from "../views/InfoPlayer.vue";
import  EliminarPlayer from "../views/EliminarPlayer.vue";
import CreateArenaView from "../views/CreateArenaView.vue";
import GameView from "../views/GameView.vue";
import WinLossView from "../views/WinLossView.vue";
import MenuPrincipal from "@/views/MenuPrincipal.vue";
import ListadoJugadores from "@/views/ListadoJugadores.vue";
import HistorialJugadores from "@/views/HistorialJugadores.vue";
import GestionDeAtaquesYCambios from "@/views/GestionDeAtaquesYCambios.vue";

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
    },
    {
      path: '/EliminarPlayer',
      name: 'EliminarPLayer',
      component: EliminarPlayer
    },
    {
      path: '/CreateArenaView',
      name: 'CreateArenaView',
      component: CreateArenaView
    },
    {
      path: '/GameView',
      name: 'GameView',
      component: GameView
    },
    {
      path: '/WinLossView',
      name: 'WinLossView',
      component: WinLossView
    },
    {
      path: '/MenuPrincipal',
      name: 'MenuPrincipal',
      component: MenuPrincipal
    },
    {
      path: '/ListadoJugadores',
      name: 'ListadoJugadores',
      component: ListadoJugadores
    },
    {
      path: '/HistorialJugadores',
      name: 'HistorialJugadores',
      component: HistorialJugadores
    },
    {
      path: '/GestionDeAtaquesYCambios',
      name: 'GestionDeAtaquesYCambios',
      component: GestionDeAtaquesYCambios
    }
  ]
});

export default router;

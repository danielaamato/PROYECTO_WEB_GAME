<script>
import "../assets/menu.css";
import StorePopup from './StorePopupView.vue';
import BackpackPopup from './BackpackView.vue';

export default {
  name: "MenuPrincipal",
  components: {
    StorePopup,
    BackpackPopup
  },
  data() {
    return {
      showPopup: false,
      showBackpackPopup: false,
      productPrice: 50, // Ejemplo de precio
    };
  }
};
</script>

<template>
  <div class="top-bar">
    <a href="#" class="game-title">Battle Arena</a>

    <div class="user-info">
      <img src="public/MainMenuImages/profile-pic.jpg" alt="Foto de Perfil" class="profile-pic">
      <span class="username">xXxCacoDemon73</span>
      <div class="coins">
        <div class="coins-icon"></div>
        <span>100</span>
      </div>
      <span class="experience">Nivel: 1</span>
      <div class="exp-bar">
        <!--Aqui hara falta implementar un script para añadir el progreso en la barra-->
        <!--procrastinar es un arte-->
      </div>

    </div>
    <router-link to="/InfoPlayer" class="nav-button">Perfil</router-link>
  </div>

  <div class="main-grid">
    <!--COLUMNA 1 PARA LA TIENDA-->
    <div class="store-column">
      <button class="store-button" @click="showPopup = true">Store</button>
      <!-- Contenedor del Pop-up -->
      <div v-if="showPopup" class="popup">
        <store-popup :productPrice="productPrice" @close="showPopup = false"></store-popup>
      </div>
      <div class="under-construction">
        <span class="countdown">Countdown 00:00</span>
        <span>Under Construction</span>
      </div>
    </div>



    <!--COLUMNA 2 PARA EL GRID DEL JUEGO-->
    <div class="arena-column">
      <img src="public/MainMenuImages/arena-image.png" alt="Imagen Arena" class="arena-image">
      <router-link to="/CreateArenaView" class="create-arena-button">Create Arena</router-link>
      <router-link to="/GameView" class="join-arena-button">Join Arena</router-link>

    </div>

    <!--COLUMNA 3 PARA LA MOCHILA-->
    <div class="backpack-column">
      <button class="backpack-button" @click="showBackpackPopup = true">BackPack</button>
      <!-- Contenedor del Pop-up del Backpack -->
      <div v-if="showBackpackPopup" class="popup">
        <backpack-popup @close="showBackpackPopup = false"></backpack-popup>
      </div>
      <div class="current-attacks">
        <span class="attacks-title">Current Attacks</span>
        <div class="attacks">
          <span>Attack 1</span>
          <span>Attack 2</span>
          <span>Attack 3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
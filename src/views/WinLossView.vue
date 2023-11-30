<script>
import "../assets/win-loss.css";
import "../assets/header.css";
export default {
  name: "WinLossView",
};
</script>

<template>
  <body>
    <header class="header-container">
      <nav>
        <router-link to="/MenuPrincipal">
          <img id="game-name" src="public/MainMenuImages/logo.png" alt="Game name image">
        </router-link>
      </nav>
      <div class="header-space"></div>
      <nav>
        <router-link to="/">
          <img id="settings-image" src="public/InfoPlayerImages/icono-ajustes.webp" alt="Settings image">
        </router-link>
      </nav>
    </header>

    <main class="main-container-win-loss">
      <section class="main-section-win-loss">
        <section class="main-section1-win-loss">
          <h3>Win/Loss</h3>
        </section>

        <section class="main-section2-win-loss">
          <h3>XP</h3>
        </section>

        <section class="main-section3-win-loss">
          <h3>Rewards</h3>
          <h3>Stats</h3>
        </section>

        <section class="main-section4-win-loss">
          <img id="attack-image-win-loss" src="public/StorePopupImages/attack-image.png" alt="Attack image">
          <img id="coins-image-win-loss" src="public/MainMenuImages/coins-icon.png" alt="Coins Image">
          <h3>Winrate</h3>
        </section>

        <section class="main-section5-win-loss">
          <router-link to="/">
            <button id="continue-button-win-loss" class="continue-button-win-loss">Continue</button>
          </router-link>
        </section>

      </section>
    </main>




  </body>
</template>


<style scoped>
body {
  background-image: url("public/HomeImages/fondo-de-pagina.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}




</style>
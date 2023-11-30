<script>
import "../assets/game.css";
import "../assets/header.css";
export default {
  name: "GameView",
};
</script>

<template>
  <head>
    <title>Game</title>
  </head>

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

  <main class="main-container-game">

    <section class="main-section-game">
      <section class="player2-section-game">
        <img id="hp-bar-player2" src="public/InfoPlayerImages/hp-bar.png" alt="Player 2 hp bar">
      </section>

      <section class="game-grid-game">
        <img id="arena-image" src="public/MainMenuImages/arena-image.png" alt="Arena image">
      </section>

      <section class="player1-section-game">
        <img id="hp-bar-player1" src="public/InfoPlayerImages/hp-bar.png" alt="Player 1 hp bar">
      </section>
    </section>
  </main>

  <footer class="skill-bars-game">
    <section class="attack1-game">
      <img id="attack1-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>

    <section class="attack2-game">
      <img id="attack2-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>

    <section class="attack3-game">
      <img id="attack3-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>
  </footer>


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
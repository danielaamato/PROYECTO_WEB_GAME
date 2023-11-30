<script>
import "../assets/create-arena.css";
import "../assets/header.css";
export default {
  name: "CreateArenaView",
};
</script>

<template>

  <head>
    <title>Create Arena</title>
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

    <main class="main-container-create-arena">
      <div class="main-space-create-arena"></div>
      <section class="arena-section-create-arena">
      <input type="text" id="arena-size" placeholder="Size" class="arena-input-create-arena">
      <input type="text" id="arena-hp" placeholder="HP" class="arena-input-create-arena">
      <router-link to="/GameView">
        <button id="create-arena-button" class="start-button-create-arena">Start</button>
      </router-link>
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

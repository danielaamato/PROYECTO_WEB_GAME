<script>
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

.arena-section-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFDB58;
  border-radius: 25px;
  width: 300px;
  padding: 10px;
}

.arena-input-create-arena {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px #FFDB58;
  margin: 10px;
  font-size: 20px;
  text-align: center;
}

.main-space-create-arena {
  height: 150px;
}

.main-container-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  #attack-image-win-loss,
  #coins-image-win-loss {
    height: 50px;
    width: 50px;
  }

  .main-section-win-loss {
    width: 90%;
    height: auto;
    padding: 5px;
  }

  .main-section3-win-loss,
  .main-section4-win-loss,
  .main-section5-win-loss {
    flex-direction: column;
    align-items: center;
    height: auto;
  }

  .arena-section-create-arena {
    width: 90%;
    border-radius: 15px;
  }

  .arena-input-create-arena {
    width: 80%;
    margin: 5px;
    font-size: 16px;
  }

  .main-space-create-arena {
    height: auto;
  }

  .main-container-create-arena {
    align-items: center;
  }
}

</style>
